import { Coffee, Layers, Terminal } from "lucide-react";
import { RANK_LABELS } from "@/game/config/balance";
import { UNIT_TYPES } from "@/game/config/units";
import type { UnitInstance, UnitRank, UnitTypeId } from "@/game/types";

const ICONS = {
  python: Terminal,
  java: Coffee,
  flutter: Layers,
} as const;

type UnitTokenProps = {
  unit: UnitInstance;
  selected?: boolean;
  mergeHint?: boolean;
  draggable?: boolean;
  compact?: boolean;
  onSelect?: () => void;
  onDragStart?: (event: React.DragEvent<HTMLButtonElement>) => void;
  onDragEnd?: () => void;
};

function RankMarks({ rank }: { rank: UnitRank }) {
  return (
    <span className="flex items-center gap-0.5" aria-hidden="true">
      {Array.from({ length: rank }, (_, index) => (
        <span key={index} className="h-1.5 w-1.5 rounded-full bg-current opacity-90" />
      ))}
    </span>
  );
}

export function unitLabel(type: UnitTypeId, rank: UnitRank) {
  return `${UNIT_TYPES[type].shortName} ${RANK_LABELS[rank]}`;
}

export function UnitToken({
  unit,
  selected = false,
  mergeHint = false,
  draggable = true,
  compact = false,
  onSelect,
  onDragStart,
  onDragEnd,
}: UnitTokenProps) {
  const config = UNIT_TYPES[unit.type];
  const Icon = ICONS[unit.type];
  const label = unitLabel(unit.type, unit.rank);

  return (
    <button
      type="button"
      draggable={draggable}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onClick={onSelect}
      aria-pressed={selected}
      aria-label={`${label}. Rank ${unit.rank} ${RANK_LABELS[unit.rank]}. ${config.role}`}
      title={`${label} — ${config.role}`}
      className={`dts-unit ${compact ? "dts-unit--compact" : ""} ${selected ? "dts-unit--selected" : ""} ${mergeHint ? "dts-unit--merge" : ""}`}
      style={
        {
          "--unit-accent": config.accent,
          "--unit-soft": config.accentSoft,
        } as React.CSSProperties
      }
      data-rank={unit.rank}
    >
      <span className="dts-unit__badge" aria-hidden="true">
        R{unit.rank}
      </span>
      <Icon className="dts-unit__icon" aria-hidden="true" />
      <span className="dts-unit__name">{config.shortName}</span>
      <span className="dts-unit__rank">
        <RankMarks rank={unit.rank} />
        <span className="sr-only">{RANK_LABELS[unit.rank]}</span>
        <span aria-hidden="true">{RANK_LABELS[unit.rank]}</span>
      </span>
    </button>
  );
}
