import { Badge, Game, User } from ".prisma/client";
import getBadgesByUserID from "@/_actions/getBadgesByUserID";
import calculateNewAvgTime from "@/_utilities/calculateNewAvgTime";
import calculateUserDifficulty from "@/_utilities/calculateUserDifficulty";
import getCurrentUser from "@/_actions/getCurrentUser";
import getBadges from "@/_actions/getBadges";
import getUserWonGames from "@/_actions/getUserWonGames";
import calculateUserEarnedBadge from "@/_utilities/calculateUserEarnedBadge";
import prisma from "@/_libs/prismadb";
import { NextResponse } from "next/server";


/**
 * Interface representing the data to update for a game.
 */
export interface IGameDataToUpdate {
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
export interface IUserDataToUpdate {
    currentGameId: null,
    score?: { increment: number },
    avgTime?: number,
    totalGames?: { increment: number },
    difficulty?: string,
    winningStreak: { increment: number } | number,
    lossStreak: { increment: number } | number,
    longestWinningStreak?: { increment: number } | number,
}

/**
 * Updates the user's data based on the game completion status.
 * @param user - The user object.
 * @param game - The game object.
 * @param isGameCompleted - Flag indicating whether the game is completed.
 * @param isGameWon - Flag indicating whether the game is won.
 */
export async function handleUpdateUser(user: User, game: Game) {
    const updatedUser = getUserDataToUpdate(user, game)
    await prisma.user.update({
        where: { id: user.id },
        data: updatedUser as any
    });
}


/**
 * Constructs an object to update user data based on game status and user's current state.
 * @param currentUser - The current user object.
 * @param game - The game object.
 * @returns An object representing the data to update for the user.
 */
export async function getUserDataToUpdate(currentUser: User, game: Game) {
    let userData: IUserDataToUpdate = {
        currentGameId: null,
        winningStreak: 0,
        lossStreak: currentUser.lossStreak + 1,
    }

    if (!game.isGameWon) return userData;

    const userBadges = await getBadgesByUserID(currentUser.id);
    const userEarnedBadges = userBadges.map(badge => badge.badge);
    const userBadgeIds = userEarnedBadges.map(badge => badge.id);
    const newGameTime = game.updatedAt.getTime() - game.createdAt.getTime()
    const avgTime = calculateNewAvgTime(currentUser.avgTime, currentUser.totalGames, newGameTime);
    const avgTimeInSeconds = avgTime / 1000;
    const difficulty = calculateUserDifficulty(currentUser.score + 1, avgTimeInSeconds, userBadgeIds);
    userData = {
        ...userData,
        score: { increment: 1 },
        avgTime: avgTime,
        totalGames: { increment: 1 },
        difficulty,
        winningStreak: currentUser.winningStreak + 1,
        lossStreak: 0,
        longestWinningStreak: longestWinningStreak(currentUser)
    }

    return userData;
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
export function getGameDataToUpdate({
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
 * Handles the creation or updating of badges for the user based on the game's state.
 * @param game - The game object.
 * @param currentUser
 */
export async function handleCreateBadge(game: Game) {
    const user = await getCurrentUser() as User;
    const { status, data } = await getBadges();
    if (!status) {
        throw new Error(data as string);
    }
    const userBadgesData = await getBadgesByUserID(user.id);
    const userBadges = userBadgesData.map(badge => badge.badge)
    const userWonGames = await getUserWonGames();
    const userEarnedBadge = calculateUserEarnedBadge({
        game,
        user,
        userWonGames,
        userBadges,
        badges: data as Badge[]
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

export function longestWinningStreak(user: User): number {
    if ((user.winningStreak + 1) > user.longestWinningStreak) {
        return (user.winningStreak + 1)
    }
    return user.longestWinningStreak;
}

export function handleInvalidRequest(currentUser: User, gameId: string) {
    if (!currentUser) {
        return NextResponse.json({ message: "You must be logged in to update the game. Please log in and try again." }, { status: 403 });
    }
    if (!gameId) {
        return NextResponse.json({ message: "Game ID is missing. Please make sure you're accessing the game correctly." }, { status: 400 });
    }
}