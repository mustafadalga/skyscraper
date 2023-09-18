import { IGrid, IHints } from "@/(app)/_types";
/**
 * Calculate the number of visible buildings from one side of the row/column.
 *
 * @param heightsArray - An array representing the heights of the buildings in a row/column.
 * @returns The number of buildings visible from one side.
 */
function calculateOneSideVisibility(heightsArray: number[]): number {
    let maxHeight = 0;
    let visibleCount = 0;
    for (const height of heightsArray) {
        if (height > maxHeight) {
            maxHeight = height;
            visibleCount++;
        }
    }
    return visibleCount;
}
/**
 * Generate hints for a solved game grid.
 *
 * @param solvedGrid - The solved grid of the game.
 * @returns An object containing hints for each direction (top, left, right, bottom).
 */
export default function generateHints(solvedGrid: IGrid): IHints {
    const hints: IHints = { top: [], left: [], right: [], bottom: [] };

    for (const row of solvedGrid) {
        hints.left.push(calculateOneSideVisibility(row));
        hints.right.push(calculateOneSideVisibility([ ...row ].reverse()));
    }

    for (let colIndex = 0; colIndex < solvedGrid.length; colIndex++) {
        const column = solvedGrid.map(row => row[colIndex]);
        hints.top.push(calculateOneSideVisibility(column));
        hints.bottom.push(calculateOneSideVisibility([ ...column ].reverse()));
    }

    return hints;
}