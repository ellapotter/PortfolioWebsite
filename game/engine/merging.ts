import { BALANCE } from "@/game/config/balance";
import type { UnitInstance, UnitRank } from "@/game/types";

export const MAX_RANK = BALANCE.maxRank;

export function canMergeUnits(a: UnitInstance, b: UnitInstance): boolean {
  return (
    a.id !== b.id &&
    a.type === b.type &&
    a.rank === b.rank &&
    a.rank < MAX_RANK
  );
}

export function mergeUnits(
  source: UnitInstance,
  destination: UnitInstance,
): UnitInstance | null {
  if (!canMergeUnits(source, destination)) return null;

  return {
    ...destination,
    rank: (destination.rank + 1) as UnitRank,
    cooldownMs: 0,
    targetEnemyId: null,
  };
}
