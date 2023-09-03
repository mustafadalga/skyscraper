"use client";
import useGame from "@/_providers/game/useGame";
import GameHints from "./GameHints";
import GameBoard from "./GameBoard";
import GameBoardOptionGroup from "./GameBoardOptionGroup";
import GameStopWatch from "./GameStopWatch";
import GameTrophy from "./GameTrophy";

const GameScreen = () => {
    const { game: { isGameWon } } = useGame();
    return (
        <section
            className={`${isGameWon ? "lg:pt-60" : ""} flex items-center justify-center h-full`}>
            <div
                className="relative grid content-start grid-rows-[48px_auto_48px] grid-cols-[48px_auto_48px] gap-5">
                <GameHints/>
                <GameBoard/>
                <GameBoardOptionGroup/>
            </div>
            <GameStopWatch/>
            <GameTrophy/>
        </section>
    );
};

export default GameScreen;