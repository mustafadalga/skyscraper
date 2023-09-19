import { NextRequest, NextResponse } from "next/server";
import prisma from "@/(app)/_libs/prismadb";
import { Badge } from ".prisma/client";
import handleAxiosError from "@/(app)/_utilities/handleAxiosError";

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
        const {
            message,
            status
        } = handleAxiosError(error, "Oops! Something went wrong while loading badges. Please try again later.");
        return NextResponse.json({ message }, { status });    }
}