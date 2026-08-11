"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { BALANCE } from "@/game/config/balance";
import { getTileById, PLACEMENT_TILES } from "@/game/config/map";
import { getUnitDisplayName, getUnitStats, UNIT_TYPES } from "@/game/config/units";
import { RANK_LABELS } from "@/game/config/balance";
import {
  applyDamageToEnemy,
  createEnemy,
  damageBase,
  getHighestRank,
} from "@/game/engine/combat";
import { purchaseUnit } from "@/game/engine/economy";
import { canMergeUnits, mergeUnits } from "@/game/engine/merging";
import {
  advanceEnemyProgress,
  enemyReachedBase,
  getPositionAlongPath,
} from "@/game/engine/movement";
import { calculateScore } from "@/game/engine/scoring";
import {
  findRicochetTarget,
  getUnitWorldPosition,
  selectTarget,
} from "@/game/engine/targeting";
import {
  buildSpawnTimeline,
  getTotalWaves,
  getWave,
  isWaveCleared,
} from "@/game/engine/waves";
import type {
  EnemyInstance,
  GameAnnouncement,
  GamePhase,
  GameSnapshot,
  Projectile,
  SelectionState,
  UnitInstance,
} from "@/game/types";
import { playGameSound } from "@/game/utils/audio";
import { createId } from "@/game/utils/random";
import {
  loadPreferences,
  saveHighScore,
  saveMuted,
  saveTutorialCompleted,
} from "@/game/utils/storage";

type MutableSim = {
  phase: GamePhase;
  coins: number;
  baseHealth: number;
  waveIndex: number;
  units: UnitInstance[];
  enemies: EnemyInstance[];
  projectiles: Projectile[];
  selection: SelectionState;
  enemiesDefeated: number;
  wavesCompleted: number;
  highestRankAchieved: 1 | 2 | 3;
  muted: boolean;
  highScore: number;
  showTutorial: boolean;
  waveElapsedMs: number;
  spawnEvents: ReturnType<typeof buildSpawnTimeline>;
  spawnIndex: number;
  announcementId: number;
  pendingAnnouncements: GameAnnouncement[];
  finalScore: ReturnType<typeof calculateScore> | null;
  pauseReason: "manual" | null;
  renderedScore: number;
};

function createInitialSim(prefs = loadPreferences()): MutableSim {
  const phase: GamePhase = prefs.tutorialCompleted ? "preparing" : "tutorial";
  return {
    phase,
    coins: BALANCE.startingCoins,
    baseHealth: BALANCE.baseHealth,
    waveIndex: 0,
    units: [],
    enemies: [],
    projectiles: [],
    selection: { kind: "none" },
    enemiesDefeated: 0,
    wavesCompleted: 0,
    highestRankAchieved: 1,
    muted: prefs.muted,
    highScore: prefs.highScore,
    showTutorial: !prefs.tutorialCompleted,
    waveElapsedMs: 0,
    spawnEvents: [],
    spawnIndex: 0,
    announcementId: 0,
    pendingAnnouncements: [],
    finalScore: null,
    pauseReason: null,
    renderedScore: 0,
  };
}

function announce(sim: MutableSim, message: string) {
  sim.announcementId += 1;
  sim.pendingAnnouncements = [
    ...sim.pendingAnnouncements.slice(-4),
    { id: sim.announcementId, message },
  ];
}

function liveScore(sim: MutableSim) {
  return calculateScore({
    enemiesDefeated: sim.enemiesDefeated,
    wavesCompleted: sim.wavesCompleted,
    baseHealthRemaining: sim.baseHealth,
    highestRankAchieved: sim.highestRankAchieved,
    coinsRemaining: sim.coins,
    won: false,
  }).total;
}

function toSnapshot(sim: MutableSim): GameSnapshot {
  return {
    phase: sim.phase,
    coins: sim.coins,
    baseHealth: sim.baseHealth,
    waveIndex: sim.waveIndex,
    score: liveScore(sim),
    highScore: sim.highScore,
    muted: sim.muted,
    units: sim.units.map((unit) => ({ ...unit })),
    enemies: sim.enemies.map((enemy) => ({ ...enemy })),
    projectiles: sim.projectiles.map((projectile) => ({ ...projectile })),
    selection: sim.selection,
    announcements: sim.pendingAnnouncements,
    enemiesDefeated: sim.enemiesDefeated,
    wavesCompleted: sim.wavesCompleted,
    highestRankAchieved: sim.highestRankAchieved,
    showTutorial: sim.showTutorial,
    finalScore: sim.finalScore,
    pauseReason: sim.pauseReason,
  };
}

function hasPlacedUnit(units: UnitInstance[]) {
  return units.some((unit) => unit.location.kind === "tile");
}

function finishGame(sim: MutableSim, outcome: "won" | "lost") {
  sim.phase = outcome;
  sim.projectiles = [];
  sim.selection = { kind: "none" };
  const breakdown = calculateScore({
    enemiesDefeated: sim.enemiesDefeated,
    wavesCompleted: sim.wavesCompleted,
    baseHealthRemaining: sim.baseHealth,
    highestRankAchieved: sim.highestRankAchieved,
    coinsRemaining: sim.coins,
    won: outcome === "won",
  });
  sim.finalScore = breakdown;
  sim.highScore = saveHighScore(breakdown.total);
  playGameSound(outcome === "won" ? "win" : "lose", sim.muted);
  announce(
    sim,
    outcome === "won"
      ? "Victory! The server held through every wave."
      : "Defeat. The server went down.",
  );
}

export function useGameEngine() {
  const simRef = useRef<MutableSim | null>(null);
  if (simRef.current == null) {
    simRef.current = createInitialSim();
  }
  const [snapshot, setSnapshot] = useState<GameSnapshot>(() =>
    toSnapshot(createInitialSim()),
  );
  const rafRef = useRef<number>(0);
  const lastTsRef = useRef<number | null>(null);
  const mountedRef = useRef(true);

  const getSim = useCallback(() => {
    if (simRef.current == null) {
      simRef.current = createInitialSim();
    }
    return simRef.current;
  }, []);

  const sync = useCallback((force = false) => {
    if (!mountedRef.current) return;
    const next = toSnapshot(getSim());
    setSnapshot((prev) => {
      if (
        !force &&
        prev.phase === next.phase &&
        prev.coins === next.coins &&
        prev.baseHealth === next.baseHealth &&
        prev.waveIndex === next.waveIndex &&
        prev.score === next.score &&
        prev.highScore === next.highScore &&
        prev.muted === next.muted &&
        prev.showTutorial === next.showTutorial &&
        prev.selection.kind === next.selection.kind &&
        (prev.selection.kind === "none" ||
          (next.selection.kind === "unit" &&
            prev.selection.kind === "unit" &&
            prev.selection.unitId === next.selection.unitId)) &&
        prev.units.length === next.units.length &&
        prev.enemies.length === next.enemies.length &&
        prev.projectiles.length === next.projectiles.length &&
        prev.announcements.length === next.announcements.length &&
        prev.finalScore?.total === next.finalScore?.total
      ) {
        if (next.phase === "waveRunning" || next.projectiles.length > 0) {
          return next;
        }
        return prev;
      }
      return next;
    });
  }, [getSim]);

  const stepSimulation = useCallback(
    (deltaMs: number) => {
      const sim = getSim();
      if (sim.phase !== "waveRunning") return;

      const capped = Math.min(deltaMs, 50);
      sim.waveElapsedMs += capped;

      while (
        sim.spawnIndex < sim.spawnEvents.length &&
        sim.spawnEvents[sim.spawnIndex].timeMs <= sim.waveElapsedMs
      ) {
        const event = sim.spawnEvents[sim.spawnIndex];
        sim.enemies.push(createEnemy(event.type));
        sim.spawnIndex += 1;
      }

      sim.enemies = sim.enemies.map((enemy) => advanceEnemyProgress(enemy, capped));

      for (const enemy of [...sim.enemies]) {
        if (enemyReachedBase(enemy)) {
          sim.baseHealth = damageBase(sim.baseHealth, 1);
          sim.enemies = sim.enemies.filter((item) => item.id !== enemy.id);
          playGameSound("damage", sim.muted);
          announce(sim, "The server took damage.");
          if (sim.baseHealth <= 0) {
            finishGame(sim, "lost");
            sync(true);
            return;
          }
        }
      }

      sim.units = sim.units.map((unit) => {
        if (unit.location.kind !== "tile") return unit;
        const cooldownMs = Math.max(0, unit.cooldownMs - capped);
        const withCooldown = { ...unit, cooldownMs };
        const target = selectTarget(withCooldown, sim.enemies);
        const nextUnit = { ...withCooldown, targetEnemyId: target?.id ?? null };
        if (!target || cooldownMs > 0) return nextUnit;

        const stats = getUnitStats(nextUnit.type, nextUnit.rank);
        const origin = getUnitWorldPosition(nextUnit);
        const targetPos = getPositionAlongPath(target.progress);
        if (!origin) return nextUnit;

        sim.projectiles.push({
          id: createId("proj"),
          unitId: nextUnit.id,
          targetEnemyId: target.id,
          x: origin.x,
          y: origin.y,
          targetX: targetPos.x,
          targetY: targetPos.y,
          damage: stats.damage,
          speed: BALANCE.projectileSpeed,
          color: UNIT_TYPES[nextUnit.type].projectileColor,
          ricochetRemaining: stats.ricochetTargets,
        });
        playGameSound("attack", sim.muted);
        return { ...nextUnit, cooldownMs: stats.attackIntervalMs };
      });

      const remaining: Projectile[] = [];
      for (const projectile of sim.projectiles) {
        const enemy = sim.enemies.find(
          (item) => item.id === projectile.targetEnemyId && item.alive,
        );
        if (!enemy) continue;

        const targetPos = getPositionAlongPath(enemy.progress);
        const nextProjectile = {
          ...projectile,
          targetX: targetPos.x,
          targetY: targetPos.y,
        };
        const dx = targetPos.x - nextProjectile.x;
        const dy = targetPos.y - nextProjectile.y;
        const dist = Math.hypot(dx, dy) || 1;
        const step = (nextProjectile.speed * capped) / 1000;
        if (step >= dist) {
          const result = applyDamageToEnemy(sim.enemies, enemy.id, nextProjectile.damage);
          sim.enemies = result.enemies;
          if (result.coinsGained > 0) {
            sim.coins += result.coinsGained;
            sim.enemiesDefeated += result.defeated.length;
            playGameSound("defeat", sim.muted);
          }

          if (nextProjectile.ricochetRemaining > 0) {
            const hitPos = { x: targetPos.x, y: targetPos.y };
            const nextTarget = findRicochetTarget(
              enemy.id,
              hitPos,
              sim.enemies,
              2.2,
              new Set([enemy.id]),
            );
            if (nextTarget) {
              const bouncePos = getPositionAlongPath(nextTarget.progress);
              remaining.push({
                ...nextProjectile,
                id: createId("proj"),
                targetEnemyId: nextTarget.id,
                x: hitPos.x,
                y: hitPos.y,
                targetX: bouncePos.x,
                targetY: bouncePos.y,
                damage: Math.max(4, Math.round(nextProjectile.damage * 0.65)),
                ricochetRemaining: nextProjectile.ricochetRemaining - 1,
              });
            }
          }
        } else {
          remaining.push({
            ...nextProjectile,
            x: nextProjectile.x + (dx / dist) * step,
            y: nextProjectile.y + (dy / dist) * step,
          });
        }
      }
      sim.projectiles = remaining;

      if (
        isWaveCleared({
          spawnIndex: sim.spawnIndex,
          totalSpawns: sim.spawnEvents.length,
          livingEnemies: sim.enemies.filter((enemy) => enemy.alive).length,
        })
      ) {
        const wave = getWave(sim.waveIndex);
        sim.wavesCompleted = sim.waveIndex + 1;
        sim.coins += wave?.bonusCoins ?? 0;
        sim.enemies = [];
        sim.projectiles = [];
        playGameSound("wave", sim.muted);

        if (sim.waveIndex >= getTotalWaves() - 1) {
          finishGame(sim, "won");
        } else {
          sim.phase = "waveComplete";
          announce(sim, `Wave ${sim.waveIndex + 1} complete.`);
        }
      }

      sync();
    },
    [getSim, sync],
  );

  useEffect(() => {
    mountedRef.current = true;
    const prefs = loadPreferences();
    simRef.current = createInitialSim(prefs);
    sync(true);

    const loop = (timestamp: number) => {
      if (!mountedRef.current) return;
      if (lastTsRef.current == null) lastTsRef.current = timestamp;
      const delta = timestamp - lastTsRef.current;
      lastTsRef.current = timestamp;
      stepSimulation(delta);
      rafRef.current = window.requestAnimationFrame(loop);
    };

    rafRef.current = window.requestAnimationFrame(loop);

    return () => {
      mountedRef.current = false;
      window.cancelAnimationFrame(rafRef.current);
      lastTsRef.current = null;
    };
  }, [stepSimulation, sync]);

  const recruit = useCallback(() => {
    const sim = getSim();
    if (sim.phase === "won" || sim.phase === "lost" || sim.phase === "tutorial") return;

    const result = purchaseUnit({ coins: sim.coins, units: sim.units });
    if (!result.ok) {
      announce(
        sim,
        result.reason === "insufficientCoins"
          ? `Need ${BALANCE.unitPurchaseCost} coins to recruit.`
          : "Bench is full. Place or merge a unit first.",
      );
      sync(true);
      return;
    }

    sim.coins = result.coins;
    sim.units = [...sim.units, result.unit];
    playGameSound("purchase", sim.muted);
    announce(
      sim,
      `${getUnitDisplayName(result.unit.type, result.unit.rank)} recruited.`,
    );
    sync(true);
  }, [getSim, sync]);

  const clearSelection = useCallback(() => {
    getSim().selection = { kind: "none" };
    sync(true);
  }, [getSim, sync]);

  const selectUnit = useCallback(
    (unitId: string) => {
      const sim = getSim();
      if (sim.phase === "won" || sim.phase === "lost") return;
      if (sim.selection.kind === "unit" && sim.selection.unitId === unitId) {
        sim.selection = { kind: "none" };
      } else {
        sim.selection = { kind: "unit", unitId };
      }
      sync(true);
    },
    [getSim, sync],
  );

  const tryPlaceOrMerge = useCallback(
    (unitId: string, destination: { kind: "tile"; tileId: string } | { kind: "bench"; slot: number }) => {
      const sim = getSim();
      if (sim.phase === "won" || sim.phase === "lost" || sim.phase === "tutorial") {
        return false;
      }

      const source = sim.units.find((unit) => unit.id === unitId);
      if (!source) return false;

      if (destination.kind === "tile") {
        if (!getTileById(destination.tileId)) return false;
        const occupant = sim.units.find(
          (unit) =>
            unit.id !== unitId &&
            unit.location.kind === "tile" &&
            unit.location.tileId === destination.tileId,
        );

        if (occupant) {
          if (!canMergeUnits(source, occupant)) return false;
          const merged = mergeUnits(source, occupant);
          if (!merged) return false;
          sim.units = sim.units
            .filter((unit) => unit.id !== source.id)
            .map((unit) => (unit.id === occupant.id ? merged : unit));
          sim.highestRankAchieved = getHighestRank(sim.units);
          sim.selection = { kind: "none" };
          playGameSound("merge", sim.muted);
          announce(
            sim,
            `Two ${UNIT_TYPES[source.type].shortName} ${RANK_LABELS[source.rank]}s merged into a ${getUnitDisplayName(merged.type, merged.rank)}.`,
          );
          sync(true);
          return true;
        }

        sim.units = sim.units.map((unit) =>
          unit.id === unitId
            ? {
                ...unit,
                location: { kind: "tile", tileId: destination.tileId },
                targetEnemyId: null,
              }
            : unit,
        );
        sim.selection = { kind: "none" };
        playGameSound("place", sim.muted);
        announce(sim, "Unit placed.");
        sync(true);
        return true;
      }

      const occupant = sim.units.find(
        (unit) =>
          unit.id !== unitId &&
          unit.location.kind === "bench" &&
          unit.location.slot === destination.slot,
      );
      if (occupant) {
        if (!canMergeUnits(source, occupant)) return false;
        const merged = mergeUnits(source, occupant);
        if (!merged) return false;
        sim.units = sim.units
          .filter((unit) => unit.id !== source.id)
          .map((unit) => (unit.id === occupant.id ? merged : unit));
        sim.highestRankAchieved = getHighestRank(sim.units);
        sim.selection = { kind: "none" };
        playGameSound("merge", sim.muted);
        announce(
          sim,
          `Two ${UNIT_TYPES[source.type].shortName} ${RANK_LABELS[source.rank]}s merged into a ${getUnitDisplayName(merged.type, merged.rank)}.`,
        );
        sync(true);
        return true;
      }

      sim.units = sim.units.map((unit) =>
        unit.id === unitId
          ? {
              ...unit,
              location: { kind: "bench", slot: destination.slot },
              targetEnemyId: null,
              cooldownMs: 0,
            }
          : unit,
      );
      sim.selection = { kind: "none" };
      playGameSound("place", sim.muted);
      announce(sim, "Unit returned to bench.");
      sync(true);
      return true;
    },
    [getSim, sync],
  );

  const handleTileActivate = useCallback(
    (tileId: string) => {
      const sim = getSim();
      if (sim.selection.kind !== "unit") return;
      tryPlaceOrMerge(sim.selection.unitId, { kind: "tile", tileId });
    },
    [getSim, tryPlaceOrMerge],
  );

  const handleBenchSlotActivate = useCallback(
    (slot: number) => {
      const sim = getSim();
      if (sim.selection.kind !== "unit") return;
      tryPlaceOrMerge(sim.selection.unitId, { kind: "bench", slot });
    },
    [getSim, tryPlaceOrMerge],
  );

  const handleUnitActivate = useCallback(
    (unitId: string) => {
      const sim = getSim();
      if (sim.selection.kind === "unit" && sim.selection.unitId !== unitId) {
        const selectedId = sim.selection.unitId;
        const source = sim.units.find((unit) => unit.id === selectedId);
        const target = sim.units.find((unit) => unit.id === unitId);
        if (source && target && canMergeUnits(source, target)) {
          if (target.location.kind === "tile") {
            tryPlaceOrMerge(source.id, { kind: "tile", tileId: target.location.tileId });
            return;
          }
          tryPlaceOrMerge(source.id, { kind: "bench", slot: target.location.slot });
          return;
        }
      }
      selectUnit(unitId);
    },
    [getSim, selectUnit, tryPlaceOrMerge],
  );

  const startNextWave = useCallback(() => {
    const sim = getSim();
    if (sim.phase !== "preparing" && sim.phase !== "waveComplete") return;
    if (!hasPlacedUnit(sim.units)) {
      announce(sim, "Place at least one developer before starting.");
      sync(true);
      return;
    }

    if (sim.phase === "waveComplete") {
      sim.waveIndex += 1;
    }

    const wave = getWave(sim.waveIndex);
    if (!wave) return;

    sim.spawnEvents = buildSpawnTimeline(wave);
    sim.spawnIndex = 0;
    sim.waveElapsedMs = 0;
    sim.enemies = [];
    sim.projectiles = [];
    sim.phase = "waveRunning";
    sim.pauseReason = null;
    announce(sim, `Wave ${wave.id}: ${wave.name}`);
    sync(true);
  }, [getSim, sync]);

  const togglePause = useCallback(() => {
    const sim = getSim();
    if (sim.phase === "waveRunning") {
      sim.phase = "paused";
      sim.pauseReason = "manual";
      announce(sim, "Paused.");
      sync(true);
      return;
    }
    if (sim.phase === "paused") {
      sim.phase = "waveRunning";
      sim.pauseReason = null;
      announce(sim, "Resumed.");
      sync(true);
    }
  }, [getSim, sync]);

  const restart = useCallback(() => {
    const prefs = loadPreferences();
    const sim = createInitialSim({
      ...prefs,
      tutorialCompleted: true,
    });
    sim.phase = "preparing";
    sim.showTutorial = false;
    simRef.current = sim;
    lastTsRef.current = null;
    announce(sim, "Game restarted.");
    sync(true);
  }, [sync]);

  const toggleMute = useCallback(() => {
    const sim = getSim();
    sim.muted = !sim.muted;
    saveMuted(sim.muted);
    announce(sim, sim.muted ? "Sound muted." : "Sound on.");
    sync(true);
  }, [getSim, sync]);

  const openHelp = useCallback(() => {
    const sim = getSim();
    sim.showTutorial = true;
    if (sim.phase === "waveRunning") {
      sim.phase = "paused";
      sim.pauseReason = "manual";
    }
    sync(true);
  }, [getSim, sync]);

  const closeTutorial = useCallback(
    (markComplete: boolean) => {
      const sim = getSim();
      sim.showTutorial = false;
      if (markComplete) {
        saveTutorialCompleted(true);
      }
      if (sim.phase === "tutorial") {
        sim.phase = "preparing";
      }
      sync(true);
    },
    [getSim, sync],
  );

  const validTileIds = PLACEMENT_TILES.map((tile) => tile.id);

  return {
    snapshot,
    recruit,
    selectUnit,
    clearSelection,
    handleTileActivate,
    handleBenchSlotActivate,
    handleUnitActivate,
    tryPlaceOrMerge,
    startNextWave,
    togglePause,
    restart,
    toggleMute,
    openHelp,
    closeTutorial,
    validTileIds,
    canRecruit:
      snapshot.coins >= BALANCE.unitPurchaseCost &&
      snapshot.units.filter((unit) => unit.location.kind === "bench").length <
        BALANCE.benchSlots &&
      snapshot.phase !== "won" &&
      snapshot.phase !== "lost" &&
      snapshot.phase !== "tutorial",
    recruitDisabledReason:
      snapshot.phase === "won" || snapshot.phase === "lost"
        ? "Game over"
        : snapshot.coins < BALANCE.unitPurchaseCost
          ? `Need ${BALANCE.unitPurchaseCost} coins`
          : snapshot.units.filter((unit) => unit.location.kind === "bench").length >=
              BALANCE.benchSlots
            ? "Bench full — place or merge first"
            : null,
  };
}
