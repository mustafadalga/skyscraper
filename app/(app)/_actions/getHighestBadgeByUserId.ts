import prisma from "@/(app)/_libs/prismadb";
import { Badge } from ".prisma/client";


export default async function getHighestBadgeByUserId(userId: string): Promise<Badge | null> {
    try {
        const highestBadge = await prisma.userBadge.findFirst({
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
            },
            take: 1
        })

        return highestBadge?.badge || null;

    } catch (error: any) {
        return null;
    }
}