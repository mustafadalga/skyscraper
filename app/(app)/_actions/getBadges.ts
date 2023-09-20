import axios from "axios";
import { Badge } from ".prisma/client";

interface IReturn {
    status: boolean;
    data: Badge[] | string
}

/**
 * Fetches the list of badges from the API.
 *
 * The function makes an HTTP GET request to the `/api/badge/list` endpoint
 * to retrieve all the available badges.
 *
 * @returns {Promise<IReturn>} - A promise that resolves to an object containing the status and data.
 *   - status: `true` if the badges were fetched successfully, `false` otherwise.
 *   - data: An array of badges if successful, or an error message string.
 */
export default async function getBadges(): Promise<IReturn> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/badge/list`;
        const { data } = await axios.get<Badge[]>(url);
        return {
            data,
            status: true
        };
    } catch (e) {
        return {
            status: false,
            data: "Oops! We couldn't load badges right now. Please refresh the page or try again later."
        };
    }
}
