import { Badge, Difficulty } from "@/(app)/_enums";

/**
 * Calculates the difficulty level for a user based on various factors.
 *
 * This function takes into account the user's score, average time spent on puzzles,
 * and the badges they have earned to determine their overall difficulty level.
 *
 * @param {number} score - The user's score.
 * @param {number} avgTimeInSeconds - The user's average time to complete a puzzle in seconds.
 * @param {string[]} badges - An array of badge identifiers that the user has earned.
 *
 * @returns {Difficulty} The calculated difficulty level for the user.
 *
 * @example
 *
 * const userDifficulty = calculateUserDifficulty(200, 250, ['MasterPlanner', 'PuzzleExplorer']);
 * console.log(userDifficulty);  // Output will be 'HARD'
 */
export default function calculateUserDifficulty(score: number, avgTimeInSeconds: number, badges: string[]) {
    let difficulty = Difficulty.EASY;  // Default difficulty
    const HARD_THRESHOLD_IN_SECONDS = 300;  // 5 minutes in seconds
    const MEDIUM_THRESHOLD = 100;
    const HARD_THRESHOLD = 300;

    // Factor in score and in average time
    if (score >= HARD_THRESHOLD || avgTimeInSeconds < HARD_THRESHOLD_IN_SECONDS) {
        difficulty = Difficulty.HARD;
    } else if (score >= MEDIUM_THRESHOLD) {
        difficulty = Difficulty.MEDIUM;
    }

    // Factor in badges
    const highLevelBadges = [ Badge.MasterPlanner, Badge.NoHintsNeeded, Badge.PuzzleOlympian, Badge.PuzzleHero, Badge.PuzzleImmortal ];
    if (highLevelBadges.some(badge => badges.includes(badge))) {
        difficulty = Difficulty.HARD;
    } else if (badges.includes(Badge.PuzzleExplorer)) {
        difficulty = Difficulty.MEDIUM;
    }

    return difficulty;
}