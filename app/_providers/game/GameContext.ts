import { createContext } from "react";
import { ContextType } from "./types";

const defaultContext: ContextType = {
    game: {
        validGrid: [],
        filledGrid: [],
        hints: {
            left: [],
            right: [],
            top: [],
            bottom: []
        },
        shownHints: {
            left: [],
            right: [],
            top: [],
            bottom: []
        },
        createdAt: new Date(),
        dimension: 3,
        difficulty: "easy",
        hiddenHintCount: 0,
        isGameCompleted: false,
        isGameWon: false,
        usedHiddenHintRights: 0,
        id: "",
        userId: "",
    },
    isTimerRunning: false,
    updateGridCell: () => {
    },
    giveAHint: () => {
    },
    showAnswer: () => {
    },
    newGame: () => {
    },
    finishGame: () => {
    }
};

export default createContext<ContextType>(defaultContext);