import prisma from "@/_libs/prismadb";
import { Badge } from ".prisma/client";


export default async function getBadgesByUserID(userId: string): Promise<Badge[]> {
    try {
        const badges = await prisma.userBadge.findMany({
            where: {
                userId
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

        return badges.map(badge => badge.badge) || [];

    } catch (error: any) {
        return [];
    }
}