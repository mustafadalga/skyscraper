import { NextRequest, NextResponse } from "next/server";
import prisma from "@/_libs/prismadb";
import type { User, Badge as IBadge } from ".prisma/client";
import getCurrentUser from "@/_actions/getCurrentUser";
import handleAxiosError from "@/_utilities/handleAxiosError";
import { Badge, Difficulty } from "@/_enums";
import { generateGameBoard } from "@/_utilities/generateGameBoard";
import getHighestBadgeByUserId from "@/_actions/getHighestBadgeByUserId";

interface IGameData {
    userId: string,
    validGrid: string,
    filledGrid: string,
    hints: string,
    shownHints: string,
    hiddenHintCount: number,
    difficulty: Difficulty,
    dimension: number,
    usedHiddenHintRights: number
}

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
        const { message, status } = handleAxiosError(error, "An unexpected error occurred. Please try again.");
        return NextResponse.json({ message }, { status });
    }
}


async function startNewGame(data: IGameData) {
    // Define the game creation operation
    try {
        const newGame = await prisma.game.create({
            data: data,
            select: {
                id: true,
            },
        });

        // Prepare the user update operation
        const updateUser = prisma.user.update({
            where: { id: data.userId },
            data: { currentGameId: newGame.id },
        });

        const [ updatedUser ] = await prisma.$transaction([ updateUser ]);
        return { newGame, updatedUser };
    } catch (error) {
        const {
            message,
            status
        } = handleAxiosError(error, "An error occurred while creating a new game. Please check your inputs and try again.");
        return {
            message,
            status
        }
    }
}

async function generateGameData(dimension: number, difficulty: Difficulty): Promise<IGameData | null> {
    try {
        const { score, avgTime, id } = await getCurrentUser() as User;
        const highestBadge: IBadge | null = await getHighestBadgeByUserId(id);
        let highestBadgeID: Badge | undefined;
        if (highestBadge) {
            highestBadgeID = highestBadge.id as Badge
        }
        const { shownHints, emptyGrid, grid, hints, hiddenHintCount } = generateGameBoard({
            score,
            avgTime,
            difficulty,
            dimension,
            highestBadge: highestBadgeID as Badge
        });

        return {
            validGrid: JSON.stringify(grid),
            filledGrid: JSON.stringify(emptyGrid),
            hints: JSON.stringify(hints),
            shownHints: JSON.stringify(shownHints),
            hiddenHintCount,
            difficulty,
            dimension,
            userId: id,
            usedHiddenHintRights: 0
        }

    } catch (error) {
        return null;
    }
}

