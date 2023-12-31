import { Badge, Difficulty } from "@/(app)/_enums";
import getCurrentUser from "@/(app)/_actions/getCurrentUser";
import { Badge as IBadge, User } from ".prisma/client";
import getHighestBadgeByUserId from "@/(app)/_actions/getHighestBadgeByUserId";
import { generateGameBoard } from "@/(app)/_utilities/generateGameBoard";
import prisma from "@/(app)/_libs/prismadb";
import handleAxiosError from "@/(app)/_utilities/handleAxiosError";

/**
 * Interface defining the shape of the game data.
 */
export interface IGameData {
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

/**
 * Generates game data based on provided dimension and difficulty.
 *
 * @param dimension - The dimension of the game board.
 * @param difficulty - The difficulty level of the game.
 * @returns A promise resolving to an IGameData object or null in case of an error.
 */
export async function generateGameData(dimension: number, difficulty: Difficulty): Promise<IGameData | null> {
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

/**
 * Starts a new game by creating a game entry in the database and associating it with the user.
 *
 * @param data - The IGameData object containing all necessary information to start a new game.
 * @returns An object containing the newly created game and updated user, or an error message and status.
 *
 * @throws
 * This function may throw errors related to database access or unexpected issues.
 * These errors are caught and handled by `handleAxiosError`.
 */
export async function startNewGame(data: IGameData) {
    // Define the game creation operation
    try {
        if (!data) {
            throw new Error("We could not start a new game. Please try again!")
        }
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