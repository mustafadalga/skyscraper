import prisma from "@/(app)/_libs/prismadb"
import { UserBadge, Badge, User } from ".prisma/client";
import { IUser } from "@/(app)/_components/leader-board/types";

interface IUserBadge extends UserBadge {
    badge: Badge
}

/**
 * Fetches the top 100 users sorted by their score, average time, and badge priority.
 *
 * This function is responsible for fetching the top 100 users from the database, sorting them
 * based on their score, average time, and badge priority, and then returning the sorted list.
 *
 * @returns {Promise<{data: IUser[], status: boolean}|{status: boolean, data: string}>}
 * - A promise that resolves to an object containing the sorted list of top 100 users if successful,
 * or an error message otherwise.
 */
export default async function getTop100Users(): Promise<{ data: IUser[]; status: boolean; } | { status: boolean; data: string; }> {
    try {
        const top100Users: User[] = await prisma.user.findMany({
            where: {
                badges: {
                    some: {}
                }
            },
            orderBy: [
                { score: 'desc' },
                { avgTime: 'asc' },
            ],
            take: 100,
        });

        const users: IUser[] = top100Users.map(user => ({
            ...user,
            highestBadge: {
                priority: 0,
                createdAt: new Date(),
                updatedAt: new Date(),
                id: "0",
                name: "",
                criteria: "",
                description: ""
            }
        }));
        const userIds = users.map(user => user.id);
        const allUserBadges: IUserBadge[] = await fetchAllUserBadges(userIds);
        setUsersHighestBadge(allUserBadges, users);
        const badgeScores = getUsersBadgeScores(allUserBadges, users);
        sortUsers(users, badgeScores);
        return {
            data: users,
            status: true
        }


    } catch (e) {
        return {
            status: false,
            data: "Oops! We couldn't load the leaderboard right now. Please refresh the page or try again later."
        }
    }
}

/**
 * Fetches all badges for a given list of user IDs.
 *
 * @param {string[]} userIds - An array of user IDs.
 * @returns {Promise<IUserBadge[]>} - A promise that resolves to an array of `IUserBadge` objects.
 */
async function fetchAllUserBadges(userIds: string[]): Promise<IUserBadge[]> {
    const allUserBadges: IUserBadge[] = await prisma.userBadge.findMany({
        where: {
            userId: {
                in: userIds,
            },
        },
        include: {
            badge: true,
        },
    });
    return allUserBadges;
}

/**
 * Computes the badge scores for all users.
 *
 * @param {IUserBadge[]} allUserBadges - An array of `IUserBadge` objects.
 * @param {IUser[]} users - An array of `IUser` objects.
 * @returns {{ [key: string]: number }} - An object mapping user IDs to their corresponding badge scores.
 */
function getUsersBadgeScores(allUserBadges: IUserBadge[], users: IUser[]): { [key: string]: number; } {
    const badgeScores: { [key: string]: number } = {};

    allUserBadges.forEach(userBadge => {
        const userId = userBadge.userId;
        const badgePriority = userBadge.badge.priority;
        badgeScores[userId] = (badgeScores[userId] || 0) + badgePriority;
    });

    return badgeScores;
}

/**
 * Sets the highest badge for each user.
 *
 * @param {IUserBadge[]} allUserBadges - An array of `IUserBadge` objects.
 * @param {IUser[]} users - An array of `IUser` objects.
 */
function setUsersHighestBadge(allUserBadges: IUserBadge[], users: IUser[]) {
    const badgeScores: { [key: string]: number } = {};
    const highestBadges: { [key: string]: Badge } = {};


    allUserBadges.forEach(userBadge => {
        const userId = userBadge.userId;
        const badgePriority = userBadge.badge.priority;
        badgeScores[userId] = (badgeScores[userId] || 0) + badgePriority;
        if (!highestBadges[userId] || badgePriority < highestBadges[userId].priority) {
            highestBadges[userId] = userBadge.badge;
        }
    });

    users.forEach(user => {
        user.highestBadge = highestBadges[user.id] || null;
    });
}

/**
 * Sorts the array of users based on their score, average time, and badge priority.
 *
 * @param {IUser[]} users - An array of `IUser` objects.
 * @param {{ [key: string]: number }} badgeScores - An object mapping user IDs to their corresponding badge scores.
 */
function sortUsers(users: IUser[], badgeScores: { [key: string]: number }) {
    users.sort((a, b) => {
        if (a.score !== b.score) {
            return b.score - a.score;
        }
        if (a.avgTime !== b.avgTime) {
            return a.avgTime - b.avgTime;
        }
        return (badgeScores[b.id] || 0) - (badgeScores[a.id] || 0);
    });
}