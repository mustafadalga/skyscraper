import { NextRequest, NextResponse } from "next/server";
import { User } from ".prisma/client";
import prisma from "@/(app)/_libs/prismadb";
import handleAxiosError from "@/(app)/_utilities/handleAxiosError";
import getCurrentUser from "@/(app)/_actions/getCurrentUser";
import {
    getGameDataToUpdate,
    handleCreateBadge,
    handleInvalidRequest,
    handleUpdateUser,
} from "./utilities";

/**
 * Handles GET request to fetch current game for a user.
 * @param request - The incoming Next.js request object.
 * @returns A NextResponse object with the status and game data or error message.
 */
export async function GET(request: NextRequest) {
    try {

        const userID = request.nextUrl.searchParams.get("userID");

        if (!userID) {
            return NextResponse.json({ message: "Please login to start a new game!" }, { status: 403 });
        }

        // Fetch the current user along with their currentGameId
        const currentGame = await prisma.user.findUnique({
            where: { id: userID },
            select: {
                currentGame: {
                    select: {
                        id: true,
                        isGameCompleted: true,
                        difficulty: true,
                        dimension: true,
                        isGameWon: true,
                        usedHiddenHintRights: true,
                        hiddenHintCount: true,
                        shownHints: true,
                        hints: true,
                        filledGrid: true,
                        validGrid: true,
                        createdAt: true,
                    },
                },
            },
        });

        if (!currentGame?.currentGame) {
            return NextResponse.json({ message: "No active game found." }, { status: 404 });
        }
        return NextResponse.json(currentGame.currentGame, { status: 200 });

    } catch (error) {
        const {
            message,
            status
        } = handleAxiosError(error, "Oops! Something went wrong while loading the game details. Please try again later.");
        return NextResponse.json({ message }, { status });
    }
}

/**
 * Handles PATCH request to update a game.
 * @param request - The incoming Next.js request object.
 * @param params - Object containing the game ID to be updated.
 * @returns A NextResponse object with the status and a success or error message.
 */
export async function PATCH(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
        const currentUser = await getCurrentUser() as User;

        if (!currentUser || !id) {
            return handleInvalidRequest(currentUser, id)
        }

        const body = await request.json();
        const bodyData = getGameDataToUpdate(body);
        const updatedGame = await prisma.game.update({
            where: { id },
            data: bodyData as any
        });

        if (updatedGame.isGameCompleted) {
            await handleUpdateUser(currentUser, updatedGame);
        }
        if (updatedGame.isGameWon) {
            await handleCreateBadge(updatedGame);
        }

        return NextResponse.json({ message: "Game updated successfully." }, { status: 200 });

    } catch (error) {
        const {
            message,
            status
        } = handleAxiosError(error, "Oops! Something went wrong while updating the game. Please try again later.");
        return NextResponse.json({ message }, { status });
    }
}

