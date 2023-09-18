import prisma from "@/(app)/_libs/prismadb"
import { UserBadge, Badge, User } from ".prisma/client";
import { IUser } from "@/(app)/_components/leader-board/types";

interface IUserBadge extends UserBadge {
    badge: Badge
}


export default async function getTop100Users() {
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

async function fetchAllUserBadges(userIds: string[]) {
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

function getUsersBadgeScores(allUserBadges: IUserBadge[], users: IUser[]) {
    const badgeScores: { [key: string]: number } = {};

    allUserBadges.forEach(userBadge => {
        const userId = userBadge.userId;
        const badgePriority = userBadge.badge.priority;
        badgeScores[userId] = (badgeScores[userId] || 0) + badgePriority;
    });

    return badgeScores;
}

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