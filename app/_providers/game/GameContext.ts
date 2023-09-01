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
        dimension: 3,
        difficulty: "easy",
        hiddenHintCount: 0,
        completed: false,
        usedHiddenHintRights: 0,
        id: "",
        userId: "",
    },
    updateGridCell: () => {
    },
    giveAHint: () => {
    }
};

export default createContext<ContextType>(defaultContext);