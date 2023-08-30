/**
 * Creates a 2D grid of null values.
 *
 * @param dimension - The number of rows and columns in the grid.
 * @returns A 2D array filled with null values.
 */
export default function createEmptyGrid(dimension: number): null[][] {
    if (dimension <= 0) {
        throw new Error("Dimension should be a positive integer.");
    }
    return Array.from({ length: dimension }, () => Array.from({ length: dimension }, () => null));
}
