import DoughNutChart from "@/_components/charts/DoughNutChart";
import { Game, User } from ".prisma/client";
import getGamesByUserId from "@/_actions/getGamesByUserId";

interface Props {
    user: User
}

export default async function CardStreakSummary({ user }: Props) {
    const games: Game[] = await getGamesByUserId(user.id) as Game[];
    const gameCount = games ? games.length : 0;
    console.log(gameCount, user.longestWinningStreak)
    const longestWinningStreak = {
        labels: [ "Longest Winning Streak", "Game Count" ],
        datasets: [
            {
                label: "Longest Winning Streak vs Game Count",
                data: [ user.longestWinningStreak, gameCount - user.longestWinningStreak ],
                backgroundColor: [ 'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
            },
        ]
    }
    const winLossStreak = {
        labels: [ "Winning Streak", "Loss Streak" ],
        datasets: [
            {
                label: "Winning Streak Streak vs Loss Streak",
                data: [ user.winningStreak, user.lossStreak ],
                backgroundColor: [ 'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
            },
        ]
    }

    return (
        <div className="flex items-center gap-10 shadow-xl p-8 bg-white rounded-lg">
            <div className="grid place-items-center">
                <h2 className="mb-5 text-purple-700 font-semibold text-base xl:text-xl">Longest Winning Streak</h2>
                <DoughNutChart data={longestWinningStreak} className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80"/>
            </div>
            <div className="grid place-items-center">
                <h2 className="mb-5 text-purple-700 font-semibold text-base xl:text-xl">Win vs Loss Streak</h2>
                <DoughNutChart data={winLossStreak} className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80"/>
            </div>
        </div>
    );
};