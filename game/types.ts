export type UnitTypeId = "python" | "java" | "flutter";
export type UnitRank = 1 | 2 | 3;
export type EnemyTypeId =
  | "syntaxError"
  | "warning"
  | "infiniteLoop"
  | "mergeConflict"
  | "criticalBug";

export type GamePhase =
  | "tutorial"
  | "preparing"
  | "waveRunning"
  | "paused"
  | "waveComplete"
  | "won"
  | "lost";

export type GridPosition = {
  col: number;
  row: number;
};

export type PathWaypoint = {
  x: number;
  y: number;
};

export type UnitLocation =
  | { kind: "bench"; slot: number }
  | { kind: "tile"; tileId: string };

export type UnitInstance = {
  id: string;
  type: UnitTypeId;
  rank: UnitRank;
  location: UnitLocation;
  cooldownMs: number;
  targetEnemyId: string | null;
};

export type EnemyInstance = {
  id: string;
  type: EnemyTypeId;
  health: number;
  maxHealth: number;
  progress: number;
  speed: number;
  reward: number;
  alive: boolean;
  canSplit: boolean;
  splitCount: number;
};

export type Projectile = {
  id: string;
  unitId: string;
  targetEnemyId: string;
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  damage: number;
  speed: number;
  color: string;
  ricochetRemaining: number;
};

export type PlacementTile = {
  id: string;
  col: number;
  row: number;
};

export type WaveSpawn = {
  type: EnemyTypeId;
  count: number;
  delayMs: number;
  intervalMs: number;
};

export type WaveConfiguration = {
  id: number;
  name: string;
  bonusCoins: number;
  spawns: WaveSpawn[];
};

export type ScoreBreakdown = {
  enemiesDefeated: number;
  wavesCompleted: number;
  baseHealthRemaining: number;
  highestRankAchieved: number;
  coinsRemaining: number;
  completionBonus: number;
  total: number;
};

export type StoredPreferences = {
  highScore: number;
  muted: boolean;
  tutorialCompleted: boolean;
};

export type GameAnnouncement = {
  id: number;
  message: string;
};

export type SelectionState =
  | { kind: "none" }
  | { kind: "unit"; unitId: string };

export type GameSnapshot = {
  phase: GamePhase;
  coins: number;
  baseHealth: number;
  waveIndex: number;
  score: number;
  highScore: number;
  muted: boolean;
  units: UnitInstance[];
  enemies: EnemyInstance[];
  projectiles: Projectile[];
  selection: SelectionState;
  announcements: GameAnnouncement[];
  enemiesDefeated: number;
  wavesCompleted: number;
  highestRankAchieved: UnitRank;
  showTutorial: boolean;
  finalScore: ScoreBreakdown | null;
  pauseReason: "manual" | null;
};
