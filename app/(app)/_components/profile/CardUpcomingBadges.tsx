import { Badge, User } from ".prisma/client";
import getGamesByUserId from "@/(app)/_actions/getGamesByUserId";
import getBadgesByUserID from "@/(app)/_actions/getBadgesByUserID";
import calculateUpcomingBadges, { IUpcomingBadge } from "@/(app)/_utilities/calculateUpcomingBadge";
import ProgressBar from "@/(app)/_components/profile/progressbar/ProgressBar";
import getBadges from "@/(app)/_actions/getBadges";

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
        <div className="w-full grid gap-5 shadow-xl p-8 bg-white rounded-lg">
            <h2 className="mb-5 text-purple-700 font-semibold text-base xl:text-xl">Upcoming Badges</h2>
            {upcomingBadges.map(upcomingBadge => (
                <ProgressBar key={upcomingBadge.id} badge={upcomingBadge}/>
            ))}
        </div>
    );
};