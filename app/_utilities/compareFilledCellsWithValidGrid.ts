import { IGrid, IOptionalGrid } from "@/_types";

/**
 * Compare filled cells in the user's grid with the valid grid.
 *
 * @param userFilledGrid - The grid filled by the user.
 * @param validGrid - The valid grid.
 *
 * @returns `true` if all filled cells are correct, otherwise `false`.
 */
export default function compareFilledCellsWithValidGrid(
    userFilledGrid: IOptionalGrid,
    validGrid: IGrid
): boolean {
    for (let row = 0; row < userFilledGrid.length; row++) {
        for (let col = 0; col < userFilledGrid[row].length; col++) {
            const userValue = userFilledGrid[row][col];
            const validValue = validGrid[row][col];

            // Only compare if the user's cell is filled
            if (userValue !== null && userValue !== validValue) {
                return false;
            }
        }
    }
    return true;
}
