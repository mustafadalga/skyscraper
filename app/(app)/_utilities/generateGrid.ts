import { IGrid } from "@/(app)/_types";
import { shuffle } from "lodash";

/**
 * Check if a given number can be placed at a specific cell in the grid.
 *
 * @param grid - The current grid.
 * @param row - The row index to check.
 * @param col - The column index to check.
 * @param num - The number to check for validity.
 * @returns `true` if the number is valid for the given cell, otherwise `false`.
 */
function isValid(grid: IGrid, row: number, col: number, num: number): boolean {
    for (let i = 0; i < grid.length; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false;
        }
    }
    return true;
}

/**
 * Recursively solve the grid using backtracking.
 *
 * @param grid - The current grid to be solved.
 * @param row - The current row index to start solving from.
 * @param col - The current column index to start solving from.
 * @param gridSize - The size of the grid.
 * @returns `true` if the grid is solvable, otherwise `false`.
 */
function solveGrid(grid: IGrid, row: number, col: number, gridSize: number): boolean {
    if (row === gridSize - 1 && col === gridSize) {
        return true;
    }

    if (col === gridSize) {
        row++;
        col = 0;
    }

    if (grid[row][col] !== 0) {
        return solveGrid(grid, row, col + 1, gridSize);
    }

    let numbers: number[] = Array.from({ length: gridSize }, (_, index) => index + 1);
    numbers = shuffle(numbers);  // Shuffle numbers to introduce randomness

    for (const num of numbers) {
        if (isValid(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveGrid(grid, row, col + 1, gridSize)) {
                return true;
            }
        }
        grid[row][col] = 0;
    }

    return false;
}

/**
 * Generate a valid grid for a given dimension.
 *
 * @param dimension - The dimension of the grid to be generated.
 * @returns A valid grid of the given dimension.
 */
export default function generateGrid(dimension: number): IGrid {
    const grid: IGrid = Array.from({ length: dimension }, () => Array(dimension).fill(0));
    solveGrid(grid, 0, 0, dimension);
    return grid;
}