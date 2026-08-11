import { describe, expect, it } from "vitest";
import { BALANCE } from "@/game/config/balance";
import { getUnitStats } from "@/game/config/units";
import {
  applyDamageToEnemy,
  createEnemy,
  damageBase,
} from "@/game/engine/combat";
import { findOpenBenchSlot, purchaseUnit } from "@/game/engine/economy";
import { canMergeUnits, mergeUnits } from "@/game/engine/merging";
import { advanceEnemyProgress, getPositionAlongPath } from "@/game/engine/movement";
import { calculateScore } from "@/game/engine/scoring";
import { selectTarget } from "@/game/engine/targeting";
import { buildSpawnTimeline, isWaveCleared } from "@/game/engine/waves";
import { WAVES } from "@/game/config/waves";
import type { UnitInstance } from "@/game/types";

function makeUnit(partial: Partial<UnitInstance> & Pick<UnitInstance, "id" | "type" | "rank">): UnitInstance {
  return {
    location: { kind: "bench", slot: 0 },
    cooldownMs: 0,
    targetEnemyId: null,
    ...partial,
  };
}

describe("merging", () => {
  it("merges identical units of the same rank", () => {
    const a = makeUnit({ id: "a", type: "python", rank: 1 });
    const b = makeUnit({ id: "b", type: "python", rank: 1, location: { kind: "tile", tileId: "t-1-2" } });
    expect(canMergeUnits(a, b)).toBe(true);
    const merged = mergeUnits(a, b);
    expect(merged?.rank).toBe(2);
    expect(merged?.type).toBe("python");
    expect(merged?.id).toBe("b");
  });

  it("rejects different types", () => {
    const a = makeUnit({ id: "a", type: "python", rank: 1 });
    const b = makeUnit({ id: "b", type: "java", rank: 1 });
    expect(canMergeUnits(a, b)).toBe(false);
    expect(mergeUnits(a, b)).toBeNull();
  });

  it("rejects different ranks", () => {
    const a = makeUnit({ id: "a", type: "java", rank: 1 });
    const b = makeUnit({ id: "b", type: "java", rank: 2 });
    expect(canMergeUnits(a, b)).toBe(false);
  });

  it("rejects max-rank merges", () => {
    const a = makeUnit({ id: "a", type: "flutter", rank: 3 });
    const b = makeUnit({ id: "b", type: "flutter", rank: 3 });
    expect(canMergeUnits(a, b)).toBe(false);
  });
});

describe("rank stats", () => {
  it("scales damage by rank multipliers", () => {
    const rank1 = getUnitStats("python", 1).damage;
    const rank2 = getUnitStats("python", 2).damage;
    const rank3 = getUnitStats("python", 3).damage;
    expect(rank2).toBe(Math.round(12 * 1.8));
    expect(rank3).toBe(Math.round(12 * 3.2));
    expect(rank2).toBeGreaterThan(rank1);
    expect(rank3).toBeGreaterThan(rank2);
  });
});

describe("purchase", () => {
  it("purchases with enough coins and open bench", () => {
    const result = purchaseUnit({
      coins: 150,
      units: [],
      random: () => 0,
    });
    expect(result.ok).toBe(true);
    if (result.ok) {
      expect(result.coins).toBe(100);
      expect(result.unit.rank).toBe(1);
      expect(result.unit.type).toBe("python");
    }
  });

  it("rejects insufficient coins", () => {
    const result = purchaseUnit({ coins: 40, units: [] });
    expect(result).toEqual({ ok: false, reason: "insufficientCoins" });
  });

  it("rejects full bench", () => {
    const units = Array.from({ length: BALANCE.benchSlots }, (_, slot) =>
      makeUnit({
        id: `u-${slot}`,
        type: "java",
        rank: 1,
        location: { kind: "bench", slot },
      }),
    );
    expect(findOpenBenchSlot(units)).toBeNull();
    const result = purchaseUnit({ coins: 200, units });
    expect(result).toEqual({ ok: false, reason: "benchFull" });
  });
});

describe("movement and combat", () => {
  it("advances enemy progress over time", () => {
    const enemy = createEnemy("syntaxError");
    const moved = advanceEnemyProgress(enemy, 1000);
    expect(moved.progress).toBeGreaterThan(enemy.progress);
    expect(moved.progress).toBeLessThanOrEqual(1);
  });

  it("maps progress to a path position", () => {
    const start = getPositionAlongPath(0);
    const end = getPositionAlongPath(1);
    expect(start.x).toBeLessThan(end.x);
  });

  it("selects the farthest enemy in range", () => {
    const unit = makeUnit({
      id: "u1",
      type: "python",
      rank: 1,
      location: { kind: "tile", tileId: "t-1-2" },
    });
    const near = { ...createEnemy("syntaxError"), progress: 0.05, id: "e1" };
    const far = { ...createEnemy("syntaxError"), progress: 0.2, id: "e2" };
    const target = selectTarget(unit, [near, far]);
    expect(target?.id).toBe("e2");
  });

  it("awards coins and removes defeated enemies", () => {
    const enemy = createEnemy("warning");
    const result = applyDamageToEnemy([enemy], enemy.id, enemy.maxHealth);
    expect(result.defeated).toHaveLength(1);
    expect(result.coinsGained).toBe(enemy.reward);
    expect(result.enemies.some((item) => item.id === enemy.id)).toBe(false);
  });

  it("damages the base and clamps at zero", () => {
    expect(damageBase(3, 1)).toBe(2);
    expect(damageBase(1, 5)).toBe(0);
  });
});

describe("waves and scoring", () => {
  it("builds a spawn timeline and detects clearance", () => {
    const timeline = buildSpawnTimeline(WAVES[0]);
    expect(timeline.length).toBe(WAVES[0].spawns[0].count);
    expect(
      isWaveCleared({ spawnIndex: timeline.length, totalSpawns: timeline.length, livingEnemies: 0 }),
    ).toBe(true);
    expect(
      isWaveCleared({ spawnIndex: 0, totalSpawns: timeline.length, livingEnemies: 0 }),
    ).toBe(false);
  });

  it("calculates score with optional completion bonus", () => {
    const playing = calculateScore({
      enemiesDefeated: 2,
      wavesCompleted: 1,
      baseHealthRemaining: 8,
      highestRankAchieved: 2,
      coinsRemaining: 40,
      won: false,
    });
    const won = calculateScore({
      enemiesDefeated: 2,
      wavesCompleted: 1,
      baseHealthRemaining: 8,
      highestRankAchieved: 2,
      coinsRemaining: 40,
      won: true,
    });
    expect(won.total).toBe(playing.total + BALANCE.completionBonus);
  });
});

describe("storage fallback", () => {
  it("loads default preferences when localStorage is unavailable", async () => {
    const { loadPreferences } = await import("@/game/utils/storage");
    expect(loadPreferences()).toEqual({
      highScore: 0,
      muted: false,
      tutorialCompleted: false,
    });
  });
});
