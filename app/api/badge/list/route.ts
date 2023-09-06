import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import prisma from "@/_libs/prismadb";
import { Badge } from ".prisma/client";


export async function GET(request: NextRequest) {
    if (request.method !== "GET") {
        return NextResponse.json({ message: "Method not allowed" }, { status: 405 })
    }

    try {
        let stringifyBadges = cookies().get("badges")?.value;
        if (stringifyBadges) {
            return NextResponse.json(JSON.parse(stringifyBadges), { status: 200 });
        }

        const badges: Badge[] = await prisma.badge.findMany({
            orderBy: {
                priority: "desc"
            }
        });

        setBadgesToCookie(badges);
        return NextResponse.json(badges, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: 'Failed to fetch badges' }, { status: 500 });
    }
}

function setBadgesToCookie(badges: Badge[]) {
    const date = new Date();
    date.setTime(date.getTime() + (24 * 60 * 60 * 1000)); // 24 hours from now
    cookies().set({
        name: 'badges',
        value: JSON.stringify(badges),
        secure: true,
        httpOnly: true,
        path: '/',
        expires: date
    })
}