import { Metadata } from "next";
import Header from "@/(app)/_components/leader-board/Header";
import getTop100Users from "@/(app)/_actions/getTop100Users";
import LeaderBoard from "@/(app)/_components/leader-board/LeaderBoard";
import LeaderBoardError from "@/(app)/_components/leader-board/LeaderBoardError";
import EmptyLeaderBoard from "@/(app)/_components/leader-board/EmptyLeaderBoard";
import { IUser } from "@/(app)/_components/leader-board/types";


interface Top100Users {
    data: IUser[] | string,
    status: boolean
}

export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
    title: 'Meet the Best Gamers: Top 100 Players Leaderboard - Skyscraper',
    description: 'Explore the ultimate list of top 100 gamers on Skyscraper See who\'s dominating the game, their scores, achievements, and more. Are you up for the challenge?',
}

export default async function Page() {
    const top100UserData = await getTop100Users() as Top100Users;
    return (
        <article className="container mx-auto p-4 lg:p-10">
            <Header/>
            {top100UserData.status ? (
                top100UserData.data.length ? <LeaderBoard top100={top100UserData.data as IUser[]}/> :
                    <EmptyLeaderBoard/>
            ) : (
                <LeaderBoardError/>
            )}
        </article>
    );
};
