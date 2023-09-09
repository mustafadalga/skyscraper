/**
 * Calculate the new average time for a user after completing a new game.
 *
 * @param oldAvgTime - The current average time stored in the database for the user (in milliseconds).
 * @param totalGames - The total number of games the user has played so far.
 * @param newGameTime - The time taken for the newly completed game (in milliseconds).
 *
 * @returns The new average time for the user (in milliseconds).
 */
export default function calculateNewAvgTime(oldAvgTime: number, totalGames: number, newGameTime: number): number {
    if (oldAvgTime < 0 || totalGames < 0 || newGameTime < 0) {
        throw new Error("Inputs must be non-negative numbers.");
    }
    if (totalGames === 0 && oldAvgTime !== 0) {
        throw new Error("If totalGames is 0, oldAvgTime must also be 0.");
    }

    return Math.round(((oldAvgTime * totalGames) + newGameTime) / (totalGames + 1));
}