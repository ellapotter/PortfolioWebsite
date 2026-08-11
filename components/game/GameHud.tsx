"use client";

import {
  CircleHelp,
  Coins,
  Heart,
  Pause,
  Play,
  RotateCcw,
  Trophy,
  Volume2,
  VolumeX,
} from "lucide-react";
import { ENEMY_TYPES } from "@/game/config/enemies";
import { getWave, getTotalWaves, summarizeWaveComposition } from "@/game/engine/waves";
import type { GameSnapshot } from "@/game/types";

type GameHudProps = {
  snapshot: GameSnapshot;
  onPause: () => void;
  onRestart: () => void;
  onMute: () => void;
  onHelp: () => void;
  onStartWave: () => void;
  onClearSelection: () => void;
};

export function GameHud({
  snapshot,
  onPause,
  onRestart,
  onMute,
  onHelp,
  onStartWave,
  onClearSelection,
}: GameHudProps) {
  const waveNumber = Math.min(snapshot.waveIndex + 1, getTotalWaves());
  const previewWave =
    snapshot.phase === "waveComplete"
      ? getWave(snapshot.waveIndex + 1)
      : getWave(snapshot.waveIndex);
  const composition = previewWave ? summarizeWaveComposition(previewWave) : [];
  const canStart =
    snapshot.phase === "preparing" || snapshot.phase === "waveComplete";
  const canPause =
    snapshot.phase === "waveRunning" || snapshot.phase === "paused";

  return (
    <section className="dts-hud" aria-label="Game status">
      <div className="dts-hud__stats">
        <div className="dts-stat">
          <Coins aria-hidden="true" />
          <div>
            <span>Coins</span>
            <strong>{snapshot.coins}</strong>
          </div>
        </div>
        <div className="dts-stat">
          <Heart aria-hidden="true" />
          <div>
            <span>Server HP</span>
            <strong>{snapshot.baseHealth}</strong>
          </div>
        </div>
        <div className="dts-stat">
          <Trophy aria-hidden="true" />
          <div>
            <span>Wave</span>
            <strong>
              {waveNumber}/{getTotalWaves()}
            </strong>
          </div>
        </div>
        <div className="dts-stat">
          <div>
            <span>Score</span>
            <strong>{snapshot.score}</strong>
          </div>
        </div>
        <div className="dts-stat">
          <div>
            <span>High</span>
            <strong>{snapshot.highScore}</strong>
          </div>
        </div>
      </div>

      <div className="dts-hud__controls">
        <button
          type="button"
          className="dts-button"
          onClick={onPause}
          disabled={!canPause}
          aria-label={snapshot.phase === "paused" ? "Resume game" : "Pause game"}
        >
          {snapshot.phase === "paused" ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
          {snapshot.phase === "paused" ? "Resume" : "Pause"}
        </button>
        <button type="button" className="dts-button" onClick={onRestart} aria-label="Restart game">
          <RotateCcw aria-hidden="true" />
          Restart
        </button>
        <button
          type="button"
          className="dts-button"
          onClick={onMute}
          aria-label={snapshot.muted ? "Unmute sound" : "Mute sound"}
        >
          {snapshot.muted ? <VolumeX aria-hidden="true" /> : <Volume2 aria-hidden="true" />}
          {snapshot.muted ? "Unmute" : "Mute"}
        </button>
        <button type="button" className="dts-button" onClick={onHelp} aria-label="Open help">
          <CircleHelp aria-hidden="true" />
          Help
        </button>
        {snapshot.selection.kind === "unit" && (
          <button type="button" className="dts-button" onClick={onClearSelection}>
            Cancel selection
          </button>
        )}
      </div>

      <div className="dts-wave-panel">
        <div>
          <h2>
            {snapshot.phase === "waveComplete"
              ? "Wave complete"
              : snapshot.phase === "preparing"
                ? "Prepare defenses"
                : snapshot.phase === "paused"
                  ? "Paused"
                  : snapshot.phase === "waveRunning"
                    ? `Wave ${waveNumber} running`
                    : snapshot.phase === "won"
                      ? "Victory"
                      : snapshot.phase === "lost"
                        ? "Defeat"
                        : "Tutorial"}
          </h2>
          {previewWave && canStart && (
            <p>
              Next: {previewWave.name}. Bonus {previewWave.bonusCoins} coins.
            </p>
          )}
        </div>

        {canStart && (
          <button
            type="button"
            className="dts-button dts-button--primary"
            onClick={onStartWave}
          >
            {snapshot.phase === "preparing" ? "Start Wave 1" : "Start Next Wave"}
          </button>
        )}

        {composition.length > 0 && canStart && (
          <ul className="dts-wave-preview">
            {composition.map(({ type, count }) => (
              <li key={type}>
                <span
                  className="dts-wave-preview__dot"
                  style={{ background: ENEMY_TYPES[type].accent }}
                  aria-hidden="true"
                />
                {count}× {ENEMY_TYPES[type].name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
