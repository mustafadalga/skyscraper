import { Game, User } from ".prisma/client";
import getHighestBadgeByUserId from "@/_actions/getHighestBadgeByUserId";
import BadgeIcon from "@/_components/badge/BadgeIcon";
import moment from "moment";
import getGamesByUserId from "@/_actions/getGamesByUserId";
import convertTimeToHHMMSS from "@/_utilities/convertTimeToHHMMSS";

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
            <ul className="grid gap-2">
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="w-32 font-semibold">Full Name:</span>
                    <span>{user.name}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Email:</span>
                    <span>{user.email}</span>
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
                    <span>{user.difficulty}</span>
                </li>

                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Longest Winning Streak:</span>
                    <span>{user.longestWinningStreak}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Total Games Played:</span>
                    <span>{gameCount}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Score:</span>
                    <span>{user.score}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Average Time:</span>
                    <span>{convertTimeToHHMMSS(user.avgTime)}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Average Hint Used:</span>
                    <span>{avgHintUsed()}</span>
                </li>
                <li className="grid grid-cols-2 gap-2 border-y py-2 text-gray-500">
                    <span className="font-semibold">Joined:</span>
                    <span>{joined()}</span>
                </li>
            </ul>
        </div>
    )
        ;
};