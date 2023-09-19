import TimelineView from "@/(app)/_components/timeline-view/TimelineView"
import moment from "moment";
import { IReturn } from "@/(app)/_actions/getBadgesByUserID";

interface Props {
    badges: IReturn
}

export default function CardAchievementTimeLine({ badges }: Props) {
    const items = badges.map(({ badge, createdAt }) => ({
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