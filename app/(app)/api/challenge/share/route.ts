import { NextRequest, NextResponse } from "next/server";

import handleAxiosError from "@/(app)/_utilities/handleAxiosError";
import prisma from "@/(app)/_libs/prismadb";

/**
 * Handles POST requests to share a challenge.
 *
 * @remarks
 * This function is designed to work as a Next.js serverless API route.
 * It expects a `userID` and a `gameID` in the JSON payload of the request body.
 * A new shared challenge is created in the Prisma database based on these parameters.

 * @returns A `NextResponse` object containing either:
 * - A success message and the `challengeID` in JSON format with a 200 status code, or
 * - An error message in JSON format with an appropriate status code.
 *
 * @throws
 * This function may throw errors related to database access or unexpected server issues.
 * These errors are caught and handled by `handleAxiosError`.
 */
export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        if (!body.userID) {
            return NextResponse.json({ message: "Please login to share your challenge!" }, { status: 403 });
        }


        if (!body.gameID) {
            return NextResponse.json({ message: "gameID are required to share your challenge!" }, { status: 400 });
        }

        const challenge = await prisma.sharedChallenge.create({
            data: {
                userId: body.userID,
                gameId: body.gameID
            }
        });

        return NextResponse.json({
            message: "Your challenge URL was created successfully.",
            challengeID: challenge.id
        }, { status: 200 });

    } catch (error) {
        const {
            message,
            status
        } = handleAxiosError(error, "Oops! Something went wrong while sharing your challenge. Please try again later.");
        return NextResponse.json({ message }, { status });
    }
}


