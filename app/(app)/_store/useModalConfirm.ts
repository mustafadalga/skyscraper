import { create } from 'zustand';
import { IconType } from "react-icons";

interface ModalConfirmStore {
    isOpen: boolean;
    description: string,
    actionLabel: string,
    secondaryActionLabel: string,
    icon: IconType | null,
    submitMethod: Function,
    onOpen: () => void;
    onClose: () => void;
    onSubmit: () => void;
}


export default create<ModalConfirmStore>((set) => ({
    isOpen: false,
    description: "",
    actionLabel: "",
    secondaryActionLabel: "Close",
    submitMethod: () => {
    },
    icon: null,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    onSubmit: () => {
        set((state: ModalConfirmStore): ModalConfirmStore => {
            state.submitMethod();
            return state
        });
    },
}));

