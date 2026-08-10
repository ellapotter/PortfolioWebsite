"use client";

import { useEffect, useState } from "react";

const TYPE_SPEED_MS = 55;
const DELETE_SPEED_MS = 30;
const PAUSE_AFTER_TYPING_MS = 2800;
const PAUSE_BEFORE_TYPING_MS = 500;

type TypewriterSkillsProps = {
  sequences: string[];
  className?: string;
  staticText?: string;
};

export function TypewriterSkills({
  sequences,
  className = "",
  staticText,
}: TypewriterSkillsProps) {
  const [sequenceIndex, setSequenceIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (staticText !== undefined) return;

    const current = sequences[sequenceIndex];
    let timeout: ReturnType<typeof setTimeout>;

    if (!isDeleting && text === current) {
      timeout = setTimeout(() => setIsDeleting(true), PAUSE_AFTER_TYPING_MS);
    } else if (isDeleting && text === "") {
      timeout = setTimeout(() => {
        setIsDeleting(false);
        setSequenceIndex((index) => (index + 1) % sequences.length);
      }, PAUSE_BEFORE_TYPING_MS);
    } else {
      const speed = isDeleting ? DELETE_SPEED_MS : TYPE_SPEED_MS;
      timeout = setTimeout(() => {
        setText(
          isDeleting
            ? current.slice(0, text.length - 1)
            : current.slice(0, text.length + 1),
        );
      }, speed);
    }

    return () => clearTimeout(timeout);
  }, [text, isDeleting, sequenceIndex, sequences, staticText]);

  const displayText = staticText ?? text;
  const isTraits = sequenceIndex === 0;

  return (
    <span
      className={`block min-h-[3rem] text-center font-mono text-base font-semibold leading-relaxed sm:min-h-[2.5rem] sm:text-lg ${className}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <span className={isTraits ? "text-pink-600" : "text-fuchsia-600"}>
        {displayText}
      </span>
      {!staticText && (
        <span
          className={`ml-0.5 inline-block w-[2px] animate-pulse ${
            isTraits ? "bg-pink-500" : "bg-fuchsia-500"
          }`}
          style={{ height: "1.1em" }}
          aria-hidden="true"
        />
      )}
    </span>
  );
}
