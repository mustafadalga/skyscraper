import { Game, User } from ".prisma/client";
import getCurrentUser from "@/_actions/getCurrentUser";
import { BadgeLevelDetail, IBadge } from "@/_types";
import getUserBadges from "@/_actions/getUserBadges";
import getDefaultGameSettings from "@/utilities/getDefaultGameOptions";
import getBadges from "@/_actions/getBadges";
import dynamic from "next/dynamic";
import getGame from "@/_actions/getGame";

const GameOptions = dynamic(() => import("@/_components/game/GameOptions"), { ssr: false })
const GameScreen = dynamic(() => import("@/_components/game/GameScreen"))

const Page = async () => {
    const currentUser: User = await getCurrentUser() as User;
    const currentUserBadges: IBadge[] = await getUserBadges();
    const badges: IBadge[] = await getBadges();
    const defaultOptions: BadgeLevelDetail = getDefaultGameSettings(badges, currentUserBadges, currentUser);
    const currentGame: Game = await getGame() as Game;
    return (
        <article className="grid h-full">
            {currentGame ? <GameScreen/> : <GameOptions defaultOptions={defaultOptions}/>}
        </article>
    );
};

export default Page;