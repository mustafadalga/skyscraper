"use client";
import useGame from "@/(app)/_providers/game/useGame";
import GameHints from "./GameHints";
import GameBoard from "./GameBoard";
import GameBoardOptionGroup from "./GameBoardOptionGroup";
import GameStopWatch from "./GameStopWatch";
import GameTrophy from "./GameTrophy";

const GameScreen = () => {
    const { game, updateGridCell } = useGame();
    return (
        <section
            className={`${game.isGameWon ? "lg:pt-60" : ""} flex items-center justify-center h-full`}>
            <div
                className="relative pt-20 grid content-start grid-rows-[48px_auto_48px] grid-cols-[48px_auto_48px] gap-5">
                <GameHints game={game}/>
                <GameBoard game={game} updateGridCell={updateGridCell}/>
                <GameBoardOptionGroup/>
            </div>
            <GameStopWatch key={game.id}/>
            <GameTrophy/>
        </section>
    );
};

export default GameScreen;