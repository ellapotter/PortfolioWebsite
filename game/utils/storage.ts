import { STORAGE_KEYS } from "@/game/config/balance";
import type { StoredPreferences } from "@/game/types";

function canUseStorage() {
  try {
    if (typeof window === "undefined" || !window.localStorage) return false;
    const probe = "__dts_probe__";
    window.localStorage.setItem(probe, "1");
    window.localStorage.removeItem(probe);
    return true;
  } catch {
    return false;
  }
}

function readNumber(key: string, fallback: number) {
  if (!canUseStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    const value = Number(raw);
    return Number.isFinite(value) && value >= 0 ? value : fallback;
  } catch {
    return fallback;
  }
}

function readBoolean(key: string, fallback: boolean) {
  if (!canUseStorage()) return fallback;
  try {
    const raw = window.localStorage.getItem(key);
    if (raw == null) return fallback;
    if (raw === "true") return true;
    if (raw === "false") return false;
    return fallback;
  } catch {
    return fallback;
  }
}

function writeValue(key: string, value: string) {
  if (!canUseStorage()) return;
  try {
    window.localStorage.setItem(key, value);
  } catch {
    // Ignore quota / private-mode failures.
  }
}

export function loadPreferences(): StoredPreferences {
  return {
    highScore: readNumber(STORAGE_KEYS.highScore, 0),
    muted: readBoolean(STORAGE_KEYS.muted, false),
    tutorialCompleted: readBoolean(STORAGE_KEYS.tutorialCompleted, false),
  };
}

export function saveHighScore(score: number) {
  const current = readNumber(STORAGE_KEYS.highScore, 0);
  if (score > current) {
    writeValue(STORAGE_KEYS.highScore, String(Math.floor(score)));
    return score;
  }
  return current;
}

export function saveMuted(muted: boolean) {
  writeValue(STORAGE_KEYS.muted, String(muted));
}

export function saveTutorialCompleted(completed: boolean) {
  writeValue(STORAGE_KEYS.tutorialCompleted, String(completed));
}
