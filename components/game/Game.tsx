"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { GameBoard } from "@/components/game/GameBoard";
import { GameHud } from "@/components/game/GameHud";
import { GameOverDialog } from "@/components/game/GameOverDialog";
import { TutorialDialog } from "@/components/game/TutorialDialog";
import { UnitBench } from "@/components/game/UnitBench";
import { UnitShop } from "@/components/game/UnitShop";
import { useGameEngine } from "@/game/hooks/useGameEngine";
import "@/components/game/game.css";

export function Game() {
  const engine = useGameEngine();
  const { snapshot } = engine;

  return (
    <div className="dts-shell">
      <header className="dts-topbar">
        <div className="dts-topbar__brand">
          <Link href="/#home" className="dts-brand" aria-label="Ella Potter — home">
            EP<span>.</span>
          </Link>
          <div>
            <p className="dts-kicker">Game mode</p>
            <h1>Defend the Stack</h1>
          </div>
        </div>
        <Link href="/#home" className="dts-button dts-button--ghost">
          <ArrowLeft aria-hidden="true" />
          Back to Portfolio
        </Link>
      </header>

      <div className="dts-layout">
        <div className="dts-layout__board">
          <GameBoard
            snapshot={snapshot}
            onSelectUnit={engine.selectUnit}
            onActivateUnit={engine.handleUnitActivate}
            onActivateTile={engine.handleTileActivate}
            onDropUnit={(unitId, destination) =>
              engine.tryPlaceOrMerge(unitId, destination)
            }
          />
        </div>

        <aside className="dts-layout__side">
          <GameHud
            snapshot={snapshot}
            onPause={engine.togglePause}
            onRestart={engine.restart}
            onMute={engine.toggleMute}
            onHelp={engine.openHelp}
            onStartWave={engine.startNextWave}
            onClearSelection={engine.clearSelection}
          />
          <UnitShop
            canRecruit={engine.canRecruit}
            disabledReason={engine.recruitDisabledReason}
            coins={snapshot.coins}
            onRecruit={engine.recruit}
          />
          <UnitBench
            snapshot={snapshot}
            onActivateUnit={engine.handleUnitActivate}
            onSelectUnit={engine.selectUnit}
            onActivateSlot={engine.handleBenchSlotActivate}
            onDropUnit={(unitId, destination) =>
              engine.tryPlaceOrMerge(unitId, destination)
            }
          />
        </aside>
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {snapshot.announcements.at(-1)?.message ?? ""}
      </div>

      <TutorialDialog
        open={snapshot.showTutorial}
        onClose={engine.closeTutorial}
      />
      <GameOverDialog
        open={snapshot.phase === "won" || snapshot.phase === "lost"}
        won={snapshot.phase === "won"}
        score={snapshot.finalScore}
        highScore={snapshot.highScore}
        onRestart={engine.restart}
      />
    </div>
  );
}
