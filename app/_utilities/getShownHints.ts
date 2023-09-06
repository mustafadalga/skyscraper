import { Direction } from "@/_enums";
import { cloneDeep } from "lodash";
import { IHints, IOptionalHints } from "@/_types";

/**
 * Determine which hints to show based on various factors like user score, average time, difficulty, and highest badge.
 *
 * @param hints - The original hints for the game.
 * @param hiddenCount - The number of hints to hide.
 *
 * @returns An object containing which hints to show. Hints that are to be hidden are set to `null`.
 */
export default function getShownHints(
    hints: IHints,
    hiddenCount: number,
): IOptionalHints {
    // Clone the original hints
    const shownHints: Record<Direction, (number | null)[]> = cloneDeep(hints);
    let selectedHintCount = hiddenCount;

    while (selectedHintCount > 0) {
        const direction = getRandomDirection();
        const directionHintIndex = getRandomHintIndex(shownHints[direction]);

        if (shownHints[direction][directionHintIndex] !== null) {
            shownHints[direction][directionHintIndex] = null;
            selectedHintCount--;
        }
    }
    return shownHints;
}

function getRandomDirection(): Direction {
    const directions = Object.values(Direction);
    const randomIndex = Math.floor(Math.random() * directions.length);
    return directions[randomIndex];
}

function getRandomHintIndex(array: (number | null)[]): number {
    return Math.floor(Math.random() * array.length);
}