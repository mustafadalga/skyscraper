import { ICell, IGrid, IHints, IOptionalGrid, IOptionalHints } from "@/(app)/_types";
import { Game } from ".prisma/client";

export interface IGame extends Omit<Game, "validGrid" | "filledGrid" | "hints" | "shownHints" | "updatedAt"> {
    validGrid: IGrid,
    filledGrid: IOptionalGrid
    hints: IHints;
    shownHints: IOptionalHints,
}

export interface ContextType {
    game: IGame,
    isTimerRunning: boolean
    updateGridCell: (cell: ICell, value: number | null) => void,
    giveAHint: () => void,
    showAnswer: () => void,
    newGame: () => void,
    finishGame: () => void,
}