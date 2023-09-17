import { create } from 'zustand';
import axios from "axios";
import handleAxiosError from "@/_utilities/handleAxiosError";
import { toast } from "react-toastify";

interface ModalSharedChallengeStore {
    isOpen: boolean;
    url: string,
    onOpen: () => void;
    onClose: () => void;
    createSharedChallengeID: (gameID: string, userID: string) => Promise<void>;
    createURL: (id: string) => void
}

export default create<ModalSharedChallengeStore>((set, get) => ({
    isOpen: false,
    game: null,
    url: "",
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
    createSharedChallengeID: async (gameID: string, userID: string) => {
        try {
            const url = "/api/challenge/share";
            const { data: { challengeID } } = await axios.post(url, {
                gameID,
                userID
            });
            get().createURL(challengeID);
        } catch (error) {
            const { message } = handleAxiosError(error, "Oops! Something went wrong while sharing the challenge. Please try again!");
            toast.error(message)
        }
    },
    createURL: (id: string) => {
        set({ url: `${process.env.NEXT_PUBLIC_API_BASE_URL}/completed-challenge/${id}` })
    }
}))


