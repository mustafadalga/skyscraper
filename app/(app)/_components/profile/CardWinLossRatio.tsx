import { Game, User } from ".prisma/client";
import getGamesByUserId from "@/(app)/_actions/getGamesByUserId";
import dynamic from "next/dynamic";
const PieChart = dynamic(() => import("@/(app)/_components/charts/PieChart"),{ ssr: false })

interface Props {
    user: User
}

export default async function CardWinLossRatio({ user }: Props) {
    const games: Game[] = await getGamesByUserId(user.id) as Game[];
    const wonGamesCount = games.filter(game => game.isGameWon).length;
    const lostGamesCount = games.filter(game => !game.isGameWon).length;
    const data = {
        labels: [ "Win", "Loss" ],
        datasets: [
            {
                label: "Win vs Loss",
                data: [ wonGamesCount, lostGamesCount ],
                backgroundColor: [ 'rgba(75, 192, 192, 0.6)',
                    'rgba(255, 99, 132, 0.6)'
                ],
            },
        ]
    }

    return (
        <div className="shadow-xl p-8 bg-white rounded-lg">
            <h2 className="mb-5 text-purple-700 font-semibold text-base xl:text-xl">Win Loss Ratio</h2>
            <PieChart data={data} className="w-40 h-40 md:w-60 md:h-60 lg:w-80 lg:h-80"/>
        </div>
    )
}
