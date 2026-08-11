import {
  RANK_LABELS,
  RANK_MULTIPLIERS,
  RANK_RANGE_BONUS,
} from "@/game/config/balance";
import type { UnitRank, UnitTypeId } from "@/game/types";

export type UnitTypeConfig = {
  id: UnitTypeId;
  name: string;
  shortName: string;
  role: string;
  accent: string;
  accentSoft: string;
  projectileColor: string;
  baseDamage: number;
  attackIntervalMs: number;
  range: number;
  description: string;
};

export const UNIT_TYPES: Record<UnitTypeId, UnitTypeConfig> = {
  python: {
    id: "python",
    name: "Python Developer",
    shortName: "Python",
    role: "Balanced ranged attacker",
    accent: "#3b82f6",
    accentSoft: "#93c5fd",
    projectileColor: "#60a5fa",
    baseDamage: 12,
    attackIntervalMs: 800,
    range: 2.5,
    description: "Steady damage at a comfortable range.",
  },
  java: {
    id: "java",
    name: "Java Engineer",
    shortName: "Java",
    role: "High-damage attacker",
    accent: "#f97316",
    accentSoft: "#fdba74",
    projectileColor: "#fb923c",
    baseDamage: 22,
    attackIntervalMs: 1300,
    range: 2.2,
    description: "Slower hits that pack a serious punch.",
  },
  flutter: {
    id: "flutter",
    name: "Flutter Developer",
    shortName: "Flutter",
    role: "Fast multi-target attacker",
    accent: "#38bdf8",
    accentSoft: "#bae6fd",
    projectileColor: "#7dd3fc",
    baseDamage: 8,
    attackIntervalMs: 550,
    range: 2.4,
    description: "Quick strikes that can bounce at higher ranks.",
  },
};

export const UNIT_TYPE_ORDER: UnitTypeId[] = ["python", "java", "flutter"];

export function getUnitStats(type: UnitTypeId, rank: UnitRank) {
  const config = UNIT_TYPES[type];
  const damage = Math.round(config.baseDamage * RANK_MULTIPLIERS[rank]);
  const range = config.range + RANK_RANGE_BONUS[rank];
  const ricochetTargets =
    type === "flutter" ? (rank === 1 ? 0 : rank === 2 ? 1 : 2) : 0;

  return {
    damage,
    attackIntervalMs: config.attackIntervalMs,
    range,
    ricochetTargets,
  };
}

export function getUnitDisplayName(type: UnitTypeId, rank: UnitRank) {
  return `${UNIT_TYPES[type].shortName} ${RANK_LABELS[rank]}`;
}
