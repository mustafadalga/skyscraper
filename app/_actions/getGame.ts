import axios from "axios";
import getCurrentUser from "./getCurrentUser";
import { Game } from ".prisma/client";

export default async function getGame(): Promise<Game | null> {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return null;
        }

        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
        const url = `${baseUrl}/api/game/${currentUser.currentGameId}`
        const { data } = await axios.get<Game>(url, {
            params: {
                userID: currentUser.id
            }
        });
        return data;
    } catch (e) {
        return null;
    }
}