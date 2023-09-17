import { Badge, Game, User } from ".prisma/client";
import getCurrentUser from "@/_actions/getCurrentUser";
import { BadgeLevelDetail } from "@/_types";
import getDefaultGameSettings from "@/_utilities/getDefaultGameOptions";
import getBadges from "@/_actions/getBadges";
import dynamicImport from "next/dynamic";
import getGame from "@/_actions/getGame";
import getBadgesByUserID from "@/_actions/getBadgesByUserID";
import { redirect } from "next/navigation";

const GameOptions = dynamicImport(() => import("@/_components/game/GameOptions"), { ssr: false })
const GameProvider = dynamicImport(() => import("@/_providers/game/GameProvider"), { ssr: false })
const GameScreen = dynamicImport(() => import("@/_components/game/GameScreen"))
const Page = async () => {
    const currentUser: User = await getCurrentUser() as User;
    if (!currentUser) {
        redirect("/");
    }
    const userBadgeData = await getBadgesByUserID(currentUser.id);
    const earnedBadges = userBadgeData.map(badge => badge.badge);
    const badgesData = await getBadges();
    const defaultOptions: BadgeLevelDetail = getDefaultGameSettings((badgesData.status ? badgesData.data : []) as Badge[], earnedBadges, currentUser);
    const currentGame: Game | null = currentUser.currentGameId ? await getGame(currentUser) : null;
    return (
        <article className="container mx-auto grid p-5 pb-20 h-full">
            {currentGame ? (
                <GameProvider currentGame={currentGame} key={currentGame.id}>
                    <GameScreen key={currentGame.id}/>
                </GameProvider>
            ) : <GameOptions defaultOptions={defaultOptions}/>}
        </article>
    );
};

export default Page;