import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/_libs/prismadb";
import getCurrentUser from "@/_actions/getCurrentUser";

export async function GET(request: NextRequest) {
    if (request.method !== "GET") {
        return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
    }

    try {
        const currentUser = await getCurrentUser();

        if (!currentUser) {
            return NextResponse.json({ message: "User not authenticated" }, { status: 401 });
        }

        const userWithBadges = await prismadb.userBadge.findMany({
            where: {
                userId: currentUser.id
            },
            orderBy: {
                badge: {
                    priority: "desc"
                }
            }
        });

        return NextResponse.json(userWithBadges, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch badges' }, { status: 500 });
    }
}
