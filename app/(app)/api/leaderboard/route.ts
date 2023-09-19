import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/(app)/_libs/prismadb";
import handleAxiosError from "@/(app)/_utilities/handleAxiosError";


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
        const {
            message,
            status
        } = handleAxiosError(error, "Oops! Something went wrong while loading leader board. Please try again later.");
        return NextResponse.json({ message }, { status });
    }
}
