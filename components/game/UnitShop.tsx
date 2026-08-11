"use client";

import { UserPlus } from "lucide-react";
import { BALANCE } from "@/game/config/balance";
import { UNIT_TYPES, UNIT_TYPE_ORDER } from "@/game/config/units";

type UnitShopProps = {
  canRecruit: boolean;
  disabledReason: string | null;
  coins: number;
  onRecruit: () => void;
};

export function UnitShop({
  canRecruit,
  disabledReason,
  coins,
  onRecruit,
}: UnitShopProps) {
  return (
    <section className="dts-panel" aria-label="Unit shop">
      <div className="dts-panel__header">
        <h2>Recruit</h2>
        <p>Spend coins for a random Rank 1 developer.</p>
      </div>

      <button
        type="button"
        className="dts-button dts-button--primary dts-button--wide"
        onClick={onRecruit}
        disabled={!canRecruit}
        aria-describedby="recruit-help"
      >
        <UserPlus aria-hidden="true" />
        Recruit Developer — {BALANCE.unitPurchaseCost} coins
      </button>
      <p id="recruit-help" className="dts-help">
        {disabledReason
          ? disabledReason
          : `You have ${coins} coins. Recruits land on the bench.`}
      </p>

      <ul className="dts-roster">
        {UNIT_TYPE_ORDER.map((typeId) => {
          const unit = UNIT_TYPES[typeId];
          return (
            <li key={typeId}>
              <span
                className="dts-roster__swatch"
                style={{ background: unit.accent }}
                aria-hidden="true"
              />
              <div>
                <strong>{unit.name}</strong>
                <span>{unit.role}</span>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
