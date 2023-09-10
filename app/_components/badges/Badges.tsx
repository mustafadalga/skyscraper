import { Badge } from ".prisma/client";
import BadgeIcon from "@/_components/badge/BadgeIcon";

interface Props {
    badges: Badge[]
}

const Badges = ({ badges }: Props) => {
    return (
        <div className="grid gap-3">
            <table className="w-full bg-white text-left text-xs lg:text-sm xl:text-base">
                <thead>
                <tr>
                    <th className="py-2 px-4 pr-8 border-b">Icon</th>
                    <th className="py-2 px-4 border-b">Priority</th>
                    <th className=" py-2 px-4 border-b">Name</th>
                    <th className="py-2 px-4 border-b">Description</th>
                    <th className="py-2 px-4 border-b">Criteria</th>
                </tr>
                </thead>
                <tbody>
                {badges.map(badge => (
                    <tr key={badge.id} className="hover:bg-gray-100">
                        <td className="py-8 px-4 pr-8 border-b">
                            <BadgeIcon
                                badgeID={badge.id} className="text-3xl xl:text-4xl text-purple-500 hover:text-purple-600"/>
                        </td>
                        <td className="py-8 px-4 border-b">
                            {badge.priority}
                        </td>
                        <td className="py-8 px-4 border-b">
                            {badge.name}
                        </td>
                        <td className="py-8 px-4 border-b">
                            {badge.description}
                        </td>
                        <td className="py-8 px-4 border-b">
                            {badge.criteria}
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    )
};

export default Badges;