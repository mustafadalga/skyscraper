import getCurrentUser from "./getCurrentUser";
import prisma from "@/_libs/prismadb";
import { IBadge } from "@/_types";


export default async function getUserBadges(): Promise<IBadge[]> {
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
        const badges: IBadge[] = userBadges.map(({ badge }) => {
            const { createdAt, updatedAt, ...rest } = badge;
            return rest;
        });
        return badges || [];

    } catch (error: any) {
        return [];
    }
}