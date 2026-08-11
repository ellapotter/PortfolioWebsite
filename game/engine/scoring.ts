import { BALANCE } from "@/game/config/balance";
import type { ScoreBreakdown, UnitRank } from "@/game/types";

export function calculateScore(input: {
  enemiesDefeated: number;
  wavesCompleted: number;
  baseHealthRemaining: number;
  highestRankAchieved: UnitRank;
  coinsRemaining: number;
  won: boolean;
}): ScoreBreakdown {
  const enemies = input.enemiesDefeated * BALANCE.score.perEnemy;
  const waves = input.wavesCompleted * BALANCE.score.perWave;
  const health = input.baseHealthRemaining * BALANCE.score.perBaseHealth;
  const rank = input.highestRankAchieved * BALANCE.score.perHighestRank;
  const coins = input.coinsRemaining * BALANCE.score.perCoin;
  const completionBonus = input.won ? BALANCE.completionBonus : 0;
  const total = enemies + waves + health + rank + coins + completionBonus;

  return {
    enemiesDefeated: enemies,
    wavesCompleted: waves,
    baseHealthRemaining: health,
    highestRankAchieved: rank,
    coinsRemaining: coins,
    completionBonus,
    total,
  };
}
