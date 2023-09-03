import { useRef, memo } from "react";
import useGame from "@/_providers/game/useGame";


interface Props {
    cell: number | null,
    onCellClick: (x: number, y: number, rowIndex: number, colIndex: number) => void,
    cellIndex: number,
    rowIndex: number,
    isGameWon: boolean
}

const GameCell = ({ cell, onCellClick, rowIndex, cellIndex, isGameWon }: Props) => {
    const cellRef = useRef<HTMLDivElement | null>(null);
    const { game: { isGameCompleted } } = useGame();
    const handleCellClick = () => {
        if (isGameCompleted) return;
        onCellClick(
            cellRef.current?.offsetLeft!,
            cellRef.current?.offsetTop!,
            rowIndex,
            cellIndex
        );
    };

    return (
        <div
            onClick={handleCellClick}
            ref={cellRef}
            className={`${isGameCompleted ? "" : isGameWon ? "":"hover:bg-purple-400 hover:text-white hover:shadow-md cursor-pointer"} ${isGameWon ? "border-2 border-purple-700 text-purple-700":""} relative bg-purple-300 text-purple-700 grid place-items-center h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16 text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl rounded-md font-bold transition duration-300 font-serif shadow`}>
            {cell}
        </div>
    );
};

export default memo(GameCell);