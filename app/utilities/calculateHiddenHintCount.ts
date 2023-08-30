import { Badge, Difficulty } from "@/_enums";

export default function calculateHiddenHintCount(score: number,
                                             avgTime: number,
                                             dimension: number,
                                             difficulty: Difficulty,
                                             highestBadge: Badge) {
    let baseHintsToHide = 0;
    const EASY_MULTIPLIER = 0.1;
    const MEDIUM_MULTIPLIER = 0.2;
    const HARD_MULTIPLIER = 0.3;
    const SCORE_THRESHOLD_1 = 100;
    const SCORE_THRESHOLD_2 = 200;
    const SCORE_INCREMENT = 1;
    const AVG_TIME_THRESHOLD = 300;
    // Helper function for incrementing baseHintsToHide
    const incrementBaseHints = (count: number) => {
        baseHintsToHide += count;
    };


    // Factor in difficulty
    switch (difficulty) {
        case Difficulty.EASY:
            baseHintsToHide = Math.floor(dimension * EASY_MULTIPLIER);
            break;
        case Difficulty.MEDIUM:
            baseHintsToHide = Math.floor(dimension * MEDIUM_MULTIPLIER);
            break;
        case Difficulty.HARD:
            baseHintsToHide = Math.floor(dimension * HARD_MULTIPLIER);
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
            baseHintsToHide += 3;
            break;
        case Badge.TimeLord:
        case Badge.TheHighScorer:
            baseHintsToHide += 2;
            break;
    }
    // Ensure the number of hidden hints does not exceed the board size
    return Math.min(baseHintsToHide, dimension * dimension);
}
