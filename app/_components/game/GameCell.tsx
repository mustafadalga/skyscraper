import { useRef, memo } from "react";
import useGame from "@/_providers/game/useGame";

interface Props {
    cell: number | null,
    onCellClick: (x: number, y: number, rowIndex: number, colIndex: number) => void,
    cellIndex: number,
    rowIndex: number,
    isGameWon: boolean
}

const calculateCellSize = (dimension: number) => {
    if (dimension >= 11) {
        return "lg:h-5 lg:w-5 md:h-6 md:w-6 xl:w-8 xl:h-8 md:text-xs xl:text-sm 2xl:text-base";
    }
    if (dimension >= 9) {
        return "md:h-6 md:w-6 lg:h-8 lg:w-8 xl:w-10 xl:h-10 md:text-xs lg:text-sm xl:text-base 2xl:text-xl"
    }
    if (dimension >= 7) {
        return "md:h-6 md:w-6 lg:h-8 lg:w-8 xl:w-10 xl:h-10 sm:text-xs md:text-sm lg:text-base xl:text-xl 2xl:text-2xl"
    }

    return "sm:h-5 sm:w-5 md:h-6 md:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 2xl:w-12 2xl:h-12 xs:text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl";
};

const GameCell = ({ cell, onCellClick, rowIndex, cellIndex, isGameWon }: Props) => {
    const cellRef = useRef<HTMLDivElement | null>(null);
    const { game: { isGameCompleted,dimension } } = useGame();
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
            className={`${isGameCompleted ? "" : isGameWon ? "" : "hover:bg-purple-400 hover:text-white hover:shadow-md cursor-pointer"} ${isGameWon ? "border-2 border-purple-700 text-purple-700" : ""} ${calculateCellSize(dimension)} h-4 w-4 relative bg-purple-300 text-purple-700 grid place-items-center text-[10px] rounded-md font-bold transition duration-300 font-serif shadow`}>
            {cell}
        </div>
    );
};

export default memo(GameCell);