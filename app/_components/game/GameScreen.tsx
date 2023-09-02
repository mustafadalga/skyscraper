import { Game } from ".prisma/client";
import getGame from "@/_actions/getGame";
import GameProvider from "@/_providers/game/GameProvider";
import GameHints from "./GameHints";
import GameBoard from "./GameBoard";
import GameBoardOptionGroup from "./GameBoardOptionGroup";
import GameStopWatch from "@/_components/game/GameStopWatch";

const GameScreen = async () => {
    const currentGame: Game = await getGame() as Game;
    return (
        <section className="flex items-center justify-center h-full bg-red-100">
            <GameProvider currentGame={currentGame} key={currentGame.id}>
                <div
                    className="relative grid content-start grid-rows-[48px_auto_48px] grid-cols-[48px_auto_48px] gap-5">
                    <GameHints/>
                    <GameBoard/>
                    <GameBoardOptionGroup/>
                </div>
                <GameStopWatch/>
            </GameProvider>
        </section>
    );
};

export default GameScreen;