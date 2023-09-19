import { User } from ".prisma/client";
import Header from "@/(app)/_components/hall-of-wins/Header";
import HallOfWins from "@/(app)/_components/hall-of-wins/HallOfWins";
import getCurrentUser from "@/(app)/_actions/getCurrentUser";
import getUserWonGames from "@/(app)/_actions/getUserWonGames";

export default async function Page() {
    const user = await getCurrentUser() as User;
    const games = await getUserWonGames();
    return (
        <article className="container mx-auto p-4 lg:p-10">
            <Header/>
            <HallOfWins games={games} user={user}/>
        </article>
    );
};