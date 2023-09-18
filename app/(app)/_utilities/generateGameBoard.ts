import generateGrid from "./generateGrid";
import generateHints from "./generateHints";
import calculateHiddenHintCount from "./calculateHiddenHintCount";
import getShownHints from "./getShownHints";
import createEmptyGrid from "./createEmptyGrid";
import { Badge, Difficulty } from "@/(app)/_enums";
import { IGameBoard } from "@/(app)/_types";


/**
 * Interface for the properties needed to generate a game board.
 */
interface Props {
    /** The player's current score */
    score: number,
    /** The average time taken by the player */
    avgTime: number,
    /** The dimension of the game board */
    dimension: number,
    /** The difficulty level of the game */
    difficulty: Difficulty,
    /** The highest badge earned by the player */
    highestBadge: Badge,
}

/**
 * Generates a new game board.
 *
 * @param {Props} { dimension, difficulty, score, avgTime, highestBadge }
 * @returns {IGameBoard} The generated game board.
 */
export function generateGameBoard({ dimension, difficulty, score, avgTime, highestBadge }: Props): IGameBoard {
    // Generate a valid grid for the game
    const grid = generateGrid(dimension);
    // Generate hints based on the valid grid
    const hints = generateHints(grid);
    // Calculate the number of hints to hide based on various factors
    const hiddenHintCount = calculateHiddenHintCount(score, avgTime, dimension, difficulty, highestBadge);
    // Get the hints to be shown to the user
    const shownHints = getShownHints(hints, hiddenHintCount)
    // Create an empty grid for the game
    const emptyGrid: null[][] = createEmptyGrid(dimension);

    // Return the assembled game board
    return {
        grid,
        hints,
        hiddenHintCount,
        shownHints,
        emptyGrid
    };
}
