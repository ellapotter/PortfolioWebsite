import { AlertTriangle, Bug, Hexagon, OctagonAlert, Split } from "lucide-react";
import { ENEMY_TYPES } from "@/game/config/enemies";
import type { EnemyInstance } from "@/game/types";

const ICONS = {
  syntaxError: Bug,
  warning: AlertTriangle,
  infiniteLoop: Hexagon,
  mergeConflict: Split,
  criticalBug: OctagonAlert,
} as const;

type EnemyTokenProps = {
  enemy: EnemyInstance;
  xPercent: number;
  yPercent: number;
};

export function EnemyToken({ enemy, xPercent, yPercent }: EnemyTokenProps) {
  const config = ENEMY_TYPES[enemy.type];
  const Icon = ICONS[enemy.type];
  const healthPct = Math.max(0, Math.round((enemy.health / enemy.maxHealth) * 100));

  return (
    <div
      className="dts-enemy"
      style={
        {
          left: `${xPercent}%`,
          top: `${yPercent}%`,
          "--enemy-accent": config.accent,
        } as React.CSSProperties
      }
      title={`${config.name}: ${enemy.health}/${enemy.maxHealth} HP`}
      role="img"
      aria-label={`${config.name}, ${enemy.health} of ${enemy.maxHealth} health`}
    >
      <div className="dts-enemy__hp" aria-hidden="true">
        <span style={{ width: `${healthPct}%` }} />
      </div>
      <div className={`dts-enemy__body dts-enemy__body--${config.shape}`}>
        <Icon className="dts-enemy__icon" aria-hidden="true" />
      </div>
      <span className="dts-enemy__label">{config.name}</span>
    </div>
  );
}
