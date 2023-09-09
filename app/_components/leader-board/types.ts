import { Badge, User } from ".prisma/client";

export interface IUser extends User {
    highestBadge: Badge
}