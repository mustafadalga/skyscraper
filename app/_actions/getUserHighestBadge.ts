import getUserBadges from "./getUserBadges";
import { IBadge } from "@/_types";

export default async function getUserHighestBadge(): Promise<IBadge | null> {
    try {
        const badges: IBadge[] = await getUserBadges();
        if (badges?.length) {
            return badges[0];
        }
        return null;
    } catch (error) {
        return null;
    }
}