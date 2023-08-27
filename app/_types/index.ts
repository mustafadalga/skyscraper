import { Badge } from ".prisma/client";

export interface IBadge extends Omit<Badge, "updatedAt" | "createdAt"> {
}

export interface BadgeLevelDetail {
    difficulty: string,
    dimension: number
}

export interface BadgeLevelDetails {
    [key: string]: BadgeLevelDetail
}