import prisma from "@/(app)/_libs/prismadb";
import { User } from ".prisma/client";

/**
 * Fetches a user from the database by their ID.
 *
 * This function uses Prisma to query the `user` table and find a user with the specified ID.
 *
 * @param {string} id - The ID of the user to fetch.
 * @returns {Promise<User|null>} - A Promise that resolves to a `User` object if found, or `null` if no user is found.
 * @throws Will return `null` if any error occurs during the Prisma query.
 */
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
