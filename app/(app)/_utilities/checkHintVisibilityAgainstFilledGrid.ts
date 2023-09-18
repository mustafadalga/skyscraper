import { IHintCheckResult, IOptionalHints } from "@/(app)/_types";

/**
 * Count the number of visible buildings in a line (row or column) of the grid.
 *
 * @param line - An array representing a line (row or column) in the grid.
 * @returns The number of visible buildings. Returns -1 if the line is incomplete.
 */
function countVisibleBuildings(line: (number | null)[]): number {
    let count = 0;
    let maxHeight = 0;
    for (const height of line) {
        if (height === null) {
            return -1; // Incomplete line
        }
        if (height > maxHeight) {
            maxHeight = height;
            count++;
        }
    }
    return count;
}

/**
 * Check if the hints match with the visible buildings in the filled grid.
 *
 * @param hints - An object containing optional hints for each direction: top, left, right, bottom.
 * @param grid - A 2D array representing the grid where each cell may be filled (number) or empty (null).
 * @returns An object indicating whether each hint is correct (true), incorrect (false), or not yet verifiable (null).
 */
export default function checkHintVisibilityAgainstFilledGrid(
    hints: IOptionalHints,
    grid: (number | null)[][]
): IHintCheckResult {
    const result: IHintCheckResult = { top: [], left: [], right: [], bottom: [] };
    const dimension = grid.length;

    // Check top and bottom hints against columns
    for (let col = 0; col < dimension; col++) {
        const column = grid.map(row => row[col]);

        // Top
        const visibleFromTop = countVisibleBuildings(column);
        result.top[col] = visibleFromTop === -1 ? null : visibleFromTop === hints.top[col];

        // Bottom
        const visibleFromBottom = countVisibleBuildings([ ...column ].reverse());
        result.bottom[col] = visibleFromBottom === -1 ? null : visibleFromBottom === hints.bottom[col];
    }

    // Check left and right hints against rows
    for (let row = 0; row < dimension; row++) {
        const line = grid[row];

        // Left
        const visibleFromLeft = countVisibleBuildings(line);
        result.left[row] = visibleFromLeft === -1 ? null : visibleFromLeft === hints.left[row];

        // Right
        const visibleFromRight = countVisibleBuildings([ ...line ].reverse());
        result.right[row] = visibleFromRight === -1 ? null : visibleFromRight === hints.right[row];
    }

    return result
}