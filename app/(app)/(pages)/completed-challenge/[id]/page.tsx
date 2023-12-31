import getPublicCompletedChallenge, { type Game } from "@/(app)/_actions/getPublicCompletedChallenge";
import GameHints from "@/(app)/_components/game/GameHints";
import { IGame } from "@/(app)/_providers/game/types";
import GameBoard from "@/(app)/_components/game/GameBoard";
import ClientOnly from "@/(app)/_components/ClientOnly";
import NoGameFound from "@/(app)/_components/completed-challenges/NoGameFound";

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
            <div className="w-full h-full flex justify-center">
                {hasGame ? (
                  <div className="flex items-center">
                      <div
                          className="relative grid content-start grid-rows-[48px_auto_48px] grid-cols-[48px_auto_48px] gap-5">
                          <ClientOnly>
                              <GameHints game={parsedGame as IGame}/>
                              <GameBoard game={parsedGame as IGame} hasActions={false}/>
                          </ClientOnly>
                      </div>
                  </div>
                ) : <NoGameFound/>}
            </div>
        </article>
    );
};