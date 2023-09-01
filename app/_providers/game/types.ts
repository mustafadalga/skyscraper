import { ICell, IGrid, IHints, IOptionalGrid, IOptionalHints } from "@/_types";
import { Game } from ".prisma/client";

export interface IGame extends Omit<Game, "validGrid" | "filledGrid" | "hints" | "shownHints" | "createdAt" | "updatedAt" | "timeTaken"> {
    validGrid: IGrid,
    filledGrid: IOptionalGrid
    hints: IHints;
    shownHints: IOptionalHints,
}

export interface ContextType {
    game: IGame,
    updateGridCell: (cell: ICell, value: number | null) => void,
    giveAHint: () => void,
    showAnswer:()=>void
}