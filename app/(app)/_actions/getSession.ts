import { getServerSession } from "next-auth/next";
import { authOptions } from "~/pages/api/auth/[...nextauth]";

/**
 * Fetches the server session using the `next-auth` library.
 *
 * This function attempts to retrieve the server session by invoking the `getServerSession` method from `next-auth`.
 * It uses predefined authentication options from the `authOptions` object.
 *
 * @returns {Promise<any|null>} - A promise that resolves to the server session if successful, or `null` otherwise.
 *
 * @throws Will return `null` if the session retrieval fails.
 */
export default async function getSession(): Promise<any | null> {
    try {
        return await getServerSession(authOptions);
    } catch (e) {
        return null;
    }
}