import type { WaveConfiguration } from "@/game/types";

export const WAVES: WaveConfiguration[] = [
  {
    id: 1,
    name: "Hello, World!",
    bonusCoins: 30,
    spawns: [{ type: "syntaxError", count: 4, delayMs: 400, intervalMs: 900 }],
  },
  {
    id: 2,
    name: "Stack Trace Rising",
    bonusCoins: 35,
    spawns: [{ type: "syntaxError", count: 7, delayMs: 300, intervalMs: 750 }],
  },
  {
    id: 3,
    name: "Yellow Alerts",
    bonusCoins: 40,
    spawns: [
      { type: "syntaxError", count: 4, delayMs: 200, intervalMs: 800 },
      { type: "warning", count: 5, delayMs: 1200, intervalMs: 500 },
    ],
  },
  {
    id: 4,
    name: "Mixed Compile",
    bonusCoins: 45,
    spawns: [
      { type: "syntaxError", count: 6, delayMs: 200, intervalMs: 700 },
      { type: "warning", count: 6, delayMs: 800, intervalMs: 450 },
    ],
  },
  {
    id: 5,
    name: "Loop Incoming",
    bonusCoins: 55,
    spawns: [
      { type: "syntaxError", count: 4, delayMs: 200, intervalMs: 700 },
      { type: "infiniteLoop", count: 2, delayMs: 1500, intervalMs: 1600 },
      { type: "warning", count: 4, delayMs: 900, intervalMs: 500 },
    ],
  },
  {
    id: 6,
    name: "Race Condition",
    bonusCoins: 60,
    spawns: [
      { type: "warning", count: 10, delayMs: 150, intervalMs: 380 },
      { type: "syntaxError", count: 5, delayMs: 400, intervalMs: 650 },
      { type: "infiniteLoop", count: 1, delayMs: 2000, intervalMs: 1000 },
    ],
  },
  {
    id: 7,
    name: "Branch Collision",
    bonusCoins: 70,
    spawns: [
      { type: "mergeConflict", count: 3, delayMs: 600, intervalMs: 1400 },
      { type: "syntaxError", count: 5, delayMs: 200, intervalMs: 700 },
      { type: "warning", count: 4, delayMs: 1000, intervalMs: 450 },
    ],
  },
  {
    id: 8,
    name: "Production Spike",
    bonusCoins: 80,
    spawns: [
      { type: "syntaxError", count: 8, delayMs: 150, intervalMs: 600 },
      { type: "warning", count: 8, delayMs: 400, intervalMs: 400 },
      { type: "infiniteLoop", count: 3, delayMs: 1200, intervalMs: 1400 },
      { type: "mergeConflict", count: 2, delayMs: 1800, intervalMs: 1600 },
    ],
  },
  {
    id: 9,
    name: "Red Alert",
    bonusCoins: 90,
    spawns: [
      { type: "warning", count: 12, delayMs: 100, intervalMs: 320 },
      { type: "mergeConflict", count: 3, delayMs: 800, intervalMs: 1200 },
      { type: "infiniteLoop", count: 3, delayMs: 1000, intervalMs: 1300 },
      { type: "syntaxError", count: 6, delayMs: 300, intervalMs: 550 },
    ],
  },
  {
    id: 10,
    name: "Critical Path",
    bonusCoins: 120,
    spawns: [
      { type: "criticalBug", count: 1, delayMs: 800, intervalMs: 1000 },
      { type: "mergeConflict", count: 4, delayMs: 400, intervalMs: 1100 },
      { type: "infiniteLoop", count: 3, delayMs: 1200, intervalMs: 1400 },
      { type: "warning", count: 10, delayMs: 200, intervalMs: 350 },
      { type: "syntaxError", count: 8, delayMs: 500, intervalMs: 500 },
    ],
  },
];
