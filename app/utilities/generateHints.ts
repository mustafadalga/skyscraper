import { IGrid, IHints } from "@/_types";

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