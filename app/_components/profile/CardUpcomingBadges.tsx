import { Badge, User } from ".prisma/client";
import getGamesByUserId from "@/_actions/getGamesByUserId";
import getBadgesByUserID from "@/_actions/getBadgesByUserID";
import calculateUpcomingBadges, { IUpcomingBadge } from "@/_utilities/calculateUpcomingBadge";
import ProgressBar from "./progressbar/ProgressBar";
import getBadges from "@/_actions/getBadges";

interface Props {
    user: User
}

export default async function CardUpcomingBadges({ user }: Props) {
    const userGames = await getGamesByUserId(user.id);
    const userBadges = await getBadgesByUserID(user.id);
    const allBadgesData = await getBadges();
    const allBadges = allBadgesData.status ? allBadgesData.data as Badge[] : []
    const userEarnedBadges = userBadges.map(badge => badge.badge);
    const THRESHOLD_PERCENT = 50;
    const upcomingBadges: IUpcomingBadge[] = calculateUpcomingBadges(user, userEarnedBadges, allBadges, userGames).filter(badge => badge.percent > THRESHOLD_PERCENT);

    return (
        <div className="grid gap-5 max-w-2xl shadow-xl p-8 bg-white rounded-lg">
            <h2 className="mb-5 text-purple-700 font-semibold text-base xl:text-xl">Upcoming Badges</h2>
            {upcomingBadges.map(upcomingBadge => (
                <ProgressBar key={upcomingBadge.id} badge={upcomingBadge}/>
            ))}
        </div>
    );
};