import GameBoard from "./GameBoard";
import { Game } from ".prisma/client";
import getGame from "@/_actions/getGame";


const GameScreen = async () => {
    const currentGame: Game = await getGame() as Game;
    return (
        <section className="flex items-center justify-center h-full">
            <GameBoard currentGame={currentGame}/>
        </section>
    );
};

export default GameScreen;