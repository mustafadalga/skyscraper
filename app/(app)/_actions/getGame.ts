import axios from "axios";
import { Game, User } from ".prisma/client";

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