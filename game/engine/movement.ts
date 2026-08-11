import { PATH_METRICS } from "@/game/config/map";
import type { EnemyInstance, PathWaypoint } from "@/game/types";

export function getPositionAlongPath(
  progress: number,
  metrics = PATH_METRICS,
): PathWaypoint {
  const clamped = Math.max(0, Math.min(1, progress));
  const distance = clamped * metrics.totalLength;

  let traveled = 0;
  for (let i = 0; i < metrics.segmentLengths.length; i += 1) {
    const length = metrics.segmentLengths[i];
    if (traveled + length >= distance) {
      const local = length === 0 ? 0 : (distance - traveled) / length;
      const a = metrics.waypoints[i];
      const b = metrics.waypoints[i + 1];
      return {
        x: a.x + (b.x - a.x) * local,
        y: a.y + (b.y - a.y) * local,
      };
    }
    traveled += length;
  }

  const last = metrics.waypoints[metrics.waypoints.length - 1];
  return { x: last.x, y: last.y };
}

export function advanceEnemyProgress(
  enemy: EnemyInstance,
  deltaMs: number,
): EnemyInstance {
  if (!enemy.alive) return enemy;
  const delta = (enemy.speed * deltaMs) / 1000;
  return {
    ...enemy,
    progress: Math.min(1, enemy.progress + delta),
  };
}

export function enemyReachedBase(enemy: EnemyInstance) {
  return enemy.alive && enemy.progress >= 1;
}
