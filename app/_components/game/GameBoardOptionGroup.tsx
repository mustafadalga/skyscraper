"use client";
import useConfirmModal from "@/_store/useConfirmModal";
import useGame from "@/_providers/game/useGame";
import { HiLightBulb } from "react-icons/hi"

export default function GameBoardOptionGroup() {
    const { giveAHint, showAnswer, game: { usedHiddenHintRights, hiddenHintCount } } = useGame();
    const hasHintRight = hiddenHintCount - usedHiddenHintRights;
    const confirmModal = useConfirmModal();
    const handleGiveAHint = () => {
        if (!hasHintRight) return;

        giveAHint();
    }
    const handleAnswer = () => {
        confirmModal.actionLabel = "Show Answer";
        confirmModal.submitMethod = showAnswer;
        confirmModal.description = "Are you sure to see answer?"
        confirmModal.icon = HiLightBulb;
        confirmModal.secondaryActionLabel = "Close";
        confirmModal.onOpen();
    }
    return (
        <div
            className="absolute lg:h-full top-full lg:top-0 lg:right-[110%] px-3 lg:px-0 w-full lg:w-48 grid content-center grid-cols-3 lg:grid-cols-1 gap-3 text-[10px] md:text-xs xl:text-sm text-white">
            <button type="button"
                    onClick={handleGiveAHint}
                    className={`${hasHintRight ? "bg-purple-500 hover:bg-purple-600" : "bg-purple-400 text-purple-100 cursor-auto"} flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all  truncate`}>
                <span>Give A Hint</span>
            </button>

            <button type="button"
                    onClick={handleAnswer}
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>Answer</span>
            </button>

            <button type="button"
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>New Game</span>
            </button>

            <button type="button"
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>Finish Game</span>
            </button>
            <button type="button"
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>Help</span>
            </button>
        </div>
    );
};
