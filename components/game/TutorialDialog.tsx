"use client";

import { useEffect, useId, useRef } from "react";

const STEPS = [
  "Recruit a developer with coins.",
  "Place the developer on a glowing tile near the bug path.",
  "Start the wave once at least one unit is on the field.",
  "Earn coins by defeating bugs before they reach the server.",
  "Merge two matching developers of the same rank to promote them.",
  "Protect the server through all ten waves.",
] as const;

type TutorialDialogProps = {
  open: boolean;
  onClose: (markComplete: boolean) => void;
};

export function TutorialDialog({ open, onClose }: TutorialDialogProps) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    closeRef.current?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose(true);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="dts-modal" role="presentation">
      <button
        type="button"
        className="dts-modal__backdrop"
        aria-label="Close tutorial"
        onClick={() => onClose(true)}
      />
      <div
        className="dts-modal__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <h2 id={titleId}>How to play Defend the Stack</h2>
        <p>
          Bugs are marching toward your server. Recruit developers, place them beside
          the path, and merge matching units to keep the codebase online.
        </p>
        <ol>
          {STEPS.map((step) => (
            <li key={step}>{step}</li>
          ))}
        </ol>
        <div className="dts-modal__actions">
          <button
            type="button"
            className="dts-button"
            onClick={() => onClose(false)}
          >
            Skip for now
          </button>
          <button
            ref={closeRef}
            type="button"
            className="dts-button dts-button--primary"
            onClick={() => onClose(true)}
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
}
