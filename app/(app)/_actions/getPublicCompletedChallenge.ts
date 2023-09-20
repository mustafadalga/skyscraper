import prisma from "@/(app)/_libs/prismadb";
import handleAxiosError from "@/(app)/_utilities/handleAxiosError";

export interface Game {
    id: string;
    difficulty: string;
    isGameWon: boolean;
    dimension: number;
    shownHints: string;
    filledGrid: string;
}

export interface IReturn {
    status: boolean,
    data: Game | string | null,
}

/**
 * Fetches the details of a public completed challenge by its ID.
 *
 * This function queries the Prisma database to find a shared challenge with the given ID.
 * If found, it returns the details of the associated game.
 *
 * @param {string} id - The ID of the shared challenge to be fetched.
 *
 * @returns {Promise<IReturn>} - A promise that resolves to an object containing the status and data.
 *   - status: `true` if the game details were fetched successfully, `false` otherwise.
 *   - data: A `Game` object if successful, or an error message string.
 *
 * @throws Will return an object with `status: false` and an error message if the query fails.
 */
export default async function getPublicCompletedChallenge(id: string): Promise<IReturn> {
    try {
        const result = await prisma.sharedChallenge.findUnique({
            where: {
                id
            },
            select: {
                game: {
                    select: {
                        id: true,
                        difficulty: true,
                        isGameWon: true,
                        dimension: true,
                        shownHints: true,
                        filledGrid: true,
                    }
                }
            }
        });

        let game: Game | null = null;
        if (result?.game) {
            game = result.game;
        }

        return {
            data: game,
            status: true
        };

    } catch (error) {
        const {
            message,
        } = handleAxiosError(error, "Oops! Something went wrong while loading the challenge. Please try again!");

        return {
            status: false,
            data: message
        }
    }
};