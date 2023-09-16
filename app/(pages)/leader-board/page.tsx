import Header from "@/_components/leader-board/Header";
import getTop100Users from "@/_actions/getTop100Users";
import LeaderBoard from "@/_components/leader-board/LeaderBoard";
import { IUser } from "@/_components/leader-board/types";
import LeaderBoardError from "@/_components/leader-board/LeaderBoardError";
import EmptyLeaderBoard from "@/_components/leader-board/EmptyLeaderBoard";

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