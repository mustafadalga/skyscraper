import { create } from 'zustand';

export enum Button {
    Top100,
    ThisMonth,
    ThisWeek
}

interface LeaderBoardStore {
    selectedButton: Button,
    setSelectedButton: (selectedButton: Button) => void;
}


export const useLeaderBoardStore = create<LeaderBoardStore>((set) => ({
    selectedButton: Button.Top100,
    setSelectedButton: (selectedButton: Button) => set({ selectedButton }),
}));


