import { NextRequest, NextResponse } from "next/server";
import prisma from "@/_libs/prismadb";
import handleAxiosError from "@/utilities/handleAxiosError";
import getCurrentUser from "@/_actions/getCurrentUser";
import { User } from ".prisma/client";

interface IDataToUpdate {
    shownHints?: string,
    filledGrid?: string,
    usedHiddenHintRights?: string,
    isGameCompleted?: boolean
}

export async function GET(request: NextRequest) {
    try {
        const userID = request.nextUrl.searchParams.get("userID");
        if (!userID) {
            return NextResponse.json({ message: "Please login to start a new game!" }, { status: 403 });
        }

        // Fetch the current user along with their currentGameId
        const userWithCurrentGame = await prisma.user.findUnique({
            where: { id: userID },
            select: {
                currentGameId: true,
            },
        });

        if (!userWithCurrentGame || !userWithCurrentGame.currentGameId) {
            return NextResponse.json({ message: "No active game found." }, { status: 404 });
        }

        // Fetch the current game based on currentGameId
        const currentGame = await prisma.game.findUnique({
            where: { id: userWithCurrentGame.currentGameId },
        });

        if (!currentGame) {
            return NextResponse.json({ message: "No active game found." }, { status: 404 });
        }
        return NextResponse.json(currentGame, { status: 200 });

    } catch (error) {
        const { message, status } = handleAxiosError(error, "An unexpected error occurred. Please try again.");
        return NextResponse.json({ message }, { status });
    }
}

export async function PATCH(request: NextRequest) {
    try {
        const currentUser = await getCurrentUser() as User;

        if (!currentUser) {
            return NextResponse.json({ message: "You must be logged in to update the game. Please log in and try again." }, { status: 403 });
        }

        const id = request.nextUrl.pathname.split('/').pop();

        if (!id) {
            return NextResponse.json({ message: "Game ID is missing. Please make sure you're accessing the game correctly." }, { status: 400 });
        }

        const body = await request.json();
        await prisma.game.update({
            where: { id },
            data: getDataToUpdate(body) as any,
        });

        // Check if the game is completed and update the user's currentGameId to null
        if (body.isGameCompleted) {
            await prisma.user.update({
                where: { id: currentUser.id },
                data: { currentGameId: null },
            });
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


function getDataToUpdate({ filledGrid, shownHints, usedHiddenHintRights, isGameCompleted }: IDataToUpdate) {
    const dataToUpdate: IDataToUpdate = {};
    if (shownHints !== undefined) dataToUpdate.shownHints = shownHints;
    if (usedHiddenHintRights !== undefined) dataToUpdate.usedHiddenHintRights = usedHiddenHintRights;
    if (filledGrid !== undefined) dataToUpdate.filledGrid = filledGrid;
    if (isGameCompleted !== undefined) dataToUpdate.isGameCompleted = isGameCompleted;

    return dataToUpdate
}