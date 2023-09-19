import { create } from 'zustand';

interface ModalLoginStore {
    isOpen: boolean;
    showClose: boolean;
    onOpen: () => void;
    onClose: () => void;
    setShowClose: (showClose: boolean) => void;
}

export default create<ModalLoginStore>((set) => ({
    isOpen: false,
    showClose: true,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    setShowClose: (showClose) => set({ showClose }),
}));


