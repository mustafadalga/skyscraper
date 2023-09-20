import { NextRequest, NextResponse } from "next/server";
import type { User } from ".prisma/client";
import getCurrentUser from "@/(app)/_actions/getCurrentUser";
import handleAxiosError from "@/(app)/_utilities/handleAxiosError";
import { generateGameData, IGameData, startNewGame } from "./utilities";

/**
 * Handles POST requests to start a new game.
 *
 * @remarks
 * This function is designed to work as a Next.js serverless API route.
 * It expects a logged-in user and a JSON payload containing `difficulty` and `dimension`.
 * A new game is started based on these parameters.
 *
 * @returns A `NextResponse` object containing either:
 * - A success message in JSON format with a 200 status code, or
 * - An error message in JSON format with an appropriate status code.
 *
 * @throws
 * This function may throw errors related to user authentication, game initialization, or unexpected server issues.
 * These errors are caught and handled by `handleAxiosError`.
 */
export async function POST(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser() as User;

        if (!currentUser) {
            return NextResponse.json({ message: "Please login to start a new game." }, { status: 403 });
        }

        const body = await request.json();
        const { difficulty, dimension } = body;

        if (!difficulty || !difficulty) {
            return NextResponse.json({ message: "Both difficulty and dimension are required to start a new game." }, { status: 400 });
        }

        const data: IGameData = await generateGameData(dimension, difficulty) as IGameData;
        await startNewGame(data);
        return NextResponse.json({ message: "New game started successfully." }, { status: 200 });

    } catch (error) {
        const {
            message,
            status
        } = handleAxiosError(error, "Oops! Something went wrong while starting your game. Please try again!");
        return NextResponse.json({ message }, { status });
    }
}





