import { create } from 'zustand';

interface ModalLoginStore {
    isOpen: boolean;
    onOpen: () => void;
    onClose: () => void;
}

export default create<ModalLoginStore>((set) => ({
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false })
}));


