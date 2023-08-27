import axios from "axios";
import { IBadge } from "@/_types";

export default async function getBadges(): Promise<IBadge[]> {
    try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/badge/list`
        const { data } = await axios.get<IBadge[]>(url);
        return data;
    } catch (e) {
        return []
    }
}