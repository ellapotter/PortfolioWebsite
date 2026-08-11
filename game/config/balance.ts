import type { UnitRank } from "@/game/types";

export const BALANCE = {
  baseHealth: 10,
  startingCoins: 150,
  unitPurchaseCost: 50,
  benchSlots: 5,
  maxRank: 3 as UnitRank,
  projectileSpeed: 7.5,
  waveStartRequiresUnit: true,
  completionBonus: 500,
  score: {
    perEnemy: 25,
    perWave: 100,
    perBaseHealth: 40,
    perHighestRank: 75,
    perCoin: 1,
  },
} as const;

export const RANK_MULTIPLIERS: Record<UnitRank, number> = {
  1: 1.0,
  2: 1.8,
  3: 3.2,
};

export const RANK_RANGE_BONUS: Record<UnitRank, number> = {
  1: 0,
  2: 0.15,
  3: 0.35,
};

export const RANK_LABELS: Record<UnitRank, string> = {
  1: "Intern",
  2: "Developer",
  3: "Tech Lead",
};

export const STORAGE_KEYS = {
  highScore: "defend-the-stack-high-score",
  muted: "defend-the-stack-muted",
  tutorialCompleted: "defend-the-stack-tutorial-done",
} as const;
