"use client";
import { ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from 'next/navigation'
import { toast } from "react-toastify";
import axios from "axios"
import { isEqual } from "lodash";
import { Game } from ".prisma/client";
import GameContext from "./GameContext";
import { ICell } from "@/(app)/_types";
import { hideShownHint, showHiddenHint, updateCell, isGridFullyFilled } from "./utilities";
import compareFilledCellsWithValidGrid from "@/(app)/_utilities/compareFilledCellsWithValidGrid";
import { ContextType, IGame } from "./types";
import useLoader from "@/(app)/_store/useLoader";
import { Difficulty } from "@/(app)/_enums";

interface Props {
    children: ReactNode,
    currentGame: Game
}

async function updateGame(gameID: string, data: any) {
    try {
        const url = `/api/game/${gameID}`;
        await axios.patch(url, data);
        return true;

    } catch (error) {
        return false;
    }
}

async function startNewGame(options: { dimension: number, difficulty: Difficulty }): Promise<boolean> {
    try {
        const url = "/api/game/";
        await axios.post(url, options);
        return true;

    } catch (error) {
        return false;
    }
}

function getParsedGame(game: Game): IGame {
    return {
        ...game,
        validGrid: JSON.parse(game.validGrid),
        filledGrid: JSON.parse(game.filledGrid),
        hints: JSON.parse(game.hints),
        shownHints: JSON.parse(game.shownHints),
    }
}

export default function GameProvider({ children, currentGame }: Props) {
    const router = useRouter();
    const loader = useLoader();
    const [ game, setGame ] = useState<IGame>(getParsedGame(currentGame));
    const [ isTimerRunning, setIsTimerRunning ] = useState<boolean>(true);
    const updateGridCell = useCallback(async (cell: ICell, value: number | null) => {
        const { grid, previousValue } = updateCell(game.filledGrid, cell, value);
        const isGameWon = isGridFullyFilled(grid) && isEqual(grid, game.validGrid);
        const hasMistake = !compareFilledCellsWithValidGrid(game.filledGrid, game.validGrid);
        setGame(prevState => ({
            ...prevState,
            filledGrid: grid,
            isGameWon,
            isGameCompleted: isGameWon,
            shownHints: isGameWon ? game.hints : game.shownHints
        }));


        if (isGameWon) {
            setIsTimerRunning(false);
        }

        const status = await updateGame(game.id, {
            filledGrid: JSON.stringify(grid),
            isGameCompleted: isGameWon,
            isGameWon,
            hasMistake
        });

        if (!status) {
            toast.warn("Oops! We couldn't update your skyscraper this time. Don't worry, give it another try!");
            const { grid } = updateCell(game.filledGrid, cell, previousValue);
            setGame(prevState => ({
                ...prevState,
                filledGrid: grid
            }));
        }
    }, [ game.id, game.hints, game.shownHints, game.validGrid, game.filledGrid ]);

    const giveAHint = useCallback(async () => {
        const hasRight = !!(game.hiddenHintCount - game.usedHiddenHintRights);
        if (!hasRight) {
            return toast.warn("Oops! Looks like you've used up all your hints for now. Keep trying, you've got this!");
        }

        let right = game.usedHiddenHintRights + 1;
        const { hints, direction, index } = showHiddenHint(game.shownHints, game.hints);
        setGame(prevState => ({
            ...prevState,
            usedHiddenHintRights: right,
            shownHints: hints,
        }));

        const status = await updateGame(game.id, {
            usedHiddenHintRights: right,
            shownHints: JSON.stringify(hints)
        });
        if (!status) {
            toast.warn("Oops! We couldn't offer a hint right now. No worries, you've got this! Feel free to try again.");
            right--;
            setGame(prevState => ({
                ...prevState,
                usedHiddenHintRights: right,
                shownHints: hideShownHint(game.shownHints, direction, index)
            }));
        }

    }, [ game.hints, game.id, game.hiddenHintCount, game.usedHiddenHintRights, game.shownHints ]);

    const showAnswer = useCallback(async () => {
        loader.onOpen();
        setIsTimerRunning(false);
        const status = await updateGame(game.id, {
            isGameCompleted: true,
        });
        loader.onClose();
        if (!status) {
            return toast.warn("Oops! We couldn't show answers! Don't worry, give it another try!");
        }

        setGame(prevState => ({
            ...prevState,
            filledGrid: game.validGrid,
            shownHints: game.hints,
            isGameCompleted: true
        }));

    }, [ loader, game.hints, game.id, game.validGrid ]);

    const newGame = useCallback(async () => {
        const errorMessage = "Oops! We couldn't start new game! Don't worry, give it another try!";
        loader.onOpen();
        setIsTimerRunning(false);
        const isGameCompleted = await updateGame(game.id, {
            isGameCompleted: true,
        });

        if (!isGameCompleted) {
            loader.onClose();
            return toast.error(errorMessage);
        }

        const isNewGameStarted = await startNewGame({
            difficulty: game.difficulty as Difficulty,
            dimension: game.dimension
        });


        if (!isNewGameStarted) {
            loader.onClose();
            return toast.error(errorMessage);
        }
        setIsTimerRunning(true);
        router.refresh();
        const timerID = setTimeout(() => {
            loader.onClose();
            clearTimeout(timerID);
        }, 2500);

    }, [ game.id, game.dimension, game.difficulty, loader, router ]);
    const finishGame = useCallback(async () => {
        if (game.isGameCompleted) {
            router.refresh();
            return router.push("/")
        }

        const errorMessage = "Oops! We couldn't finish the game! Don't worry, give it another try!";
        loader.onOpen();
        setIsTimerRunning(false);
        const isGameFinished = await updateGame(game.id, {
            isGameCompleted: true,
        });
        loader.onClose();

        if (isGameFinished) {
            router.refresh();
            return router.push("/")
        }

        toast.error(errorMessage);

    }, [ game.id, loader, router, game.isGameCompleted ]);
    const contextValue = useMemo<ContextType>(() => {
        return {
            game,
            updateGridCell,
            giveAHint,
            showAnswer,
            newGame,
            finishGame,
            isTimerRunning,
        }
    }, [
        game,
        updateGridCell,
        giveAHint,
        showAnswer,
        newGame,
        finishGame,
        isTimerRunning
    ]);

    useEffect(() => {
        return () => router.refresh()
    }, [ router ])

    useEffect(() => {
        setGame(getParsedGame(currentGame));
    }, [ currentGame ]);

    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}