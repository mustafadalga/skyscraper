import getCurrentUser from "./getCurrentUser";
import prisma from "@/(app)/_libs/prismadb";
import { Game } from ".prisma/client";


export default async function getUserWonGames(): Promise<Game[]> {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return [];
        }

        const userGames = await prisma.game.findMany({
            where: {
                userId: currentUser.id,
                isGameWon: true
            },
            orderBy: {
                updatedAt: "desc"
            }
        })
        return userGames || [];

    } catch (error: any) {
        return [];
    }
}