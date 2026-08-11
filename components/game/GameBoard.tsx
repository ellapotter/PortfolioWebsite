"use client";

import { Server } from "lucide-react";
import {
  BASE_POSITION,
  GRID,
  isPathCell,
  PATH_WAYPOINTS,
  PLACEMENT_TILES,
} from "@/game/config/map";
import { getPositionAlongPath } from "@/game/engine/movement";
import { canMergeUnits } from "@/game/engine/merging";
import type { GameSnapshot, UnitInstance } from "@/game/types";
import { EnemyToken } from "@/components/game/EnemyToken";
import { UnitToken } from "@/components/game/UnitToken";

type GameBoardProps = {
  snapshot: GameSnapshot;
  onSelectUnit: (unitId: string) => void;
  onActivateUnit: (unitId: string) => void;
  onActivateTile: (tileId: string) => void;
  onDropUnit: (
    unitId: string,
    destination: { kind: "tile"; tileId: string },
  ) => boolean;
};

function unitOnTile(units: UnitInstance[], tileId: string) {
  return units.find(
    (unit) => unit.location.kind === "tile" && unit.location.tileId === tileId,
  );
}

export function GameBoard({
  snapshot,
  onSelectUnit,
  onActivateUnit,
  onActivateTile,
  onDropUnit,
}: GameBoardProps) {
  const selectedId =
    snapshot.selection.kind === "unit" ? snapshot.selection.unitId : null;
  const selected = selectedId
    ? snapshot.units.find((unit) => unit.id === selectedId) ?? null
    : null;

  return (
    <div className="dts-board" aria-label="Battlefield">
      <svg className="dts-board__path" viewBox={`0 0 ${GRID.cols} ${GRID.rows}`} aria-hidden="true">
        <polyline
          fill="none"
          stroke="rgba(244, 114, 182, 0.55)"
          strokeWidth="0.55"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={PATH_WAYPOINTS.map((p) => `${p.x},${p.y}`).join(" ")}
        />
        <circle cx={PATH_WAYPOINTS[0].x} cy={PATH_WAYPOINTS[0].y} r="0.22" fill="#f9a8d4" />
        <text
          x={PATH_WAYPOINTS[0].x}
          y={PATH_WAYPOINTS[0].y - 0.45}
          textAnchor="middle"
          fill="#fce7f3"
          fontSize="0.28"
        >
          BUGS IN
        </text>
      </svg>

      <div
        className="dts-board__grid"
        style={{
          gridTemplateColumns: `repeat(${GRID.cols}, minmax(0, 1fr))`,
          gridTemplateRows: `repeat(${GRID.rows}, minmax(0, 1fr))`,
        }}
      >
        {Array.from({ length: GRID.rows * GRID.cols }, (_, index) => {
          const col = index % GRID.cols;
          const row = Math.floor(index / GRID.cols);
          const tile = PLACEMENT_TILES.find((item) => item.col === col && item.row === row);
          const onPath = isPathCell(col, row);
          const isBase = col === BASE_POSITION.col && row === BASE_POSITION.row;
          const occupant = tile ? unitOnTile(snapshot.units, tile.id) : undefined;
          const isValidDrop =
            Boolean(selected && tile) &&
            (!occupant || (selected ? canMergeUnits(selected, occupant) : false));
          const mergeHint =
            Boolean(selected && occupant && selected.id !== occupant.id && canMergeUnits(selected, occupant));

          return (
            <div
              key={`${col}-${row}`}
              className={`dts-cell ${onPath ? "dts-cell--path" : ""} ${tile ? "dts-cell--pad" : ""} ${isBase ? "dts-cell--base" : ""} ${isValidDrop ? "dts-cell--valid" : ""}`}
              style={{ gridColumn: col + 1, gridRow: row + 1 }}
              onDragOver={(event) => {
                if (!tile) return;
                event.preventDefault();
              }}
              onDrop={(event) => {
                if (!tile) return;
                event.preventDefault();
                const unitId = event.dataTransfer.getData("text/unit-id");
                if (unitId) onDropUnit(unitId, { kind: "tile", tileId: tile.id });
              }}
            >
              {isBase && (
                <div className="dts-base" title="Server core">
                  <Server aria-hidden="true" />
                  <span>SERVER</span>
                  <strong>{snapshot.baseHealth}</strong>
                </div>
              )}

              {tile && !occupant && (
                <button
                  type="button"
                  className="dts-pad"
                  aria-label={`Placement tile ${tile.id}${isValidDrop ? ", valid destination" : ""}`}
                  onClick={() => onActivateTile(tile.id)}
                />
              )}

              {tile && occupant && (
                <div className="dts-pad dts-pad--filled">
                  <UnitToken
                    unit={occupant}
                    selected={selected?.id === occupant.id}
                    mergeHint={mergeHint}
                    onSelect={() => onActivateUnit(occupant.id)}
                    onDragStart={(event) => {
                      event.dataTransfer.setData("text/unit-id", occupant.id);
                      event.dataTransfer.effectAllowed = "move";
                      onSelectUnit(occupant.id);
                    }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="dts-board__overlay" aria-hidden={snapshot.enemies.length === 0}>
        {snapshot.enemies.map((enemy) => {
          const pos = getPositionAlongPath(enemy.progress);
          const xPercent = ((pos.x + 0.5) / GRID.cols) * 100;
          const yPercent = ((pos.y + 0.5) / GRID.rows) * 100;
          return (
            <EnemyToken
              key={enemy.id}
              enemy={enemy}
              xPercent={xPercent}
              yPercent={yPercent}
            />
          );
        })}

        {snapshot.projectiles.map((projectile) => (
          <span
            key={projectile.id}
            className="dts-projectile"
            style={{
              left: `${((projectile.x + 0.5) / GRID.cols) * 100}%`,
              top: `${((projectile.y + 0.5) / GRID.rows) * 100}%`,
              background: projectile.color,
            }}
          />
        ))}
      </div>
    </div>
  );
}
