import { NextRequest, NextResponse } from "next/server";
import prismadb from "@/(app)/_libs/prismadb";
import handleAxiosError from "@/(app)/_utilities/handleAxiosError";


/**
 * Handles GET requests to fetch the leaderboard data.
 *
 * @remarks
 * This function is designed to work as a Next.js serverless API route.
 * It queries the Prismadb database to find users ordered by their scores in descending order.

 * @returns A `NextResponse` object containing either:
 * - An array of user objects with their `name`, `email`, and `score` in JSON format with a 200 status code, or
 * - An error message in JSON format with an appropriate status code.
 *
 * @throws
 * This function may throw errors related to database access or unexpected server issues.
 * These errors are caught and handled by `handleAxiosError`.
 */
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
