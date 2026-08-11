import type { EnemyInstance, UnitInstance } from "@/game/types";
import { getTileById } from "@/game/config/map";
import { getUnitStats } from "@/game/config/units";
import { getPositionAlongPath } from "@/game/engine/movement";

export function getUnitWorldPosition(unit: UnitInstance): { x: number; y: number } | null {
  if (unit.location.kind !== "tile") return null;
  const tile = getTileById(unit.location.tileId);
  if (!tile) return null;
  return { x: tile.col + 0.5, y: tile.row + 0.5 };
}

export function distance(a: { x: number; y: number }, b: { x: number; y: number }) {
  return Math.hypot(a.x - b.x, a.y - b.y);
}

export function selectTarget(
  unit: UnitInstance,
  enemies: EnemyInstance[],
): EnemyInstance | null {
  const origin = getUnitWorldPosition(unit);
  if (!origin) return null;

  const { range } = getUnitStats(unit.type, unit.rank);
  const living = enemies.filter((enemy) => enemy.alive);
  if (living.length === 0) return null;

  if (unit.targetEnemyId) {
    const current = living.find((enemy) => enemy.id === unit.targetEnemyId);
    if (current) {
      const pos = getPositionAlongPath(current.progress);
      if (distance(origin, pos) <= range) {
        return current;
      }
    }
  }

  let best: EnemyInstance | null = null;
  let bestProgress = -1;

  for (const enemy of living) {
    const pos = getPositionAlongPath(enemy.progress);
    if (distance(origin, pos) <= range && enemy.progress > bestProgress) {
      best = enemy;
      bestProgress = enemy.progress;
    }
  }

  return best;
}

export function findRicochetTarget(
  fromEnemyId: string,
  origin: { x: number; y: number },
  enemies: EnemyInstance[],
  range: number,
  excludedIds: Set<string>,
): EnemyInstance | null {
  let best: EnemyInstance | null = null;
  let bestProgress = -1;

  for (const enemy of enemies) {
    if (!enemy.alive || excludedIds.has(enemy.id) || enemy.id === fromEnemyId) continue;
    const pos = getPositionAlongPath(enemy.progress);
    if (distance(origin, pos) <= range && enemy.progress > bestProgress) {
      best = enemy;
      bestProgress = enemy.progress;
    }
  }

  return best;
}
