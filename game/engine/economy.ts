import { BALANCE } from "@/game/config/balance";
import { UNIT_TYPE_ORDER } from "@/game/config/units";
import type { UnitInstance, UnitTypeId } from "@/game/types";
import { createId, defaultRandom, pickRandom, type RandomFn } from "@/game/utils/random";

export type PurchaseResult =
  | { ok: true; unit: UnitInstance; coins: number }
  | { ok: false; reason: "insufficientCoins" | "benchFull" };

export function findOpenBenchSlot(units: UnitInstance[], benchSlots = BALANCE.benchSlots) {
  const occupied = new Set(
    units
      .filter((unit) => unit.location.kind === "bench")
      .map((unit) => (unit.location.kind === "bench" ? unit.location.slot : -1)),
  );

  for (let slot = 0; slot < benchSlots; slot += 1) {
    if (!occupied.has(slot)) return slot;
  }
  return null;
}

export function purchaseUnit(options: {
  coins: number;
  units: UnitInstance[];
  cost?: number;
  random?: RandomFn;
  types?: readonly UnitTypeId[];
}): PurchaseResult {
  const cost = options.cost ?? BALANCE.unitPurchaseCost;
  const random = options.random ?? defaultRandom;
  const types = options.types ?? UNIT_TYPE_ORDER;

  if (options.coins < cost) {
    return { ok: false, reason: "insufficientCoins" };
  }

  const slot = findOpenBenchSlot(options.units);
  if (slot == null) {
    return { ok: false, reason: "benchFull" };
  }

  const type = pickRandom(types, random);
  const unit: UnitInstance = {
    id: createId("unit"),
    type,
    rank: 1,
    location: { kind: "bench", slot },
    cooldownMs: 0,
    targetEnemyId: null,
  };

  return {
    ok: true,
    unit,
    coins: options.coins - cost,
  };
}
