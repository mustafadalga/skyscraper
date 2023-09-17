import { create } from 'zustand';
import { Game } from ".prisma/client";
import axios from "axios";
import { toast } from "react-toastify";
import handleAxiosError from "@/_utilities/handleAxiosError";
import useHallOfWins from "@/_components/hall-of-wins/useHallOfWins";

interface ModalGameStore {
    isOpen: boolean;
    game: Game | null,
    onOpen: () => void;
    onClose: () => void;
    setGame: (id: string) => Promise<void>
}

export default create<ModalGameStore>((set) => ({
    isOpen: false,
    game: null,
    onOpen: () => set({ isOpen: true }),
    onClose: () =>set({ isOpen: false, game: null }),
    setGame: async (id) => {
        try {
            const userID = useHallOfWins.getState().user?.id;
            const url = `/api/game/${id}`;
            const { data: game } = await axios.get(url, {
                params: {
                    userID
                }
            });
            set({ game });
        } catch (error) {
            const { message } = handleAxiosError(error, "Oops! Something went wrong while loading the game details. Please try again later.");
            toast.error(message)
        }
    }
}))


