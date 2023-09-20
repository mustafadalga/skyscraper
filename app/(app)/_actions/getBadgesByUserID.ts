import prisma from "@/(app)/_libs/prismadb";
import { Badge } from ".prisma/client";

export type IReturn = {
    createdAt: Date,
    badge: Badge
}[]

/**
 * Fetches the badges associated with a specific user ID.
 *
 * This function queries the database to find all badges related to the user ID passed as an argument.
 * The badges are returned in ascending order based on their priority.
 *
 * @param {string} userId - The user ID whose badges are to be fetched.
 *
 * @returns {Promise<IReturn>} - A promise that resolves to an array of badges with their creation date.
 *   Each element in the array is an object containing:
 *   - `createdAt`: The date the badge was created.
 *   - `badge`: The badge object.
 *
 * @throws Will return an empty array if the query or user ID is invalid.
 */
export default async function getBadgesByUserID(userId: string): Promise<IReturn> {
    try {
        const badges = await prisma.userBadge.findMany({
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
            }
        })
        return badges || [];

    } catch (error: any) {
        return [];
    }
}