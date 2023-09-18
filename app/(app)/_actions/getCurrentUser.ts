import prisma from "@/(app)/_libs/prismadb";
import getSession from "./getSession";
import { User } from ".prisma/client";

/**
 * Fetches the current user from the database based on the session information.
 *
 * @returns {Promise<User | null>} A promise that resolves to the current User object if found,
 * otherwise resolves to null. If any error occurs during the operation, the promise
 * also resolves to null.
 */
export default async function getCurrentUser(): Promise<User | null> {
    try {
        // Fetch the current session
        const session = await getSession();

        // Check if the session or user email exists
        if (!session?.user?.email) {
            return null;
        }

        // Fetch the current user from the database based on the email
        const currentUser = await prisma.user.findUnique({
            where: {
                email: session.user.email as string,
            },
        });

        // Return the current user if found, otherwise return null
        return currentUser || null;
    } catch (_) {
        return null;
    }
}
