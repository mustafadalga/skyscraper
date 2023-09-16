import { create } from 'zustand';
import { Difficulty, TimeFrame } from "@/_enums";


interface HallOfWinsStore {
    timeFrame: TimeFrame,
    difficulty: Difficulty | null,
    dimension: number | null,
    setTimeFrame: (timeFrame: TimeFrame) => void;
    setDifficulty: (difficulty: Difficulty | null) => void;
    setDimension: (dimension: number | null) => void;
    reset: () => void
}


export default create<HallOfWinsStore>((set) => ({
    timeFrame: TimeFrame.All,
    difficulty: null,
    dimension: null,
    setTimeFrame: (timeFrame: TimeFrame) => set({ timeFrame }),
    setDifficulty: (difficulty: Difficulty | null) => set({ difficulty }),
    setDimension: (dimension: number | null) => set({ dimension }),
    reset: () => set({ timeFrame: TimeFrame.All, dimension: null, difficulty: null })
}));


