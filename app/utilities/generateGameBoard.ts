import generateGrid from "./generateGrid";
import generateHints from "./generateHints";
import calculateHiddenHintCount from "./calculateHiddenHintCount";
import getShownHints from "./getShownHints";
import createEmptyGrid from "./createEmptyGrid";
import { Badge, Difficulty } from "@/_enums";
import { IGameBoard } from "@/_types";


interface Props {
    score: number,
    avgTime: number,
    dimension: number,
    difficulty: Difficulty,
    highestBadge: Badge,
}


export function generateGameBoard({ dimension, difficulty, score, avgTime, highestBadge }: Props): IGameBoard {
    const grid = generateGrid(dimension);
    const hints = generateHints(grid);
    const hiddenHintCount = calculateHiddenHintCount(score, avgTime, dimension, difficulty, highestBadge);
    const shownHints = getShownHints(hints, hiddenHintCount, score, avgTime, difficulty, highestBadge)
    const emptyGrid: null[][] = createEmptyGrid(dimension);
    return {
        grid,
        hints,
        hiddenHintCount,
        shownHints,
        emptyGrid
    };
}
