import type { Metadata } from "next";
import { Game } from "@/components/game/Game";

export const metadata: Metadata = {
  title: "Defend the Stack | Ella Potter",
  description:
    "A programming-themed merge tower-defense game built with React and TypeScript.",
};

export default function GamePage() {
  return <Game />;
}
