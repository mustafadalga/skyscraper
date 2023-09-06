import axios from "axios";
import { Badge } from ".prisma/client";

export default async function getBadges(): Promise<Badge[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/badge/list`
        const { data } = await axios.get<Badge[]>(url);
        return data;
    } catch (e) {
        return []
    }
}

