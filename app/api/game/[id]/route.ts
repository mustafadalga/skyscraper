import { NextRequest, NextResponse } from "next/server";
import { Game, User } from ".prisma/client";
import prisma from "@/_libs/prismadb";
import handleAxiosError from "@/_utilities/handleAxiosError";
import getCurrentUser from "@/_actions/getCurrentUser";
import calculateUserDifficulty from "@/_utilities/calculateUserDifficulty";
import calculateNewAvgTime from "@/_utilities/calculateNewAvgTime";
import getUserBadges from "@/_actions/getUserBadges";
import calculateUserEarnedBadge from "@/_utilities/calculateUserEarnedBadge";
import getBadges from "@/_actions/getBadges";
import getUserWonGames from "@/_actions/getUserWonGames";

/**
 * Interface representing the data to update for a game.
 */
interface IGameDataToUpdate {
    shownHints?: string,
    filledGrid?: string,
    usedHiddenHintRights?: number,
    isGameCompleted?: boolean,
    isGameWon?: boolean,
    hasMistake?: boolean
    isHintRequired?: boolean
}

/**
 * Interface representing the data to update for a user.
 */
interface IUserDataToUpdate {
    currentGameId: null,
    score?: { increment: number },
    avgTime?: number,
    totalGames?: { increment: number },
    difficulty?: string
}

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

/**
 * Handles PATCH request to update a game.
 * @param request - The incoming Next.js request object.
 * @param params - Object containing the game ID to be updated.
 * @returns A NextResponse object with the status and a success or error message.
 */
export async function PATCH(request: NextRequest, { params: { id } }: { params: { id: string } }) {
    try {
        const currentUser = await getCurrentUser() as User;

        if (!currentUser) {
            return NextResponse.json({ message: "You must be logged in to update the game. Please log in and try again." }, { status: 403 });
        }

        if (!id) {
            return NextResponse.json({ message: "Game ID is missing. Please make sure you're accessing the game correctly." }, { status: 400 });
        }

        const body = await request.json();
        const bodyData = getGameDataToUpdate(body);
        const updatedGame = await prisma.game.update({
            where: { id },
            data: bodyData as any
        });

        await handleUpdateUserData(updatedGame, bodyData);
        await handleUserBadgeToUpdate(updatedGame);

        return NextResponse.json({ message: "Game updated successfully." }, { status: 200 });

    } catch (error) {
        const {
            message,
            status
        } = handleAxiosError(error, "Oops! Something went wrong while updating the game. Please try again later.");
        return NextResponse.json({ message }, { status });
    }
}

/**
 * Updates the user's data based on the game completion status.
 * @param game - The game object.
 * @param isGameCompleted - Flag indicating whether the game is completed.
 * @param isGameWon - Flag indicating whether the game is won.
 */
async function handleUpdateUserData(game: Game, { isGameCompleted, isGameWon }: IGameDataToUpdate) {
    if (!isGameCompleted) return;

    const currentUser = await getCurrentUser() as User;
    const updatedUser = await getUserDataToUpdate(currentUser, game, { isGameWon })
    await prisma.user.update({
        where: { id: currentUser.id },
        data: updatedUser as any
    });
}

/**
 * Constructs an object to update game data based on the received parameters.
 * @param filledGrid - The filled grid of the game.
 * @param shownHints - The shown hints in the game.
 * @param usedHiddenHintRights - The number of used hidden hint rights.
 * @param isGameCompleted - Flag indicating whether the game is completed.
 * @param isGameWon - Flag indicating whether the game is won.
 * @param hasMistake - Flag indicating whether the game has a mistake.
 * @returns An object representing the data to update in the game.
 */
function getGameDataToUpdate({
                                 filledGrid,
                                 shownHints,
                                 usedHiddenHintRights,
                                 isGameCompleted,
                                 isGameWon,
                                 hasMistake
                             }: IGameDataToUpdate) {
    const dataToUpdate: IGameDataToUpdate = {};
    if (shownHints !== undefined) dataToUpdate.shownHints = shownHints;
    if (usedHiddenHintRights !== undefined) {
        dataToUpdate.usedHiddenHintRights = usedHiddenHintRights;
        dataToUpdate.isHintRequired = usedHiddenHintRights > 0;
    }
    if (filledGrid !== undefined) dataToUpdate.filledGrid = filledGrid;
    if (isGameCompleted) dataToUpdate.isGameCompleted = isGameCompleted;
    if (isGameWon) dataToUpdate.isGameWon = isGameWon
    if (hasMistake) dataToUpdate.hasMistake = hasMistake

    return dataToUpdate
}
/**
 * Constructs an object to update user data based on game status and user's current state.
 * @param currentUser - The current user object.
 * @param game - The game object.
 * @param isGameWon - Flag indicating whether the game is won.
 * @returns An object representing the data to update for the user.
 */
async function getUserDataToUpdate(currentUser: User, game: Game, { isGameWon }: IGameDataToUpdate) {
    let userData: IUserDataToUpdate = {
        currentGameId: null,
    }

    if (!isGameWon) return userData;

    const userBadges = await getUserBadges();
    const userBadgeIds = userBadges.map(badge => badge.id);
    const newGameTime = game.updatedAt.getTime() - game.createdAt.getTime()
    const avgTime = calculateNewAvgTime(currentUser.avgTime, currentUser.totalGames, newGameTime);
    const avgTimeInSeconds = avgTime / 1000;
    const difficulty = calculateUserDifficulty(currentUser.score + 1, avgTimeInSeconds, userBadgeIds);
    userData = {
        ...userData,
        score: { increment: 1 },
        avgTime: avgTime,
        totalGames: { increment: 1 },
        difficulty
    }

    return userData;
}

/**
 * Handles the creation or updating of badges for the user based on the game's state.
 * @param game - The game object.
 */
async function handleUserBadgeToUpdate(game: Game) {
    const user = await getCurrentUser() as User;
    const badges = await getBadges();
    const userBadges = await getUserBadges();
    const userWonGames = await getUserWonGames();
    const userEarnedBadge = calculateUserEarnedBadge({
        game,
        user,
        userWonGames,
        userBadges,
        badges
    })

    if (userEarnedBadge) {
        await prisma.userBadge.create({
            data: {
                userId: user.id,
                badgeId: userEarnedBadge
            }
        })
    }
}


