import moment from "moment";
import { Game, User } from ".prisma/client";
import getGamesByUserId from "@/(app)/_actions/getGamesByUserId";
import convertTimeToHHMMSS from "@/(app)/_utilities/convertTimeToHHMMSS";
import getHighestBadgeByUserId from "@/(app)/_actions/getHighestBadgeByUserId";
import BadgeIcon from "@/(app)/_components/badge/BadgeIcon";

interface Props {
    user: User
}

export default async function CardPlayerProfile({ user }: Props) {
    const highestBadge = await getHighestBadgeByUserId(user.id);
    const games: Game[] = await getGamesByUserId(user.id) as Game[];
    const gameCount = games ? games.length : 0;
    const joined = () => {
        const formattedDate = moment(user.createdAt).format('MM/DD/YYYY');
        const daysAgo = moment().diff(moment(user.createdAt), 'days');
        return `${formattedDate} (${daysAgo} days ago)`;
    }
    const avgHintUsed = () => {
        if (!gameCount) return 0;

        const totalHintsUsed = games?.reduce((acc, game) => {
            return acc + game.usedHiddenHintRights;
        }, 0);

        return Math.round(totalHintsUsed / gameCount);
    }


    return (
        <div className="shadow-xl p-8 bg-white rounded-lg">
            <h2 className="mb-3 text-purple-700 font-semibold text-base xl:text-xl">Player Profile</h2>
            <ul className="grid gap-2 text-xs md:text-sm xl:text-base">
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Full Name:</span>
                    <span className="">{user.name}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Email:</span>
                    <span className="">{user.email}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Highest Badge:</span>
                    <span className="flex items-center gap-2">
                        <BadgeIcon badgeID={highestBadge?.id as string}
                                   className="text-base"/>
                        {highestBadge?.name}
                    </span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Difficulty:</span>
                    <span className="">{user.difficulty}</span>
                </li>

                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Longest Winning Streak:</span>
                    <span className="">{user.longestWinningStreak}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Total Games Played:</span>
                    <span className="">{gameCount}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Score:</span>
                    <span className="">{user.score}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Average Time:</span>
                    <span className="">{convertTimeToHHMMSS(user.avgTime)}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Average Hint Used:</span>
                    <span className="">{avgHintUsed()}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Joined:</span>
                    <span className="">{joined()}</span>
                </li>
            </ul>
        </div>
    )
        ;
};