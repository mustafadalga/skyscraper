import { Badge, Difficulty } from "@/_enums";

/**
 * Calculate the number of hints to hide based on various factors such as score, average time, difficulty level, and badges.
 *
 * @param score - The user's current score.
 * @param avgTime - The user's average time taken to complete games.
 * @param dimension - The dimension of the game board (e.g., 4 for a 4x4 board).
 * @param difficulty - The difficulty level of the game (easy, medium, hard).
 * @param highestBadge - The highest badge the user has earned.
 *
 * @returns The number of hints to hide. This value will not exceed the total number of cells in the game board.
 */
export default function calculateHiddenHintCount(score: number,
                                             avgTime: number,
                                             dimension: number,
                                             difficulty: Difficulty,
                                             highestBadge: Badge) {
    // Initialization and constants
    const totalHints = dimension * dimension;
    let baseHintsToHide = 0;
    const EASY_MULTIPLIER = 0.9; // 90% hints to show
    const MEDIUM_MULTIPLIER = 0.85; // 85% hints to show
    const HARD_MULTIPLIER = 0.80; // 80% hints to show
    const SCORE_THRESHOLD_1 = 100;
    const SCORE_THRESHOLD_2 = 200;
    const SCORE_INCREMENT = 1;
    const AVG_TIME_THRESHOLD = 300;

    // Helper function for decrementing baseHintsToHide
    const incrementBaseHints = (count: number) => {
        baseHintsToHide += count;
    };


    // Factor in difficulty
    switch (difficulty) {
        case Difficulty.EASY:
            incrementBaseHints(Math.floor(totalHints * (1 - EASY_MULTIPLIER)))
            break;
        case Difficulty.MEDIUM:
            incrementBaseHints(Math.floor(totalHints * (1 - MEDIUM_MULTIPLIER)))
            break;
        case Difficulty.HARD:
            incrementBaseHints(Math.floor(totalHints * (1 - HARD_MULTIPLIER)))
            break;
    }

    // Factor in score
    if (score > SCORE_THRESHOLD_1) {
        incrementBaseHints(SCORE_INCREMENT);
    }
    if (score > SCORE_THRESHOLD_2) {
        incrementBaseHints(SCORE_INCREMENT);
    }

    // Factor in average time
    if (avgTime < AVG_TIME_THRESHOLD) {
        incrementBaseHints(SCORE_INCREMENT);
    }

    // Factor in badges
    switch (highestBadge) {
        case Badge.MasterPlanner:
        case Badge.NoHintsNeeded:
            incrementBaseHints(3);
            break;
        case Badge.TimeLord:
        case Badge.StreakBuilder:
            incrementBaseHints(2)
            break;
    }
    // Ensure the number of hidden hints does not exceed the board size
    return Math.min(baseHintsToHide, totalHints)
}
