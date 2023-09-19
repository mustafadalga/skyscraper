import getUserByID from "@/(app)/_actions/getUserByID";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { Game } from ".prisma/client";
import getGamesByUserId from "@/(app)/_actions/getGamesByUserId";
import getBadgesByUserID from "@/(app)/_actions/getBadgesByUserID";
import Head from "next/head";
import { Metadata } from "next";

const Header = dynamic(() => import("@/(app)/_components/profile/Header"));
const CardPlayerProfile = dynamic(() => import("@/(app)/_components/profile/CardPlayerProfile"));
const CardWinLossRatio = dynamic(() => import("@/(app)/_components/profile/CardWinLossRatio"));
const CardStreakSummary = dynamic(() => import("@/(app)/_components/profile/CardStreakSummary"));
const CardScoreOverTime = dynamic(() => import("@/(app)/_components/profile/CardScoreOverTime"));
const CardAchievementTimeLine = dynamic(() => import("@/(app)/_components/profile/CardAchievementTimeLine"));
const Badges = dynamic(() => import("@/(app)/_components/profile/Badges"));
const CardUpcomingBadges = dynamic(() => import("@/(app)/_components/profile/CardUpcomingBadges"));

type Props = {
    params: { userID: string }
}

export async function generateMetadata(
    { params: { userID } }: Props,
): Promise<Metadata> {
    const user = await getUserByID(userID);

    return {
        title: `Player Profile - ${user?.name}: Track Your Achievements, Scores, and Upcoming Badges`,
        description: `"Step into your personalized gaming dashboard at ${user?.name}. View your win-loss ratio, unlock badges, analyze your performance over time, and discover what's next on your gaming journey!`
    }
}

export default async function Page({ params: { userID } }: Props) {
    const user = await getUserByID(userID);
    if (!user) {
        return redirect("/");
    }

    const games: Game[] = await getGamesByUserId(user.id) as Game[];
    const badges = await getBadgesByUserID(user.id);
    const hasGame = !!games.length;
    const hasBadge = !!badges.length;
    const hasScore = !!user.score;
    return (
        <article className="grid pb-5 gap-5 px-5 content-start">
            <Header user={user}/>
            <section className="grid xl:content-start xl:grid-cols-12 gap-5">
                <div className="grid xl:content-start gap-5 xl:col-span-4">
                    <CardPlayerProfile user={user}/>
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
    )
}
