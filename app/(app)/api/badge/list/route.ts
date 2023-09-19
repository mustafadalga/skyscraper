import { NextRequest, NextResponse } from "next/server";
import prisma from "@/(app)/_libs/prismadb";
import { Badge } from ".prisma/client";

export async function GET(request: NextRequest) {
    if (request.method !== "GET") {
        return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
    }

    try {
        const badges: Badge[] = await prisma.badge.findMany({
            orderBy: {
                priority: "asc"
            }
        });

        return NextResponse.json(badges, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch badges' }, { status: 500 });
    }
}