import { ENEMY_TYPES } from "@/game/config/enemies";
import type { EnemyInstance, EnemyTypeId, UnitRank } from "@/game/types";
import { createId } from "@/game/utils/random";

export function createEnemy(
  type: EnemyTypeId,
  options?: { progress?: number; canSplit?: boolean },
): EnemyInstance {
  const config = ENEMY_TYPES[type];
  return {
    id: createId("enemy"),
    type,
    health: config.health,
    maxHealth: config.health,
    progress: options?.progress ?? 0,
    speed: config.speed,
    reward: config.reward,
    alive: true,
    canSplit: options?.canSplit ?? config.splitsOnDefeat,
    splitCount: config.splitCount ?? 0,
  };
}

export type DefeatResult = {
  enemies: EnemyInstance[];
  coinsGained: number;
  defeated: EnemyInstance[];
  splits: EnemyInstance[];
};

export function applyDamageToEnemy(
  enemies: EnemyInstance[],
  enemyId: string,
  damage: number,
): DefeatResult {
  const defeated: EnemyInstance[] = [];
  const splits: EnemyInstance[] = [];
  let coinsGained = 0;

  const next = enemies.flatMap((enemy) => {
    if (enemy.id !== enemyId || !enemy.alive) return [enemy];

    const health = enemy.health - damage;
    if (health > 0) {
      return [{ ...enemy, health }];
    }

    const dead = { ...enemy, health: 0, alive: false };
    defeated.push(dead);
    coinsGained += enemy.reward;

    if (enemy.canSplit) {
      const config = ENEMY_TYPES[enemy.type];
      const splitType = config.splitInto;
      const count = config.splitCount ?? 0;
      if (splitType && count > 0) {
        for (let i = 0; i < count; i += 1) {
          const child = createEnemy(splitType, {
            progress: Math.max(0, enemy.progress - 0.02 * (i + 1)),
            canSplit: false,
          });
          splits.push(child);
        }
      }
    }

    return [];
  });

  return {
    enemies: [...next, ...splits],
    coinsGained,
    defeated,
    splits,
  };
}

export function damageBase(baseHealth: number, amount = 1) {
  return Math.max(0, baseHealth - amount);
}

export function getHighestRank(units: { rank: UnitRank }[]): UnitRank {
  return units.reduce<UnitRank>((max, unit) => (unit.rank > max ? unit.rank : max), 1);
}
