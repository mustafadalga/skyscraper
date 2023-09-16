import { Badge as IBadge, Game, User } from ".prisma/client";
import { Badge, Difficulty } from "@/_enums";
import { dimensions } from "@/_constants";

/**
 * Interface representing an upcoming badge with its progress.
 */
export interface IUpcomingBadge {
    percent: number;
    id: string;
    name: string;
    description: string;
    criteria: string;
}

/**
 * Interface representing a badge with its score threshold.
 */
export interface IBadgeThreshold {
    id: string;
    threshold: number;
}

/**
 * An array of objects containing badge names and their score thresholds.
 */
const badgeThresholds: IBadgeThreshold[] = [
    { id: Badge.SeasonedBuilder, threshold: 50 },
    { id: Badge.PuzzleMaestro, threshold: 100 },
    { id: Badge.PuzzleVirtuoso, threshold: 200 },
    { id: Badge.PuzzleAdept, threshold: 300 },
    { id: Badge.PuzzleLegend, threshold: 400 },
    { id: Badge.PuzzleOlympian, threshold: 600 },
    { id: Badge.PuzzleHero, threshold: 800 },
    { id: Badge.PuzzleImmortal, threshold: 1000 },
];

/**
 * Calculates upcoming badges for a user based on their game-related activities and score.
 *
 * @param {User} user - The User object containing user details.
 * @param {IBadge[]} userBadges - An array of badges that the user has already earned.
 * @param {IBadge[]} allBadges - An array of all available badges.
 * @param {Game[]} userAllGames - An array of Game objects representing the games the user has played.
 * @returns {IUpcomingBadge[]} An array of upcoming badges for the user.
 */
export default function calculateUpcomingBadges(user: User, userBadges: IBadge[], allBadges: IBadge[], userAllGames: Game[]) {
    const earnedBadgeIds = userBadges.map(badge => badge.id);
    const userWonGames = userAllGames.filter(game => game.isGameWon)
    const upcomingBadges: IUpcomingBadge[] = [];

    // Check and add upcoming badges for various criteria.
    let upcomingBadge: IUpcomingBadge | null = checkNoticeBuilder(earnedBadgeIds, user, userAllGames, allBadges);
    if (upcomingBadge) upcomingBadges.push(upcomingBadge);

    upcomingBadge = checkFastBuilder(earnedBadgeIds, userWonGames, allBadges);
    if (upcomingBadge) upcomingBadges.push(upcomingBadge);

    upcomingBadge = checkPerfectionist(earnedBadgeIds, userWonGames, allBadges);
    if (upcomingBadge) upcomingBadges.push(upcomingBadge);

    upcomingBadge = checkSkyscraperEnthusiast(earnedBadgeIds, user, allBadges);
    if (upcomingBadge) upcomingBadges.push(upcomingBadge);

    upcomingBadge = checkNoHintNeeded(earnedBadgeIds, userWonGames, allBadges);
    if (upcomingBadge) upcomingBadges.push(upcomingBadge);

    upcomingBadge = checkTimeLord(earnedBadgeIds, userWonGames, allBadges);
    if (upcomingBadge) upcomingBadges.push(upcomingBadge);

    upcomingBadge = checkPuzzleExplorer(earnedBadgeIds, userWonGames, allBadges);
    if (upcomingBadge) upcomingBadges.push(upcomingBadge);

    upcomingBadge = checkMasterPlanner(earnedBadgeIds, userWonGames, allBadges);
    if (upcomingBadge) upcomingBadges.push(upcomingBadge);

    upcomingBadge = checkPuzzleSolver(earnedBadgeIds, userWonGames, allBadges);
    if (upcomingBadge) upcomingBadges.push(upcomingBadge);

    upcomingBadge = checkStreakBuilder(earnedBadgeIds, userWonGames, allBadges);
    if (upcomingBadge) upcomingBadges.push(upcomingBadge);

    // Combine with score-based badges.
    return upcomingBadges.concat(checkScoreBasedBadges(earnedBadgeIds, user, badgeThresholds, allBadges));
}


/**
 * Checks and calculates the progress for earning the "NoviceBuilder" badge.
 *
 * The NoviceBuilder badge is earned when the user is new (having a score of 0).
 * If the user has already earned the badge or doesn't meet the criteria, the function returns `null`.
 *
 * @param {string[]} earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param {User} user - The User object containing user details.
 * @param {Game[]} userAllGames - Array of Game objects representing the games the user has played.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge | null} An object containing the percentage of progress and the badge name or `null` if already earned or not applicable.
 */
function checkNoticeBuilder(earnedBadgeIds: string[], user: User, userAllGames: Game[], allBadges: IBadge[]) {
    const SCORE_THRESHOLD = 0;

    if (isBadgeEarned(Badge.NoviceBuilder, earnedBadgeIds) || user.score != SCORE_THRESHOLD) return null;

    const PERCENT_THRESHOLD_50 = 50;
    const PERCENT_THRESHOLD_100 = 100;
    const hasGame = !!userAllGames.length
    const percent = hasGame ? PERCENT_THRESHOLD_50 : PERCENT_THRESHOLD_100;

    return {
        percent,
        ...getBadge(Badge.NoviceBuilder, allBadges)
    }
}

/**
 * Checks and calculates the progress for earning the "FastBuilder" badge.
 *
 * The FastBuilder badge is earned when the user completes a game with dimensions >= 5x5 and difficulty not set to EASY,
 * within a time frame less than or equal to 5 minutes. If the user has already earned the badge, the function returns `null`.
 *
 * @param {string[]} earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param {Game[]} userWonGames - Array of Game objects representing the games the user has won.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge | null} An object containing the percentage of progress and the badge name, or `null` if already earned.
 */
function checkFastBuilder(earnedBadgeIds: string[], userWonGames: Game[], allBadges: IBadge[]) {
    if (isBadgeEarned(Badge.FastBuilder, earnedBadgeIds)) return null;

    const MIN_DIMENSION = 5;
    const DIFFICULTY_THRESHOLD = Difficulty.EASY;
    const TIME_THRESHOLD_5_MINUTES = 5 * 60; // 5 minutes in seconds

    const relevantGames = userWonGames.filter(game =>
        game.difficulty !== DIFFICULTY_THRESHOLD &&
        game.dimension >= MIN_DIMENSION
    );

    if (!relevantGames.length) {
        return { percent: 0, ...getBadge(Badge.FastBuilder, allBadges) }
    }

    const times = relevantGames.map(game =>
        (game.updatedAt.getTime() - game.createdAt.getTime()) / 1000
    );

    const fastestTime = Math.min(...times);

    const percent = (fastestTime / TIME_THRESHOLD_5_MINUTES) * 100;

    return { percent, ...getBadge(Badge.FastBuilder, allBadges) };
}

/**
 * Checks and calculates the progress for earning the "Perfectionist" badge.
 *
 * The Perfectionist badge is earned when the user completes a game with dimensions >= 5x5 without any mistakes.
 * If the user has already earned the badge, the function returns `null`.
 *
 * @param {string[]} earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param {Game[]} userWonGames - Array of Game objects representing the games the user has won.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge | null} An object containing the percentage of progress and the badge name, or `null` if already earned.
 */
function checkPerfectionist(earnedBadgeIds: string[], userWonGames: Game[], allBadges: IBadge[]) {
    if (isBadgeEarned(Badge.Perfectionist, earnedBadgeIds)) return null;

    const MIN_DIMENSION = 5;
    const dimensionCandidates = userWonGames.filter(game => {
        return game.dimension >= MIN_DIMENSION;
    });

    if (!dimensionCandidates.length) {
        return { percent: 0, ...getBadge(Badge.Perfectionist, allBadges) };
    }
    const nonPerfectionistCandidates = dimensionCandidates.filter(game => game.hasMistake);
    const percent = (1 - (nonPerfectionistCandidates.length / dimensionCandidates.length)) * 100;
    return { percent, ...getBadge(Badge.Perfectionist, allBadges) };
}

/**
 * Checks and calculates the progress for earning the "SkyscraperEnthusiast" badge.
 *
 * The SkyscraperEnthusiast badge is earned when the user accumulates a score of 10 or more.
 * If the user has already earned the badge, the function returns `null`.
 *
 * @param earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param user - The User object containing user details such as the score.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge | null} An object containing the percentage of progress and the badge name, or `null` if already earned.
 * */
function checkSkyscraperEnthusiast(earnedBadgeIds: string[], user: User, allBadges: IBadge[]) {
    if (isBadgeEarned(Badge.SkyscraperEnthusiast, earnedBadgeIds)) return null;

    const SCORE_THRESHOLD = 10;
    const percent = (user.score / SCORE_THRESHOLD) * 100;
    return {
        percent,
        ...getBadge(Badge.SkyscraperEnthusiast, allBadges)
    };
}

/**
 * Checks and calculates the progress for earning the "NoHintsNeeded" badge.
 *
 * The NoHintsNeeded badge is earned when the user completes 5 games with dimensions >= 6x6 without requiring any hints.
 * If the user has already earned the badge, the function returns `null`.
 *
 * @param earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param userWonGames - Array of Game objects representing the games the user has won.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge | null} An object containing the percentage of progress and the badge name, or `null` if already earned.
 */
function checkNoHintNeeded(earnedBadgeIds: string[], userWonGames: Game[], allBadges: IBadge[]) {
    if (isBadgeEarned(Badge.NoHintsNeeded, earnedBadgeIds)) return null;

    const MIN_DIMENSION = 6;
    const REQUIRED_COUNT = 5;
    // Filter games that meet the criteria for "No Hints Needed"
    const noHintGames = userWonGames.filter(game => {
        return game.dimension >= MIN_DIMENSION && !game.isHintRequired;
    });
    const percent = (noHintGames.length / REQUIRED_COUNT) * 100;

    return {
        percent,
        ...getBadge(Badge.NoHintsNeeded, allBadges)
    };
}

/**
 * Checks and calculates the progress for earning the "TimeLord" badge.
 *
 * The TimeLord badge is earned when the user completes a game with dimensions >= 6x6
 * within a time frame less than or equal to 10 minutes for at least one game in each difficulty level.
 * If the user has already earned the badge, the function returns `null`.
 *
 * @param earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param userWonGames - Array of Game objects representing the games the user has won.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge | null} An object containing the percentage of progress and the badge name, or `null` if already earned.
 */
function checkTimeLord(earnedBadgeIds: string[], userWonGames: Game[], allBadges: IBadge[]) {
    if (isBadgeEarned(Badge.TimeLord, earnedBadgeIds)) return null;

    const MIN_DIMENSION = 6;
    const TIME_LIMIT = 10 * 60;//10 minutes
    const REQUIRED_COUNT = 1
    // Initialize a counter object for each difficulty level
    const eligibleGamesByDifficulty = Object.values(Difficulty).reduce((acc, difficulty: Difficulty) => {
        acc[difficulty] = 0;
        return acc;
    }, {} as Record<string, number>);

    // Loop through the user's games to count eligible games for each difficulty level
    for (const game of userWonGames) {
        const timeTaken = (new Date(game.updatedAt).getTime() - new Date(game.createdAt).getTime()) / 1000; // Convert to seconds
        if (game.dimension >= MIN_DIMENSION && timeTaken <= TIME_LIMIT) {
            eligibleGamesByDifficulty[game.difficulty]++;
        }
    }

    // Count the number of difficulty levels for which the user has at least one eligible game
    const numEligibleDifficulties = Object.values(Difficulty).filter(
        difficulty => eligibleGamesByDifficulty[difficulty] >= REQUIRED_COUNT
    ).length;

    // Calculate the percentage
    const totalDifficulties = Object.values(Difficulty).length;
    const percent = (numEligibleDifficulties / totalDifficulties) * 100;

    return {
        percent,
        ...getBadge(Badge.TimeLord, allBadges)
    };
}

/**
 * Checks and calculates the progress for earning the "PuzzleExplorer" badge.
 *
 * The PuzzleExplorer badge is earned when the user completes at least one game with dimensions >= 5x5
 * in each difficulty level. If the user has already earned the badge, the function returns `null`.
 *
 * @param earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param userWonGames - Array of Game objects representing the games the user has won.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge | null} An object containing the percentage of progress and the badge name, or `null` if already earned.
 */
function checkPuzzleExplorer(earnedBadgeIds: string[], userWonGames: Game[], allBadges: IBadge[]) {
    if (isBadgeEarned(Badge.PuzzleExplorer, earnedBadgeIds)) return null;

    const MIN_DIMENSION = 5;
    // Initialize an object to keep track of completed difficulties
    const completedDifficulties = Object.values(Difficulty).reduce((acc, difficulty) => {
        acc[difficulty] = false;
        return acc;
    }, {} as Record<string, boolean>);

    // Loop through the user's completed games to check if each difficulty has been completed
    for (const game of userWonGames) {
        if (game.dimension >= MIN_DIMENSION) {
            completedDifficulties[game.difficulty] = true;
        }
    }

    // Calculate the percentage of completion
    const completedCount = Object.values(completedDifficulties).filter(val => val).length;
    const totalDifficulties = Object.values(Difficulty).length;
    const percentCompleted = (completedCount / totalDifficulties) * 100;

    return {
        percent: percentCompleted,
        ...getBadge(Badge.PuzzleExplorer, allBadges)
    };
}

/**
 * Checks and calculates the progress for earning the "MasterPlanner" badge.
 *
 * The MasterPlanner badge is earned when the user completes at least one game with dimensions >= 6x6
 * in HARD difficulty, without using any hints, within the last 5 games.
 * If the user has already earned the badge, the function returns `null`.
 *
 * @param earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param userWonGames - Array of Game objects representing the games the user has won.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge | null} An object containing the percentage of progress and the badge name, or `null` if already earned.
 */
function checkMasterPlanner(earnedBadgeIds: string[], userWonGames: Game[], allBadges: IBadge[]) {
    if (isBadgeEarned(Badge.MasterPlanner, earnedBadgeIds)) return null;

    const MIN_DIMENSION = 6;
    const THRESHOLD_LAST_GAMES = 5

    const candidateGames = userWonGames.filter(game =>
        game.difficulty === Difficulty.HARD &&
        game.dimension >= MIN_DIMENSION
    );
    const recentGames = candidateGames.slice(0, THRESHOLD_LAST_GAMES);
    if (recentGames.length === 0) {
        return { percent: 0, ...getBadge(Badge.MasterPlanner, allBadges) };
    }

    const gamesMeetingCriteria = recentGames.filter(game => !game.isHintRequired).length;
    const percent = (gamesMeetingCriteria / THRESHOLD_LAST_GAMES) * 100;

    return { percent, ...getBadge(Badge.MasterPlanner, allBadges) }
}

/**
 * Checks and calculates the progress for earning the "PuzzleSolver" badge.
 *
 * The PuzzleSolver badge is earned when the user completes a game in each unique combination of dimensions and difficulty levels.
 * If the user has already earned the badge, the function returns `null`.
 *
 * @param earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param userWonGames - Array of Game objects representing the games the user has won.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge | null} An object containing the percentage of progress and the badge name, or `null` if already earned.
 */
function checkPuzzleSolver(earnedBadgeIds: string[], userWonGames: Game[], allBadges: IBadge[]) {
    if (isBadgeEarned(Badge.PuzzleSolver, earnedBadgeIds)) return null;

    const DIMENSION_COUNT = dimensions.length;
    const totalCombinationCount = DIMENSION_COUNT * Object.keys(Difficulty).length;

    // Using a Set to keep track of unique combinations of dimension and difficulty that the user has completed
    const completedCombinations = new Set<string>();

    for (const game of userWonGames) {
        completedCombinations.add(`${game.dimension}-${game.difficulty}`);
    }

    // Calculate the percentage of unique combinations completed
    const completedCombinationCount = completedCombinations.size;
    const percent = (completedCombinationCount / totalCombinationCount) * 100;

    return {
        percent,
        ...getBadge(Badge.PuzzleSolver, allBadges)
    };
}

/**
 * Checks and calculates the progress for earning the "StreakBuilder" badge.
 *
 * The StreakBuilder badge is earned when the user completes 10 consecutive games with dimensions >= 5x5 without any mistakes.
 * If the user has already earned the badge, the function returns `null`.
 *
 * @param earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param userWonGames - Array of Game objects representing the games the user has won.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge | null} An object containing the percentage of progress and the badge name, or `null` if already earned.
 */
function checkStreakBuilder(earnedBadgeIds: string[], userWonGames: Game[], allBadges: IBadge[]) {
    if (isBadgeEarned(Badge.StreakBuilder, earnedBadgeIds)) return null;

    const MIN_DIMENSION = 5;
    const MIN_STREAK = 10;
    const lastTenGames = userWonGames.slice(0, 10);
    // Filter user's games to only include those with dimension >= 5x5
    const eligibleGames = lastTenGames.filter(game => game.dimension >= MIN_DIMENSION);
    const isStreakImpossibleToAchieve = (totalGames: number, currentStreak: number, minStreak: number): boolean => {
        return totalGames - currentStreak < minStreak;
    }
    const countConsecutiveWinsWithoutMistake = (games: Game[], minStreak: number): number => {
        let consecutiveCount = 0;

        for (const game of games) {
            if (!game.hasMistake) {
                consecutiveCount++;
                if (consecutiveCount >= minStreak) {
                    break;  // Exit loop as soon as streak is found
                }
            } else {
                if (isStreakImpossibleToAchieve(games.length, consecutiveCount, minStreak)) {
                    break;  // Exit loop if impossible to reach the minimum streak
                }
                consecutiveCount = 0;  // Reset count if there's a mistake
            }
        }

        return consecutiveCount;
    }

    const consecutiveCount = countConsecutiveWinsWithoutMistake(eligibleGames, MIN_STREAK);
    const percent = (consecutiveCount / MIN_STREAK) * 100;

    return { percent, ...getBadge(Badge.StreakBuilder, allBadges) };
}

/**
 * Checks and calculates the progress for earning various score-based badges.
 *
 * This function is responsible for calculating the progress for all badges that are based solely on the user's score.
 * If the user has already earned a particular score-based badge, or if their score is greater than or equal to the threshold for a badge,
 * then that badge is not included in the returned array.
 *
 * @param {string[]} earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @param {User} user - The User object containing user details such as the score.
 * @param {IBadgeThreshold[]} badgeThresholds - Array of objects containing badge names and their corresponding score thresholds.
 * @param {IBadge[]} allBadges - Array of all available badges.
 * @returns {IUpcomingBadge[]} An array of objects containing the percentage of progress and the badge name for score-based badges.
 */
function checkScoreBasedBadges(earnedBadgeIds: string[], user: User, badgeThresholds: IBadgeThreshold[], allBadges: IBadge[]): IUpcomingBadge[] {
    const upcomingBadges: IUpcomingBadge[] = [];

    badgeThresholds.forEach(({ id, threshold }) => {
        if (user.score < threshold && !isBadgeEarned(id, earnedBadgeIds)) {
            let percent = Math.min((user.score / threshold) * 100, 100);  // Cap at 100%
            upcomingBadges.push({
                percent,
                ...getBadge(id, allBadges)
            });
        }
    });

    return upcomingBadges;
}

/**
 * Checks if a badge has already been earned by the user.
 *
 * @param badgeId - The ID of the badge to check.
 * @param earnedBadgeIds - Array of IDs of badges that the user has already earned.
 * @returns `true` if the badge is already earned; otherwise, `false`.
 */
function isBadgeEarned(badgeId: string, earnedBadgeIds: string[]): boolean {
    return earnedBadgeIds.includes(badgeId);
}


/**
 * Retrieves badge details based on its ID from an array of badges.
 *
 * @param {string} id - The ID of the badge to retrieve.
 * @param {IBadge[]} badges - Array of badges containing badge information.
 * @returns {IUpcomingBadge} An object containing badge details, including ID, name, description, and criteria.
 */
function getBadge(id: string, badges: IBadge[]) {
    const badge = badges.find(badge => badge.id === id);
    return {
        id: badge?.id || "",
        name: badge?.name || "",
        description: badge?.description || "",
        criteria: badge?.criteria || ""
    }
}