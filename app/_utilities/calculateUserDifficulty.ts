import { Badge, Difficulty } from "@/_enums";

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