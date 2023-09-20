import { NextRequest, NextResponse } from "next/server";
import prisma from "@/(app)/_libs/prismadb";
import { Badge } from ".prisma/client";
import handleAxiosError from "@/(app)/_utilities/handleAxiosError";

/**
 * Handles GET requests to fetch the list of badges.
 *
 * @remarks
 * This function is designed to work as a Next.js serverless API route.
 * It queries the Prisma database to find badges ordered by their priority in ascending order.
 *
 * @returns A `NextResponse` object containing either:
 * - An array of `Badge` objects in JSON format with a 200 status code, or
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
        return NextResponse.json({ message }, { status });
    }
}