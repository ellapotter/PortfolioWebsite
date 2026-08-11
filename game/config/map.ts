import type { PathWaypoint, PlacementTile } from "@/game/types";

export const GRID = {
  cols: 10,
  rows: 7,
} as const;

/** Continuous path waypoints in grid cell-center coordinates. */
export const PATH_WAYPOINTS: PathWaypoint[] = [
  { x: -0.5, y: 3 },
  { x: 1, y: 3 },
  { x: 2, y: 3 },
  { x: 2, y: 1 },
  { x: 4, y: 1 },
  { x: 5, y: 1 },
  { x: 5, y: 4 },
  { x: 7, y: 4 },
  { x: 8, y: 4 },
  { x: 8, y: 2 },
  { x: 9.2, y: 2 },
];

export const BASE_POSITION = { col: 9, row: 2 } as const;

export const PATH_CELLS: ReadonlyArray<{ col: number; row: number }> = [
  { col: 0, row: 3 },
  { col: 1, row: 3 },
  { col: 2, row: 3 },
  { col: 2, row: 2 },
  { col: 2, row: 1 },
  { col: 3, row: 1 },
  { col: 4, row: 1 },
  { col: 5, row: 1 },
  { col: 5, row: 2 },
  { col: 5, row: 3 },
  { col: 5, row: 4 },
  { col: 6, row: 4 },
  { col: 7, row: 4 },
  { col: 8, row: 4 },
  { col: 8, row: 3 },
  { col: 8, row: 2 },
  { col: 9, row: 2 },
];

export const PLACEMENT_TILES: PlacementTile[] = [
  { id: "t-1-2", col: 1, row: 2 },
  { id: "t-1-4", col: 1, row: 4 },
  { id: "t-3-2", col: 3, row: 2 },
  { id: "t-3-0", col: 3, row: 0 },
  { id: "t-4-0", col: 4, row: 0 },
  { id: "t-4-2", col: 4, row: 2 },
  { id: "t-4-3", col: 4, row: 3 },
  { id: "t-6-1", col: 6, row: 1 },
  { id: "t-6-3", col: 6, row: 3 },
  { id: "t-7-3", col: 7, row: 3 },
  { id: "t-7-5", col: 7, row: 5 },
  { id: "t-9-3", col: 9, row: 3 },
];

const pathCellKeys = new Set(PATH_CELLS.map((cell) => `${cell.col},${cell.row}`));
const placementKeys = new Set(PLACEMENT_TILES.map((tile) => `${tile.col},${tile.row}`));

export function isPathCell(col: number, row: number) {
  return pathCellKeys.has(`${col},${row}`);
}

export function isPlacementCell(col: number, row: number) {
  return placementKeys.has(`${col},${row}`);
}

export function getTileById(tileId: string) {
  return PLACEMENT_TILES.find((tile) => tile.id === tileId) ?? null;
}

export function getTileAt(col: number, row: number) {
  return PLACEMENT_TILES.find((tile) => tile.col === col && tile.row === row) ?? null;
}

/** Build cumulative path lengths for progress-based movement. */
export function buildPathMetrics(waypoints: PathWaypoint[] = PATH_WAYPOINTS) {
  const segmentLengths: number[] = [];
  let total = 0;

  for (let i = 0; i < waypoints.length - 1; i += 1) {
    const a = waypoints[i];
    const b = waypoints[i + 1];
    const length = Math.hypot(b.x - a.x, b.y - a.y);
    segmentLengths.push(length);
    total += length;
  }

  return { segmentLengths, totalLength: total, waypoints };
}

export const PATH_METRICS = buildPathMetrics();
