import { useRef, memo } from "react";


interface Props {
    cell: number | null,
    onCellClick: (x: number, y: number, rowIndex: number, colIndex: number) => void,
    cellIndex: number,
    rowIndex: number,
}

const GameCell = ({ cell, onCellClick, rowIndex, cellIndex }: Props) => {
    const cellRef = useRef<HTMLDivElement | null>(null);
    const handleCellClick = () => {
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
            className="relative bg-purple-300 text-purple-700 hover:bg-purple-400 hover:text-white grid place-items-center h-6 w-6 sm:h-8 sm:w-8 md:h-10 md:w-10 lg:h-12 lg:w-12 xl:h-16 xl:w-16 text-xs sm:text-sm md:text-base lg:text-xl xl:text-2xl 2xl:text-3xl rounded-md font-bold transition duration-300 font-serif shadow hover:shadow-md cursor-pointer">
            {cell}
        </div>
    );
};

export default memo(GameCell);