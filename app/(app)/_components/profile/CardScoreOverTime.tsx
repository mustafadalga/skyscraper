import dynamic from "next/dynamic";
import { User } from ".prisma/client";
import getScoresOverTimeByUserID, { IScore } from "@/(app)/_actions/getScoresOverTimeByUserID";
import moment from "moment";

const LineChart = dynamic(() => import("@/(app)/_components/charts/LineChart"), { ssr: false })

interface Props {
    user: User
}

export default async function CardScoreOverTime({ user }: Props) {
    const userScores: IScore[] = await getScoresOverTimeByUserID(user.id);
    const data = {
        labels: userScores.map(item => moment(item.date).toISOString()),
        datasets: [ {
            label: '',
            data: userScores.map(item => item.score),
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
            fill: false
        } ]
    }

    return (
        <div className="shadow-xl p-8 bg-white rounded-lg">
            <h2 className="mb-5 text-purple-700 font-semibold text-base xl:text-xl">Score Over Time</h2>
            <LineChart data={data} className="!w-full !h-96"/>
        </div>
    )

};