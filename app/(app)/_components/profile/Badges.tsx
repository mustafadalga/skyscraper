import { IReturn } from "@/(app)/_actions/getBadgesByUserID";
import Badge from "@/(app)/_components/badge/Badge";

interface Props {
    badges: IReturn
}

export default async function Badges({ badges }: Props) {
    const earnedBadges = badges.map(badge => badge.badge);
    return (
        <div className="shadow-xl p-8 bg-white rounded-lg">
            <h2 className="mb-5 text-purple-700 font-semibold text-base xl:text-xl">Won Badges</h2>
            <div className="grid gap-5 gap-y-8 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
                {earnedBadges.map((badge) => (
                    <Badge key={badge.id} id={badge.id} name={badge.name}/>
                ))}
            </div>
        </div>
    );
};