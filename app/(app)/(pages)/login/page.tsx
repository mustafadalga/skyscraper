import Login from "@/(app)/_components/login/Login";
import { User } from ".prisma/client";
import getCurrentUser from "@/(app)/_actions/getCurrentUser";
import { redirect } from "next/navigation";

export default async function Page() {
    const currentUser: User = await getCurrentUser() as User;

    if (currentUser) {
        return redirect("/game")
    }
    return <Login/>
};