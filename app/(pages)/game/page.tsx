import { Badge, Game, User } from ".prisma/client";
import getCurrentUser from "@/_actions/getCurrentUser";
import { BadgeLevelDetail } from "@/_types";
import getUserBadges from "@/_actions/getUserBadges";
import getDefaultGameSettings from "@/_utilities/getDefaultGameOptions";
import getBadges from "@/_actions/getBadges";
import dynamic from "next/dynamic";
import getGame from "@/_actions/getGame";

const GameOptions = dynamic(() => import("@/_components/game/GameOptions"), { ssr: false })
const GameProvider = dynamic(() => import("@/_providers/game/GameProvider"), { ssr: false })
const GameScreen = dynamic(() => import("@/_components/game/GameScreen"))

const Page = async () => {
    const currentUser: User = await getCurrentUser() as User;
    const currentUserBadges: Badge[] = await getUserBadges();
    const badges: Badge[] = await getBadges();
    const defaultOptions: BadgeLevelDetail = getDefaultGameSettings(badges, currentUserBadges, currentUser);
    const currentGame: Game | null = currentUser.currentGameId ? await getGame() : null;
    return (
        <article className="grid p-5 pb-20 h-full">
            {currentGame ? (
                <GameProvider currentGame={currentGame} key={currentGame.id}>
                    <GameScreen key={currentGame.id}/>
                </GameProvider>
            ) : <GameOptions defaultOptions={defaultOptions}/>}
        </article>
    );
};

export default Page;