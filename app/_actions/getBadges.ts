import axios from "axios";
import { Badge } from ".prisma/client";

/**
 * Fetches the list of badges from the API.
 *
 * @returns {Promise<Badge[]>} A promise that resolves to an array of Badge objects.
 * If the request fails, the promise resolves to an empty array.
 */
export default async function getBadges(): Promise<Badge[]> {
    try {
        // Base URL from environment variables
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

        // Construct the complete URL for fetching badges
        const url = `${baseUrl}/api/badge/list`;

        // Perform the GET request to fetch badges
        const { data } = await axios.get<Badge[]>(url);

        // Return the fetched badges
        return data;
    } catch (e) {
        // If the request fails, return an empty array
        return [];
    }
}
