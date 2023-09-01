"use client";
import { ReactNode, useCallback, useMemo, useState } from "react";
import GameContext from "./GameContext";
import { Game } from ".prisma/client";
import { ICell } from "@/_types";
import { hideShownHint, showHiddenHint, updateCell } from "@/_providers/game/utilities";
import { ContextType, IGame } from "./types";
import { toast } from "react-toastify";
import axios from "axios";


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

export default function GameProvider({ children, currentGame }: Props) {
    const [ game, setGame ] = useState<IGame>({
        ...currentGame,
        validGrid: JSON.parse(currentGame.validGrid),
        filledGrid: JSON.parse(currentGame.filledGrid),
        hints: JSON.parse(currentGame.hints),
        shownHints: JSON.parse(currentGame.shownHints),
    });

    const updateGridCell = useCallback(async (cell: ICell, value: number | null) => {
        const { grid, previousValue } = updateCell(game.filledGrid, cell, value);
        setGame(prevState => ({
            ...prevState,
            filledGrid: grid
        }));

        const status = await updateGame(game.id, {
            filledGrid: JSON.stringify(grid)
        });
        if (!status) {
            toast.warn("Oops! We couldn't update your skyscraper this time. Don't worry, give it another try!");
            const { grid } = updateCell(game.filledGrid, cell, previousValue);
            setGame(prevState => ({
                ...prevState,
                filledGrid: grid
            }));
        }
    }, [ game.filledGrid ]);

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
            shownHints: hints
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

    }, [ game.id, game.hiddenHintCount, game.usedHiddenHintRights, game.shownHints ]);

    const showAnswer = useCallback(async () => {
        const status = await updateGame(game.id, {
            filledGrid: JSON.stringify(game.validGrid),
            isGameCompleted: true,
        });

        if (!status) {
            return toast.warn("Oops! We couldn't show answers! Don't worry, give it another try!");
        }

        setGame(prevState => ({
            ...prevState,
            filledGrid: game.validGrid,
            isGameCompleted: true
        }));

    }, [ game.id, game.validGrid ]);

    const contextValue = useMemo<ContextType>(() => {
        return {
            game,
            updateGridCell,
            giveAHint,
            showAnswer
        }

    }, [ game, updateGridCell, giveAHint ])
    return (
        <GameContext.Provider value={contextValue}>
            {children}
        </GameContext.Provider>
    )
}