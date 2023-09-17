import prisma from "@/_libs/prismadb";
import handleAxiosError from "@/_utilities/handleAxiosError";

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
        } = handleAxiosError(error, "An error occurred while loading challenge detail. Please try again!");

        return {
            status: false,
            data: message
        }
    }
};