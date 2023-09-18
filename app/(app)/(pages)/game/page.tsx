import { Badge, Game, User } from ".prisma/client";
import getCurrentUser from "@/(app)/_actions/getCurrentUser";
import { BadgeLevelDetail } from "@/(app)/_types";
import getDefaultGameSettings from "@/(app)/_utilities/getDefaultGameOptions";
import getBadges from "@/(app)/_actions/getBadges";
import dynamicImport from "next/dynamic";
import getGame from "@/(app)/_actions/getGame";
import getBadgesByUserID from "@/(app)/_actions/getBadgesByUserID";
import { redirect } from "next/navigation";

const GameOptions = dynamicImport(() => import("@/(app)/_components/game/GameOptions"), { ssr: false })
const GameProvider = dynamicImport(() => import("@/(app)/_providers/game/GameProvider"), { ssr: false })
const GameScreen = dynamicImport(() => import("@/(app)/_components/game/GameScreen"))
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