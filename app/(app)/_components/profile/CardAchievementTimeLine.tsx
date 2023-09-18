import getBadgesByUserID from "@/(app)/_actions/getBadgesByUserID";
import { User } from ".prisma/client";
import TimelineView from "@/(app)/_components/timeline-view/TimelineView"
import moment from "moment";

interface Props {
    user: User
}

export default async function CardAchievementTimeLine({ user }: Props) {
    const badgesData = await getBadgesByUserID(user.id);
    const sortedBadges = badgesData.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    const items = sortedBadges.map(({ badge, createdAt }) => ({
        badgeID: badge.id,
        title: moment(createdAt).fromNow(),
        cardTitle: badge.name,
        cardDetailedText: badge.description,
    }));
    return (
        <div className="shadow-xl p-8 bg-white rounded-lg pointer-events-none">
            <h2 className="mb-5 text-purple-700 font-semibold text-base xl:text-xl">Achievement Time Line</h2>
            <TimelineView items={items}
                          mode="VERTICAL"
                          cardHeight={30}/>
        </div>
    );
};