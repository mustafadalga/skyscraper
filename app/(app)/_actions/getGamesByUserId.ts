import prisma from "@/(app)/_libs/prismadb";
import { Game } from ".prisma/client";


export default async function getGamesByUserId(userId: string): Promise<Game[]> {
    try {
        const games = await prisma.game.findMany({
            where: {
                userId
            },
            orderBy: {
                updatedAt: "desc"
            }
        })

        return games || null;

    } catch (error: any) {
        return [];
    }
}