import getCurrentUser from "./getCurrentUser";
import prisma from "@/_libs/prismadb";
import { Badge } from ".prisma/client";


export default async function getUserBadges(): Promise<Badge[]> {
    try {
        const currentUser = await getCurrentUser();
        if (!currentUser) {
            return [];
        }

        const userBadges = await prisma.userBadge.findMany({
            where: {
                userId: currentUser.id
            },
            include: {
                badge: true
            },
            orderBy: {
                badge: {
                    priority: "asc"
                }
            }
        })

        return userBadges.map(userBadge=>userBadge.badge) || [];

    } catch (error: any) {
        return [];
    }
}