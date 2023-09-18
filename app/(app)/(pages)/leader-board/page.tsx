import Header from "@/(app)/_components/leader-board/Header";
import getTop100Users from "@/(app)/_actions/getTop100Users";
import LeaderBoard from "@/(app)/_components/leader-board/LeaderBoard";
import { IUser } from "@/(app)/_components/leader-board/types";
import LeaderBoardError from "@/(app)/_components/leader-board/LeaderBoardError";
import EmptyLeaderBoard from "@/(app)/_components/leader-board/EmptyLeaderBoard";

interface Top100Users {
    data: IUser[] | string,
    status: boolean
}

const Page = async () => {
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

export default Page;