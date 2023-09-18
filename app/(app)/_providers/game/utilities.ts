import { cloneDeep, every } from "lodash";
import { IOptionalGrid, ICell, IOptionalHints, IHints } from "@/(app)/_types";

/**
 * Updates a cell in the grid with a new value.
 *
 * @param grid - The current grid.
 * @param selectedCell - The cell to update.
 * @param value - The new value.
 * @returns An object containing the updated grid and the previous value of the cell.
 */
export function updateCell(grid: IOptionalGrid, selectedCell: ICell, value: number | null): {
    grid: IOptionalGrid,
    previousValue: number | null,
} {
    const updatedGrid = cloneDeep(grid);
    const previousValue = updatedGrid[selectedCell.row][selectedCell.col];
    updatedGrid[selectedCell.row][selectedCell.col] = value;

    return {
        grid: updatedGrid,
        previousValue
    };
}

/**
 * Shows a hidden hint in the user hints grid.
 *
 * @param userHints - The current hints visible to the user.
 * @param validHints - The actual valid hints.
 * @returns An object containing the updated hints, the direction, and the index of the hint shown.
 */
export function showHiddenHint(userHints: IOptionalHints, validHints: IHints): {
    hints: IOptionalHints,
    direction: keyof IOptionalHints,
    index: number
} {
    const updatedUserHints = cloneDeep(userHints); // Clone to avoid mutation

    // Create a list of all possible hints to update
    let possibleHintsToUpdate: { dir: keyof IOptionalHints; index: number }[] = [];

    for (const dir in userHints) {
        const direction = dir as keyof IOptionalHints;
        userHints[direction].forEach((hint, index) => {
            if (hint === null) {
                possibleHintsToUpdate.push({ dir: direction, index });
            }
        });
    }

    // Randomly select a hint to update
    const randomIndex = Math.floor(Math.random() * possibleHintsToUpdate.length);
    const { dir, index } = possibleHintsToUpdate[randomIndex];

    // Update the selected hint
    updatedUserHints[dir][index] = validHints[dir][index];

    return {
        hints: updatedUserHints,
        direction: dir,
        index
    }
}

/**
 * Hides a previously shown hint.
 *
 * @param hints - The current hints visible to the user.
 * @param direction - The direction of the hint to hide.
 * @param index - The index of the hint to hide.
 * @returns The updated hints with the specified hint hidden.
 */
export function hideShownHint(hints: IOptionalHints, direction: keyof IOptionalHints, index: number): IOptionalHints {
    const updatedUserHints = cloneDeep(hints); // Clone to avoid mutation
    updatedUserHints[direction][index] = null;
    return updatedUserHints
}

/**
 * Checks if the grid is fully filled.
 *
 * @param grid - The grid to check.
 * @returns True if the grid is fully filled, false otherwise.
 */
export function isGridFullyFilled(grid: IOptionalGrid): boolean {
    return every(grid, row => every(row, cell => cell !== null));
}
