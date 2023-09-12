import prisma from "@/_libs/prismadb";
import { Game } from ".prisma/client";


export default async function getGamesByUserId(userId: string): Promise<Game[] | null> {
    try {
        const games = await prisma.game.findMany({
            where: {
                userId
            },
        })

        return games || null;

    } catch (error: any) {
        return null;
    }
}