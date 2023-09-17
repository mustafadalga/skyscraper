import getPublicCompletedChallenge, { type Game } from "@/_actions/getPublicCompletedChallenge";
import GameHints from "@/_components/game/GameHints";
import { IGame } from "@/_providers/game/types";
import GameBoard from "@/_components/game/GameBoard";
import ClientOnly from "@/_components/ClientOnly";

export default async function Page({ params: { id } }: { params: { id: string } }) {
    const { status, data: challenge } = await getPublicCompletedChallenge(id);
    const hasGame = status && !!challenge;
    const challengeData: Game = challenge as Game;
    let parsedGame;

    if (hasGame) {
        parsedGame = {
            ...challengeData,
            filledGrid: JSON.parse(challengeData.filledGrid),
            shownHints: JSON.parse(challengeData.shownHints),
        }
    }
    return (
        <article className="flex items-center justify-center p-4 lg:p-10">
            <div className="flex justify-center">
                {hasGame && (
                    <div
                        className="relative grid content-start grid-rows-[48px_auto_48px] grid-cols-[48px_auto_48px] gap-5">
                        <ClientOnly>
                            <GameHints game={parsedGame as IGame}/>
                            <GameBoard game={parsedGame as IGame} hasActions={false}/>
                        </ClientOnly>
                    </div>
                )}
            </div>
        </article>
    );
};