import axios from "axios";
import { Badge } from ".prisma/client";

interface IReturn {
    status: boolean;
    data: Badge[] | string
}

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
