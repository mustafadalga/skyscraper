import { getServerSession } from "next-auth/next";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

export default async function getSession() {
    try {
        return await getServerSession(authOptions);
    } catch (e) {
        return null;
    }
}