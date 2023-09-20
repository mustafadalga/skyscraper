import prisma from "@/(app)/_libs/prismadb";
import { Badge } from ".prisma/client";

/**
 * Fetches the highest-priority badge associated with a specific user ID from the database.
 *
 * This function queries the Prisma database to find the badge with the highest priority related to the user ID passed as an argument.
 *
 * @param {string} userId - The ID of the user whose highest-priority badge is to be fetched.
 *
 * @returns {Promise<Badge | null>} - A promise that resolves to the `Badge` object with the highest priority.
 *   Returns `null` if the query fails or if no badges are found.
 *
 * @throws Will return `null` if the query or user ID is invalid.
 */
export default async function getHighestBadgeByUserId(userId: string): Promise<Badge | null> {
    try {
        const highestBadge = await prisma.userBadge.findFirst({
            where: {
                userId
            },
            include: {
                badge: true
            },
            orderBy: {
                badge: {
                    priority: "asc"
                }
            },
            take: 1
        })

        return highestBadge?.badge || null;

    } catch (error: any) {
        return null;
    }
}