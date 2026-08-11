"use client";

import { BALANCE } from "@/game/config/balance";
import { canMergeUnits } from "@/game/engine/merging";
import type { GameSnapshot, UnitInstance } from "@/game/types";
import { UnitToken } from "@/components/game/UnitToken";

type UnitBenchProps = {
  snapshot: GameSnapshot;
  onActivateUnit: (unitId: string) => void;
  onSelectUnit: (unitId: string) => void;
  onActivateSlot: (slot: number) => void;
  onDropUnit: (
    unitId: string,
    destination: { kind: "bench"; slot: number },
  ) => boolean;
};

function unitInSlot(units: UnitInstance[], slot: number) {
  return units.find(
    (unit) => unit.location.kind === "bench" && unit.location.slot === slot,
  );
}

export function UnitBench({
  snapshot,
  onActivateUnit,
  onSelectUnit,
  onActivateSlot,
  onDropUnit,
}: UnitBenchProps) {
  const selectedId =
    snapshot.selection.kind === "unit" ? snapshot.selection.unitId : null;
  const selected = selectedId
    ? snapshot.units.find((unit) => unit.id === selectedId) ?? null
    : null;

  return (
    <section className="dts-panel" aria-label="Developer bench">
      <div className="dts-panel__header">
        <h2>Bench</h2>
        <p>Hold up to {BALANCE.benchSlots} recruits before placing them.</p>
      </div>
      <div className="dts-bench">
        {Array.from({ length: BALANCE.benchSlots }, (_, slot) => {
          const unit = unitInSlot(snapshot.units, slot);
          const mergeHint =
            Boolean(selected && unit && selected.id !== unit.id && canMergeUnits(selected, unit));
          const isValidEmpty = Boolean(selected && !unit);

          return (
            <div
              key={slot}
              className={`dts-bench__slot ${isValidEmpty ? "dts-bench__slot--valid" : ""}`}
              onDragOver={(event) => {
                event.preventDefault();
              }}
              onDrop={(event) => {
                event.preventDefault();
                const unitId = event.dataTransfer.getData("text/unit-id");
                if (unitId) onDropUnit(unitId, { kind: "bench", slot });
              }}
            >
              {unit ? (
                <UnitToken
                  unit={unit}
                  compact
                  selected={selected?.id === unit.id}
                  mergeHint={mergeHint}
                  onSelect={() => onActivateUnit(unit.id)}
                  onDragStart={(event) => {
                    event.dataTransfer.setData("text/unit-id", unit.id);
                    event.dataTransfer.effectAllowed = "move";
                    onSelectUnit(unit.id);
                  }}
                />
              ) : (
                <button
                  type="button"
                  className="dts-bench__empty"
                  aria-label={`Empty bench slot ${slot + 1}${isValidEmpty ? ", valid destination" : ""}`}
                  onClick={() => onActivateSlot(slot)}
                >
                  Slot {slot + 1}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
