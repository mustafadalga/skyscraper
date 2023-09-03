import { Badge, Difficulty, Direction } from "@/_enums";
import { cloneDeep, shuffle } from "lodash";
import { IHints, IOptionalHints } from "@/_types";

/**
 * Determine which hints to show based on various factors like user score, average time, difficulty, and highest badge.
 *
 * @param hints - The original hints for the game.
 * @param hiddenCount - The number of hints to hide.
 * @param score - The user's current score.
 * @param avgTime - The user's average time taken to complete games.
 * @param difficulty - The difficulty level of the game (easy, medium, hard).
 * @param highestBadge - The highest badge the user has earned.
 *
 * @returns An object containing which hints to show. Hints that are to be hidden are set to `null`.
 */
export default function getShownHints(
    hints: IHints,
    hiddenCount: number,
    score: number,
    avgTime: number,
    difficulty: Difficulty,
    highestBadge: Badge
): IOptionalHints {
    // Clone the original hints
    const shownHints: Record<Direction, (number | null)[]> = cloneDeep(hints);
    const SCORE_THRESHOLD = 200;
    const AVG_TIME_THRESHOLD = 300;

    // Create a list of all possible hints to hide
    let possibleHintsToHide: { dir: Direction, index: number }[] = [];

    for (const dir in Direction) {
        hints[dir.toLowerCase() as Direction].forEach((_, index) => {
            possibleHintsToHide.push({ dir: dir.toLowerCase() as Direction, index });
        });
    }

    // Shuffle the list for randomness
    shuffle(possibleHintsToHide);

    // Further customization based on user characteristics
    if (score > SCORE_THRESHOLD) {
        possibleHintsToHide.sort((a, b) => a.dir.localeCompare(b.dir));
    }

    // Low average time: Sort hints in the opposite way
    if (avgTime < AVG_TIME_THRESHOLD) {
        possibleHintsToHide.sort((a, b) => b.dir.localeCompare(a.dir));
    }

    // High-level badge: Shuffle hints
    switch (highestBadge) {
        case Badge.PuzzleImmortal:
        case Badge.MasterPlanner:
            shuffle(possibleHintsToHide);
            break;
        default:
            break;
    }

    // Adjust based on difficulty
    if (difficulty === Difficulty.HARD) {// More randomness for hard
        shuffle(possibleHintsToHide);
    }

    // Remove the specified number of hints
    for (let i = 0; i < hiddenCount; i++) {
        const { dir, index } = possibleHintsToHide[i];
        shownHints[dir][index] = null;  // Set to null to indicate a hidden hint
    }

    return shownHints;
}