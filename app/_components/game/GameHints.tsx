"use client";
import { memo, useCallback } from "react";
import useGame from "@/_providers/game/useGame";
import checkHintVisibilityAgainstFilledGrid from "@/_utilities/checkHintVisibilityAgainstFilledGrid";
import { Direction } from "@/_enums";
import { IHintCheckResult } from "@/_types";

interface IDirection {
    id: Direction,
    className: string,
    hintClassName: string
}


const GameHints = () => {
    const { game: { shownHints, filledGrid } } = useGame();
    const dimension = shownHints.left.length;//  one side length.
    const hintCheckResult: IHintCheckResult = checkHintVisibilityAgainstFilledGrid(shownHints, filledGrid);
    const directionClassNames: IDirection[] = [
        {
            id: Direction.TOP,
            className: `mt-auto grid-cols-${dimension} row-start-1 row-end-2 col-start-2 col-end-3 w-full justify-items-center px-3`,
            hintClassName: "before:top-full before:border-l-transparent before:border-r-transparent before:border-t-[.35rem] before:border-l-[.35rem] before:border-r-[.35rem] sm:before:border-t-[.375rem] sm:before:border-l-[.375rem] sm:before:border-r-[.375rem] lg:before:border-t-[.5rem] lg:before:border-l-[.5rem] lg:before:border-r-[.5rem] xl:before:border-t-[.625rem] xl:before:border-l-[.625rem] xl:before:border-r-[.625rem] before:border-t-purple-300"
        },
        {
            id: Direction.BOTTOM,
            className: `mb-auto grid-cols-${dimension} row-start-3 row-end-4 col-start-2 col-end-3 w-full justify-items-center px-3`,
            hintClassName: "before:bottom-full before:border-b-[.35rem] before:border-r-[.35rem] before:border-l-[.35rem] sm:before:border-b-[.375rem] sm:before:border-r-[.375rem] sm:before:border-l-[.375rem] lg:before:border-b-[.5rem] lg:before:border-r-[.5rem] lg:before:border-l-[.5rem] xl:before:border-b-[.625rem] xl:before:border-l-[.625rem] xl:before:border-r-[.625rem] before:border-transparent before:border-b-purple-300"
        },
        {
            id: Direction.LEFT,
            className: `ml-auto grid grid-rows-${dimension} row-start-2 row-end-3 col-start-1 col-end-2 items-center py-3`,
            hintClassName: "before:left-full before:border-t-transparent before:border-b-transparent before:left-full before:border-b-[.35rem] before:border-t-[.35rem] before:border-l-[.35rem] sm:before:border-b-[.375rem] sm:before:border-t-[.375rem] sm:before:border-l-[.375rem] lg:before:border-b-[.5rem] lg:before:border-t-[.5rem] lg:before:border-l-[.5rem] xl:before:border-b-[.625rem] xl:before:border-t-[.625rem] xl:before:border-l-[.625rem] before:border-l-purple-300"
        },
        {
            id: Direction.RIGHT,
            className: `mr-auto grid grid-rows-${dimension} row-start-2 row-end-3 col-start-3 col-end-4 items-center py-3`,
            hintClassName: "before:right-full before:border-t-transparent before:border-b-transparent before:right-full before:border-b-[.35rem] before:border-t-[.35rem] before:border-r-[.35rem] sm:before:border-b-[.375rem] sm:before:border-t-[.375rem] sm:before:border-r-[.375rem] lg:before:border-b-[.5rem] lg:before:border-t-[.5rem] lg:before:border-r-[.5rem] xl:before:border-b-[.625rem] xl:before:border-t-[.625rem] xl:before:border-r-[.625rem] before:border-r-purple-300"
        }
    ];
    const hintClassName = useCallback((direction: Direction, value: number | null, className: string, checkResultValue: boolean | null): string => {
        const directionClassNames: Record<Direction, string> = {
            top: "before:border-t-red-600",
            bottom: "before:border-b-red-600",
            left: "before:border-l-red-600",
            right: "before:border-r-red-600",
        }

        if (!value) {
            return className + " opacity-0 invisible"
        }

        return `${className} animate-scale-in-center ${checkResultValue == false ? directionClassNames[direction] + " bg-red-600 text-white" : " bg-purple-300 text-purple-800"}`
    }, []);

    return (
        <>
            {directionClassNames.map((direction) => (
                <div key={direction.id}
                     className={`grid gap-1 sm:gap-2 lg:gap-3 font-bold ${direction.className}`}>
                    {shownHints[direction.id].map((hint, index) => (
                        <div
                            key={index}
                            className={`${hintClassName(direction.id, hint, direction.hintClassName, hintCheckResult[direction.id][index])} grid place-items-center h-4 w-4 sm:h-6 sm:w-6 lg:h-8 lg:w-8 xl:h-10 xl:w-10 relative text-[10px] sm:text-xs lg:text-sm before:content[''] before:absolute`}>
                            {hint}
                        </div>
                    ))}
                </div>
            ))}
        </>
    );
};

export default memo(GameHints);