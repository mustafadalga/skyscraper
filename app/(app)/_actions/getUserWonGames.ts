import getCurrentUser from "./getCurrentUser";
import prisma from "@/(app)/_libs/prismadb";
import { Game } from ".prisma/client";


/**
 * Fetches all won games for the currently logged-in user.
 *
 * This function uses Prisma to query the `game` table and find all games won by the current user.
 * The games are ordered by their last updated time in descending order.
 *
 * @returns {Promise<Game[]>} - A Promise that resolves to an array of `Game` objects representing won games.
 * If the user is not logged in, the Promise resolves to an empty array.
 * @throws Will return an empty array if any error occurs during the Prisma query or user retrieval.
 */
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