import prisma from "@/_libs/prismadb";

export interface IScore {
    score: number,
    date: Date
}

export default async function getScoresOverTimeByUserID(userId: string): Promise<IScore[]> {
    try {
        const wonGames = await prisma.game.findMany({
            where: {
                userId,
                isGameWon: true
            },
        });

        return wonGames.map(({ createdAt }, index) => {
            return {
                score: index + 1,
                date: createdAt
            }
        });

    } catch (_) {
        return [];
    }
}