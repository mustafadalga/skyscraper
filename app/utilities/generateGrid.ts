import { IGrid } from "@/_types";
import { shuffle } from "lodash";

function isValid(grid: IGrid, row: number, col: number, num: number): boolean {
    for (let i = 0; i < grid.length; i++) {
        if (grid[row][i] === num || grid[i][col] === num) {
            return false;
        }
    }
    return true;
}

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


export default function generateGrid(dimension: number): IGrid {
    const grid: IGrid = Array.from({ length: dimension }, () => Array(dimension).fill(0));
    solveGrid(grid, 0, 0, dimension);
    return grid;
}