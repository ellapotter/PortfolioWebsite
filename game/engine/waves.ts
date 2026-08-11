import { WAVES } from "@/game/config/waves";
import type { EnemyTypeId, WaveConfiguration } from "@/game/types";

export function getWave(waveIndex: number): WaveConfiguration | null {
  return WAVES[waveIndex] ?? null;
}

export function getTotalWaves() {
  return WAVES.length;
}

export function summarizeWaveComposition(wave: WaveConfiguration) {
  const counts = new Map<EnemyTypeId, number>();
  for (const spawn of wave.spawns) {
    counts.set(spawn.type, (counts.get(spawn.type) ?? 0) + spawn.count);
  }
  return [...counts.entries()].map(([type, count]) => ({ type, count }));
}

export type SpawnEvent = {
  timeMs: number;
  type: EnemyTypeId;
};

export function buildSpawnTimeline(wave: WaveConfiguration): SpawnEvent[] {
  const events: SpawnEvent[] = [];

  for (const spawn of wave.spawns) {
    for (let i = 0; i < spawn.count; i += 1) {
      events.push({
        timeMs: spawn.delayMs + i * spawn.intervalMs,
        type: spawn.type,
      });
    }
  }

  return events.sort((a, b) => a.timeMs - b.timeMs);
}

export function isWaveCleared(options: {
  spawnIndex: number;
  totalSpawns: number;
  livingEnemies: number;
}) {
  return options.spawnIndex >= options.totalSpawns && options.livingEnemies === 0;
}
