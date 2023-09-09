import { IUser } from "@/_components/leader-board/types";
import BadgeIcon from "@/_components/badge/BadgeIcon";
import convertTimeToHHMMSS from "@/_utilities/convertTimeToHHMMSS";

interface Props {
    top100: IUser[]
}

const LeaderBoardList = ({ top100 }: Props) => {
    return (
        <table className="w-full bg-white text-left text-xs lg:text-sm xl:text-base">
            <thead>
            <tr>
                <th className="py-2 px-4 border-b">Rank</th>
                <th className="py-2 px-4 border-b">Name</th>
                <th className=" py-2 px-4 border-b">Score</th>
                <th className="py-2 px-4 border-b">Avg Time</th>
                <th className="py-2 px-4 border-b">Badges</th>
            </tr>
            </thead>
            <tbody>
            {top100.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-100">
                    <td className="py-2 px-4 border-b">{index + 1}</td>
                    <td className="py-2 px-4 border-b">{user.name}</td>
                    <td className="py-2 px-4 border-b">{user.score}</td>
                    <td className="py-2 px-4 border-b">{convertTimeToHHMMSS(user.avgTime) }</td>
                    <td className="flex items-center gap-5 py-2 px-4 border-b">
                        <BadgeIcon badgeID={user.highestBadge.id} className="text-xl text-purple-500"/>
                        {user.highestBadge.name}
                    </td>
                </tr>
            ))}
            </tbody>
        </table>
    );
};

export default LeaderBoardList