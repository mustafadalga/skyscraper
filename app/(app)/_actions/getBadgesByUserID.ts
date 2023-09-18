import prisma from "@/(app)/_libs/prismadb";
import { Badge } from ".prisma/client";

type IReturn = {
    createdAt: Date,
    badge: Badge
}[]

export default async function getBadgesByUserID(userId: string): Promise<IReturn> {
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
        return badges || [];

    } catch (error: any) {
        return [];
    }
}