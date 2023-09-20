import prisma from "@/(app)/_libs/prismadb";

export interface IScore {
    score: number,
    date: Date
}

/**
 * Fetches the scores over time for a specific user ID.
 *
 * This function queries the Prisma database to find all won games related to the user ID passed as an argument.
 * It then maps these games to an array of scores and their corresponding dates.
 *
 * @param {string} userId - The ID of the user whose scores over time are to be fetched.
 *
 * @returns {Promise<IScore[]>} - A promise that resolves to an array of `IScore` objects.
 *   Each `IScore` object contains:
 *   - `score`: The score at that point in time.
 *   - `date`: The date when the game was won.
 *   Returns an empty array if the query fails or if no games are won.
 *
 * @throws Will return an empty array if the query or user ID is invalid.
 */
export default async function getScoresOverTimeByUserID(userId: string): Promise<IScore[]> {
    try {
        const wonGames = await prisma.game.findMany({
            where: {
                userId,
                isGameWon: true
            },
        });

        return wonGames.map(({ createdAt }, index) => {
            return {
                score: index + 1,
                date: createdAt
            }
        });

    } catch (_) {
        return [];
    }
}