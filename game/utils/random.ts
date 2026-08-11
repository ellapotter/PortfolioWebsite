export type RandomFn = () => number;

export const defaultRandom: RandomFn = () => Math.random();

export function pickRandom<T>(items: readonly T[], random: RandomFn = defaultRandom): T {
  if (items.length === 0) {
    throw new Error("Cannot pick from an empty list.");
  }
  const index = Math.min(items.length - 1, Math.floor(random() * items.length));
  return items[index];
}

export function createId(prefix: string): string {
  return `${prefix}-${Math.random().toString(36).slice(2, 10)}-${Date.now().toString(36)}`;
}
