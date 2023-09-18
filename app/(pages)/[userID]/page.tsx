import getUserByID from "@/_actions/getUserByID";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";

const Header = dynamic(() => import("@/_components/profile/Header"));
const CardPlayerProfile = dynamic(() => import("@/_components/profile/CardPlayerProfile"));
const CardWinLossRatio = dynamic(() => import("@/_components/profile/CardWinLossRatio"));
const CardStreakSummary = dynamic(() => import("@/_components/profile/CardStreakSummary"));
const CardScoreOverTime = dynamic(() => import("@/_components/profile/CardScoreOverTime"));
const CardAchievementTimeLine = dynamic(() => import("@/_components/profile/CardAchievementTimeLine"));
const Badges = dynamic(() => import("@/_components/profile/Badges"));
const CardUpcomingBadges = dynamic(() => import("@/_components/profile/CardUpcomingBadges"));

const Page = async ({ params: { userID } }: { params: { userID: string } }) => {
    const user = await getUserByID(userID);
    if (!user) {
        return redirect("/");
    }
    return (
        <article className="grid pb-5 gap-5 px-5 content-start">
            <Header user={user}/>
            <section className="grid xl:content-start xl:grid-cols-12 gap-5">
                <div className="grid xl:place-content-baseline bg-red-100 gap-5 xl:col-span-4">
                    <CardPlayerProfile user={user}/>
                    <CardAchievementTimeLine user={user}/>
                </div>
                <div className="grid xl:place-content-baseline	gap-5 xl:col-span-8">
                    <CardWinLossRatio user={user}/>
                    <CardStreakSummary user={user}/>
                    <Badges user={user}/>

                    <CardScoreOverTime user={user}/>
                    <CardUpcomingBadges user={user}/>
                </div>


            </section>
        </article>
    );
};

export default Page;