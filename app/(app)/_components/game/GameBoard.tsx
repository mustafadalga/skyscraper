"use client";
import { useCallback, useState } from "react";
import { ICell } from "@/(app)/_types";
import { tailwindGridClassNames } from "@/(app)/_constants";
import { IGame } from "@/(app)/_providers/game/types";
import GameCell from "./GameCell";
import CellContextMenu from "./CellContextMenu";

interface Props {
    game: IGame,
    updateGridCell?: (cell: ICell, value: number | null) => void,
    hasActions?: boolean
}

const GameBoard = ({ game, updateGridCell, hasActions = true }: Props) => {
        const { filledGrid, isGameWon } = game;
        const gridClassNames = tailwindGridClassNames[filledGrid.length - 1];
        const dimension = filledGrid.length;
        const [ showContextMenu, setShowContextMenu ] = useState(false);
        const [ contextMenuPosition, setContextMenuPosition ] = useState({ x: 0, y: 0 });
        const animatePulse = isGameWon && hasActions;
        const [ selectedCell, setSelectedCell ] = useState<ICell>({
            row: -1,
            col: -1
        });
        const openContextMenu = useCallback(() => {
            setShowContextMenu(true)
        }, []);
        const closeContextMenu = useCallback(() => {
            setShowContextMenu(false);
        }, []);

        const handleCellClick = useCallback((x: number, y: number, row: number, col: number) => {
            setContextMenuPosition({ x, y });
            setSelectedCell({
                row,
                col
            });
            openContextMenu();
        }, [ openContextMenu ]);

        const updateCell = useCallback((value: number | null) => {
            updateGridCell?.(selectedCell, value)
            closeContextMenu();
        }, [ closeContextMenu, selectedCell, updateGridCell ]);
        return (
            <div
                className={`grid place-items-center ${gridClassNames.row} ${animatePulse ? "animate-shadow-pulse" : "shadow-[0px_0px_5px_0px_#7e22ce]"} relative w-full rounded-lg p-3 row-start-2 row-end-2 col-start-2 col-end-3 gap-1 sm:gap-2 lg:gap-3`}>
                {filledGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className={`grid ${gridClassNames.col} gap-1 sm:gap-2 lg:gap-3`}>
                        {row.map((cell, cellIndex) => (
                            <GameCell key={cellIndex}
                                      cell={cell}
                                      isGameWon={isGameWon}
                                      cellIndex={cellIndex}
                                      rowIndex={rowIndex}
                                      onCellClick={handleCellClick}
                            />
                        ))}
                    </div>
                ))}

                {hasActions && <CellContextMenu
                    showContextMenu={showContextMenu}
                    position={contextMenuPosition}
                    dimension={dimension}
                    onMouseLeave={closeContextMenu}
                    onSelectNumber={(no) => updateCell(no)}
                    onDeleteNumber={() => updateCell(null)}/>}

            </div>
        );
    }
;

export default GameBoard;