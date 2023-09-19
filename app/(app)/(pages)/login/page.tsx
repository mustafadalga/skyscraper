import { redirect } from "next/navigation";
import { User } from ".prisma/client";
import Login from "@/(app)/_components/login/Login";
import getCurrentUser from "@/(app)/_actions/getCurrentUser";

export default async function Page() {
    const currentUser: User = await getCurrentUser() as User;

    if (currentUser) {
        return redirect("/")
    }
    return <Login/>
};