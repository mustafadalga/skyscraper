import { create } from 'zustand';
import { TimeFrame } from "@/_enums";

interface LeaderBoardStore {
    timeFrame: TimeFrame,
    setTimeFrame: (selectedButton: TimeFrame) => void;
}


export default create<LeaderBoardStore>((set) => ({
    timeFrame: TimeFrame.All,
    setTimeFrame: (timeFrame: TimeFrame) => set({ timeFrame }),
}));


