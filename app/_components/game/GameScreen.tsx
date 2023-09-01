import { Game } from ".prisma/client";
import getGame from "@/_actions/getGame";
import GameProvider from "@/_providers/game/GameProvider";
import GameHints from "./GameHints";
import GameBoard from "./GameBoard";
import GameBoardOptionGroup from "./GameBoardOptionGroup";


const GameScreen = async () => {
    const currentGame: Game = await getGame() as Game;
    return (
        <section className="flex items-center justify-center h-full">
            <GameProvider currentGame={currentGame}>
                <div
                    className="relative grid content-start grid-rows-[48px_auto_48px] grid-cols-[48px_auto_48px] gap-5">
                    <GameHints/>
                    <GameBoard/>
                    <GameBoardOptionGroup/>
                </div>
            </GameProvider>
        </section>
    );
};

export default GameScreen;