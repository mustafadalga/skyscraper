import dynamic from "next/dynamic";
import { Game, User } from ".prisma/client";
import getGamesByUserId from "@/(app)/_actions/getGamesByUserId";
import getBadgesByUserID from "@/(app)/_actions/getBadgesByUserID";
import getCurrentUser from "@/(app)/_actions/getCurrentUser";
import Header from "@/(app)/_components/home/Header";

const CardWinLossRatio = dynamic(() => import("@/(app)/_components/profile/CardWinLossRatio"));
const CardStreakSummary = dynamic(() => import("@/(app)/_components/profile/CardStreakSummary"));
const CardScoreOverTime = dynamic(() => import("@/(app)/_components/profile/CardScoreOverTime"));
const CardAchievementTimeLine = dynamic(() => import("@/(app)/_components/profile/CardAchievementTimeLine"));
const Badges = dynamic(() => import("@/(app)/_components/profile/Badges"));
const CardUpcomingBadges = dynamic(() => import("@/(app)/_components/profile/CardUpcomingBadges"));

export default async function Page() {
    const user = await getCurrentUser() as User;

    const games: Game[] = await getGamesByUserId(user.id) as Game[];
    const badges = await getBadgesByUserID(user.id);
    const hasGame = !!games.length;
    const hasBadge = !!badges.length;
    const hasScore = !!user.score;
    return (
        <article className="grid p-5 gap-5 px-5 content-start">
            <Header/>
            <section className="grid xl:content-start xl:grid-cols-12 gap-5">
                <div className="grid xl:content-start gap-5 xl:col-span-4">
                    {hasBadge && <CardAchievementTimeLine badges={badges}/>}
                </div>
                <div className="grid gap-5 xl:col-span-8 xl:content-start">
                    {hasGame && (
                        <>
                            <CardWinLossRatio games={games}/>
                            <CardStreakSummary user={user} games={games}/>
                        </>
                    )}

                    {hasBadge && <Badges badges={badges}/>}
                    {hasScore && <CardScoreOverTime user={user}/>}
                    <CardUpcomingBadges user={user}/>
                </div>
            </section>
        </article>
    );
};