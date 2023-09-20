import prisma from "@/(app)/_libs/prismadb";
import { Game } from ".prisma/client";


/**
 * Fetches the games associated with a specific user ID from the database.
 *
 * This function queries the Prisma database to find all games related to the user ID passed as an argument.
 * The games are returned in descending order based on their `updatedAt` field.
 *
 * @param {string} userId - The ID of the user whose games are to be fetched.
 *
 * @returns {Promise<Game[]>} - A promise that resolves to an array of `Game` objects.
 *   Returns an empty array if the query fails or if no games are found.
 *
 * @throws Will return an empty array if the query or user ID is invalid.
 */
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