import { Game, User, Badge as IBadge } from ".prisma/client";
import { Badge, Difficulty } from "@/(app)/_enums";
import { dimensions } from "@/(app)/_constants";

/**
 * Interface for the input properties required for calculating the user earned badge.
 */
interface Props {
    game: Game,
    user: User,
    badges: IBadge[],
    userBadges: IBadge[],
    userWonGames: Game[]
}

/**
 * Calculates and returns the ID of the badge that the user has earned.
 * @param game - The current game data.
 * @param user - The current user data.
 * @param userWonGames - List of games that the user has won.
 * @param badges - List of all badges.
 * @param userBadges - List of badges the user has earned.
 * @returns Returns the ID of the badge that the user has earned, or null if no badge is earned.
 */
export default function calculateUserEarnedBadge({ game, user, userWonGames, badges, userBadges }: Props) {
    try {
        const sortedBadges: string[] = getSortedBadgeIds(badges);
        const userBadgeIds: string[] = userBadges.map(badge => badge.id);
        for (const badge of sortedBadges) {

            if (hasEarnedBadge(userBadgeIds, badge)) {
                continue;
            }

            if (checkConditionsForBadge(badge, game, user, userWonGames)) {
                return badge;
            }
        }

        return null;

    } catch (error) {
        return null;
    }
}

/**
 * Checks if the conditions for earning a specific badge are met.
 * @param badge - The badge ID to check.
 * @param game - The current game data.
 * @param user - The current user data.
 * @param userGames - List of games that the user has played.
 * @returns Returns true if the conditions for the badge are met, otherwise returns false.
 */
function checkConditionsForBadge(badge: string, game: Game, user: User, userGames: Game[]): boolean {
// Time Thresholds (in seconds)
    const TIME_THRESHOLD_10_MINUTES = 10 * 60;
    const TIME_THRESHOLD_5_MINUTES = 5 * 60;

// Score Thresholds
    const SEASONED_BUILDER_SCORE_THRESHOLD = 50;
    const PUZZLE_MAESTRO_SCORE_THRESHOLD = 100;
    const PUZZLE_VIRTUOSO_SCORE_THRESHOLD = 200;
    const PUZZLE_ADEPT_SCORE_THRESHOLD = 300;
    const PUZZLE_LEGEND_SCORE_THRESHOLD = 400;
    const PUZZLE_OLYMPIAN_SCORE_THRESHOLD = 600;
    const PUZZLE_HERO_SCORE_THRESHOLD = 800;
    const PUZZLE_IMMORTAL_SCORE_THRESHOLD = 1000;

// Count Thresholds
    const COUNT_THRESHOLD_3 = 3;
    const COUNT_THRESHOLD_5 = 5;
    const COUNT_LAST_TEN_GAMES = 10;

// Dimension Thresholds
    const DIMENSION_THRESHOLD_5 = 5;
    const DIMENSION_THRESHOLD_6 = 6;
    const STREAK_BUILDER_DIMENSION_THRESHOLD = 5;

    switch (badge) {
        case Badge.NoviceBuilder:
            return user.score === 0;
        case  Badge.FastBuilder:
            const timeTaken = (game.updatedAt.getTime() - game.createdAt.getTime()) / 1000;
            return (game.difficulty !== Difficulty.EASY) && (game.dimension > DIMENSION_THRESHOLD_5) && (timeTaken < TIME_THRESHOLD_5_MINUTES);
        case Badge.Perfectionist:
            return game.dimension >= DIMENSION_THRESHOLD_5 && !game.hasMistake;
        case Badge.SkyscraperEnthusiast:
            return user.score == 10;
        case Badge.NoHintsNeeded:
            const noHintGames = userGames.filter(game => !game.isHintRequired && game.dimension >= DIMENSION_THRESHOLD_6);
            return noHintGames.length >= COUNT_THRESHOLD_5;
        case Badge.TimeLord:
            const eligibleGamesByDifficulty = {
                [Difficulty.EASY]: 0,
                [Difficulty.MEDIUM]: 0,
                [Difficulty.HARD]: 0,
            };

            for (const difficulty of Object.values(Difficulty)) {
                eligibleGamesByDifficulty[difficulty] = userGames.filter((game: Game) => {
                    const timeTaken = (game.updatedAt.getTime() - game.createdAt.getTime()) / 1000 // Convert to seconds;
                    return (game.difficulty == difficulty) && (timeTaken <= TIME_THRESHOLD_10_MINUTES) && game.dimension >= DIMENSION_THRESHOLD_6;
                }).length;
            }
            return Object.values(eligibleGamesByDifficulty).every(num => num >= COUNT_THRESHOLD_3);
        case Badge.PuzzleExplorer:
            return Object.values(Difficulty).every(difficulty => userGames.find(game => game.difficulty == difficulty && game.dimension >= DIMENSION_THRESHOLD_5));
        case Badge.MasterPlanner:
            return userGames.some(game => game.difficulty == Difficulty.HARD && game.dimension >= DIMENSION_THRESHOLD_6);
        case Badge.PuzzleSolver:
            const dimensionIds = dimensions.map(dimension => dimension.value);
            const hasEachDimension = dimensionIds.every(dimension => userGames.find(game => game.dimension == dimension));
            const hasEachDifficulty = Object.values(Difficulty).every(difficulty => userGames.find(game => game.difficulty == difficulty));
            return hasEachDimension && hasEachDifficulty;
        case Badge.StreakBuilder:
            let consecutiveCount = 0;
            const lastTenGames = userGames.slice(0, COUNT_LAST_TEN_GAMES);
            if (userGames.length < COUNT_LAST_TEN_GAMES) return false;

            for (const game of lastTenGames) {
                if (game.dimension >= STREAK_BUILDER_DIMENSION_THRESHOLD && !game.hasMistake) {
                    consecutiveCount++;
                } else {
                    break;
                }
            }
            return consecutiveCount >= STREAK_BUILDER_DIMENSION_THRESHOLD;
        case Badge.SeasonedBuilder:
            return user.score == SEASONED_BUILDER_SCORE_THRESHOLD;
        case Badge.PuzzleMaestro:
            return user.score == PUZZLE_MAESTRO_SCORE_THRESHOLD;
        case Badge.PuzzleVirtuoso:
            return user.score == PUZZLE_VIRTUOSO_SCORE_THRESHOLD;
        case Badge.PuzzleAdept:
            return user.score == PUZZLE_ADEPT_SCORE_THRESHOLD;
        case Badge.PuzzleLegend:
            return user.score == PUZZLE_LEGEND_SCORE_THRESHOLD;
        case Badge.PuzzleOlympian:
            return user.score == PUZZLE_OLYMPIAN_SCORE_THRESHOLD;
        case Badge.PuzzleHero:
            return user.score == PUZZLE_HERO_SCORE_THRESHOLD;
        case Badge.PuzzleImmortal:
            return user.score == PUZZLE_IMMORTAL_SCORE_THRESHOLD;
        default:
            return false;
    }
}

/**
 * Sorts badges based on their priority and returns the sorted badge IDs.
 * @param badges - List of all badges.
 * @returns Returns an array of sorted badge IDs.
 */
function getSortedBadgeIds(badges: IBadge[]) {
    return badges.sort((firstBadge, secondBadge) => secondBadge.priority - firstBadge.priority).map(badge => badge.id);
}

/**
 * Checks if the user has already earned a specific badge.
 * @param userBadges - List of badges the user has earned.
 * @param earnedBadge - The badge ID to check.
 * @returns Returns true if the user has already earned the badge, otherwise returns false.
 */
function hasEarnedBadge(userBadges: string[], earnedBadge: string): boolean {
    return userBadges.includes(earnedBadge);
}