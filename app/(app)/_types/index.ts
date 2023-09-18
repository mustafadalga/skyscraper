import { Direction } from "@/(app)/_enums";

export interface BadgeLevelDetail {
    difficulty: string,
    dimension: number
}

export interface BadgeLevelDetails {
    [key: string]: BadgeLevelDetail
}

export type IHints = Record<Direction, number[]>
export type IOptionalHints = Record<Direction, (number | null)[]>
export type IGrid = number[][];
export type IOptionalGrid = (number | null)[][];
export type IHintCheckResult = Record<Direction, (boolean | null)[]>;

export interface IGameBoard {
    grid: IGrid,
    hints: IHints,
    hiddenHintCount: number,
    shownHints: IOptionalHints,
    emptyGrid: null[][]
}

export interface ICell {
    row: number,
    col: number
}
