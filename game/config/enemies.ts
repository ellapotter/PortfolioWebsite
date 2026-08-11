import type { EnemyTypeId } from "@/game/types";

export type EnemyTypeConfig = {
  id: EnemyTypeId;
  name: string;
  health: number;
  speed: number;
  reward: number;
  description: string;
  shape: "square" | "triangle" | "hex" | "diamond" | "star";
  accent: string;
  splitsOnDefeat: boolean;
  splitInto?: EnemyTypeId;
  splitCount?: number;
};

export const ENEMY_TYPES: Record<EnemyTypeId, EnemyTypeConfig> = {
  syntaxError: {
    id: "syntaxError",
    name: "Syntax Error",
    health: 40,
    speed: 0.085,
    reward: 12,
    description: "A standard bug with average health and speed.",
    shape: "square",
    accent: "#f472b6",
    splitsOnDefeat: false,
  },
  warning: {
    id: "warning",
    name: "Warning",
    health: 22,
    speed: 0.145,
    reward: 10,
    description: "Fast and fragile — appears in small packs.",
    shape: "triangle",
    accent: "#fbbf24",
    splitsOnDefeat: false,
  },
  infiniteLoop: {
    id: "infiniteLoop",
    name: "Infinite Loop",
    health: 140,
    speed: 0.05,
    reward: 28,
    description: "Slow and tough. Needs sustained firepower.",
    shape: "hex",
    accent: "#c084fc",
    splitsOnDefeat: false,
  },
  mergeConflict: {
    id: "mergeConflict",
    name: "Merge Conflict",
    health: 70,
    speed: 0.09,
    reward: 22,
    description: "Splits into two Warnings when defeated.",
    shape: "diamond",
    accent: "#fb7185",
    splitsOnDefeat: true,
    splitInto: "warning",
    splitCount: 2,
  },
  criticalBug: {
    id: "criticalBug",
    name: "Critical Bug",
    health: 320,
    speed: 0.055,
    reward: 80,
    description: "Final-wave boss bug with massive health.",
    shape: "star",
    accent: "#f43f5e",
    splitsOnDefeat: false,
  },
};
