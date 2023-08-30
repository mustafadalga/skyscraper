"use client";
import GameHints from "./GameHints";
import GameGrid from "./GameGrid";
import { useState } from "react";
import { IOptionalGrid, IOptionalHints } from "@/_types";
import { Game } from ".prisma/client";

interface Props {
    currentGame: Game
}

const GameBoard = ({ currentGame }: Props) => {
    const [ grid, setGrid ] = useState<IOptionalGrid>(JSON.parse(currentGame.filledGrid));
    const [ hints, setHints ] = useState<IOptionalHints>(JSON.parse(currentGame.shownHints));
    return (
        <div className="grid content-start grid-rows-[48px_auto_48px] grid-cols-[48px_auto_48px] gap-5">
            <GameHints hints={hints}/>
            <GameGrid grid={grid} setGrid={setGrid}/>
        </div>
    );
};

export default GameBoard;