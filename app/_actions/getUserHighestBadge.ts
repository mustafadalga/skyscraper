import getUserBadges from "./getUserBadges";
import { Badge } from ".prisma/client";

export default async function getUserHighestBadge(): Promise<Badge | null> {
    try {
        const badges: Badge[] = await getUserBadges();
        if (badges?.length) {
            return badges[0];
        }
        return null;
    } catch (error) {
        return null;
    }
}