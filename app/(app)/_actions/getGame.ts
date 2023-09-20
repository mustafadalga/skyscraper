import axios from "axios";
import { Game, User } from ".prisma/client";

/**
 * Fetches the game data for a specific user.
 *
 * Makes an HTTP GET request to the `/api/game/{currentGameId}` endpoint
 * to retrieve the current game associated with the passed-in user.
 *
 * @param {User} user - The user object containing the `currentGameId` and `id`.
 *
 * @returns {Promise<Game | null>} - A promise that resolves to the `Game` object if the fetch is successful.
 *   Returns `null` if the fetch fails.
 */
export default async function getGame(user: User): Promise<Game | null> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/game/${user.currentGameId}`
        const { data } = await axios.get<Game>(url, {
            params: {
                userID: user.id
            }
        });
        return data;
    } catch (e) {
        return null;
    }
}