"use client";

import { useEffect, useId, useRef } from "react";
import type { ScoreBreakdown } from "@/game/types";

type GameOverDialogProps = {
  open: boolean;
  won: boolean;
  score: ScoreBreakdown | null;
  highScore: number;
  onRestart: () => void;
  onClose?: () => void;
};

export function GameOverDialog({
  open,
  won,
  score,
  highScore,
  onRestart,
}: GameOverDialogProps) {
  const titleId = useId();
  const actionRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (open) actionRef.current?.focus();
  }, [open]);

  if (!open || !score) return null;

  return (
    <div className="dts-modal" role="presentation">
      <div className="dts-modal__backdrop" aria-hidden="true" />
      <div
        className="dts-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId}>{won ? "Stack secured" : "Server crashed"}</h2>
        <p>
          {won
            ? "You cleared every wave. Nice merge decisions."
            : "Too many bugs reached the core. Try a new lineup."}
        </p>
        <dl className="dts-scorecard">
          <div>
            <dt>Final score</dt>
            <dd>{score.total}</dd>
          </div>
          <div>
            <dt>High score</dt>
            <dd>{highScore}</dd>
          </div>
          <div>
            <dt>Enemies defeated</dt>
            <dd>{score.enemiesDefeated}</dd>
          </div>
          <div>
            <dt>Waves completed</dt>
            <dd>{score.wavesCompleted}</dd>
          </div>
          <div>
            <dt>Base health bonus</dt>
            <dd>{score.baseHealthRemaining}</dd>
          </div>
          <div>
            <dt>Rank bonus</dt>
            <dd>{score.highestRankAchieved}</dd>
          </div>
          <div>
            <dt>Coins remaining</dt>
            <dd>{score.coinsRemaining}</dd>
          </div>
          <div>
            <dt>Completion bonus</dt>
            <dd>{score.completionBonus}</dd>
          </div>
        </dl>
        <div className="dts-modal__actions">
          <button
            ref={actionRef}
            type="button"
            className="dts-button dts-button--primary"
            onClick={onRestart}
          >
            Play again
          </button>
        </div>
      </div>
    </div>
  );
}
