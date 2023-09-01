import { BadgeLevelDetail, IBadge } from "@/_types";
import { User } from ".prisma/client";
import { badgeLevelDetails, difficulties, dimensions } from "@/_constants";

/**
 * Upgrade the difficulty and dimension settings for the game.
 *
 * @param defaults - Current difficulty and dimension settings.
 * @returns New difficulty and dimension settings.
 */
function upgradeDifficulty(defaults: BadgeLevelDetail): BadgeLevelDetail {
    const difficultyList: string[] = difficulties.map(difficulty => difficulty.value);
    const dimensionList: number[] = dimensions.map(dimension => dimension.value);
    const currentDifficulty = defaults.difficulty;
    const currentDimension = defaults.dimension;

    const newDifficultyIndex: number = Math.min(difficultyList.indexOf(currentDifficulty) + 1, difficulties.length - 1);
    const newDimensionIndex: number = Math.min(dimensionList.indexOf(currentDimension) + 1, dimensions.length - 1);

    return {
        difficulty: difficultyList[newDifficultyIndex],
        dimension: dimensionList[newDimensionIndex]
    };
}

/**
 * Downgrade the difficulty and dimension settings for the game.
 *
 * @param defaults - Current difficulty and dimension settings.
 * @returns New difficulty and dimension settings.
 */
function downgradeDifficulty(defaults: BadgeLevelDetail): BadgeLevelDetail {
    const difficultyList: string[] = difficulties.map(difficulty => difficulty.value);
    const dimensionList: number[] = dimensions.map(dimension => dimension.value);
    const currentDifficulty = defaults.difficulty;
    const currentDimension = defaults.dimension;

    const newDifficultyIndex = Math.max(difficultyList.indexOf(currentDifficulty) - 1, 0);
    const newDimensionIndex = Math.max(dimensionList.indexOf(currentDimension) - 1, 0);

    return {
        difficulty: difficultyList[newDifficultyIndex],
        dimension: dimensionList[newDimensionIndex]
    };
}

/**
 * Retrieve the ID of the newest badge earned by the user.
 *
 * @param badges - List of all badges.
 * @param userBadges - List of badges earned by the user.
 * @returns ID of the newest badge.
 */
function getUserNewestBadgeID(badges: IBadge[], userBadges: IBadge[]): string {
    let newestBadgePriority = 16; // Default to 16 if no badges are found
    if (userBadges.length) {
        newestBadgePriority = Math.min(...userBadges.map(item => item.priority));
    }

    const newestBadge = badges.find(badge => badge.priority === newestBadgePriority)!
    return newestBadge.id
}

/**
 * Determine default game settings based on user's badge, score, and average time.
 *
 * @param badges - List of all badges.
 * @param userBadges - List of badges earned by the user.
 * @param currentUser - User for whom the settings are being determined.
 * @returns New difficulty and dimension settings.
 */
export default function getDefaultGameSettings(badges: IBadge[], userBadges: IBadge[], currentUser: User): BadgeLevelDetail {
    const userNewestBadgeID: string = getUserNewestBadgeID(badges, userBadges);
    let defaults: BadgeLevelDetail = badgeLevelDetails[userNewestBadgeID];

    // Check if user is new (no badges, no average time)
    if (!userBadges.length && !currentUser.avgTime) {
        return defaults;
    }

    const minutes5 = 60 * 5;
    const minute15 = 60 * 15;
    if (currentUser.avgTime < minutes5) {  // less than 5 minutes
        // make it a bit more challenging
        defaults = upgradeDifficulty(defaults);
    } else if (currentUser.avgTime > minute15) {  // more than 15 minutes
        // make it a bit easier
        defaults = downgradeDifficulty(defaults);
    }

    // Adjust based on user score
    if (currentUser.score > 1000) {
        defaults = upgradeDifficulty(defaults);
    } else if (currentUser.score < 200) {
        defaults = downgradeDifficulty(defaults);
    }
    return defaults;
}