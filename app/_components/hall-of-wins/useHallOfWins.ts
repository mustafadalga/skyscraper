import { create } from 'zustand';
import { Difficulty, TimeFrame } from "@/_enums";
import { User } from ".prisma/client";

interface HallOfWinsStore {
    timeFrame: TimeFrame,
    difficulty: Difficulty | null,
    dimension: number | null,
    user: User | null,
    setUser: (user: User) => void,
    setTimeFrame: (timeFrame: TimeFrame) => void;
    setDifficulty: (difficulty: Difficulty | null) => void;
    setDimension: (dimension: number | null) => void;
    reset: () => void,
}


export default create<HallOfWinsStore>((set, get) => ({
    timeFrame: TimeFrame.All,
    difficulty: null,
    dimension: null,
    user: null,
    setUser: (user: User) => set({ user }),
    setTimeFrame: (timeFrame: TimeFrame) => set({ timeFrame }),
    setDifficulty: (difficulty: Difficulty | null) => set({ difficulty }),
    setDimension: (dimension: number | null) => set({ dimension }),
    reset: () => set({
        timeFrame: TimeFrame.All,
        dimension: null,
        difficulty: null,
        user: null,
    })
}));


