import prisma from "@/_libs/prismadb";
import { User } from ".prisma/client";

export default async function getUserByID(id: string): Promise<User | null> {
    try {
        const currentUser = await prisma.user.findUnique({
            where: {
                id
            },
        });

        return currentUser || null;
    } catch (_) {
        return null;
    }
}
