import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/_libs/prismadb";


export async function GET(request: NextRequest) {
    if (request.method !== "GET") {
        return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
    }

    try {
        const users = await prismadb.user.findMany({
            select: {
                name: true,
                email: true,
                score: true
            },
            orderBy: {
                score: 'desc'
            }
        });

        return NextResponse.json(users, { status: 200 })
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Failed to fetch leaderboard' }, { status: 500 });
    }
}
