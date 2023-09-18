"use client";
import useModalConfirm from "@/(app)/_store/useModalConfirm";
import useGame from "@/(app)/_providers/game/useGame";
import { HiLightBulb } from "react-icons/hi"

export default function GameBoardOptionGroup() {
    const {
        giveAHint,
        showAnswer,
        newGame,
        finishGame,
        game: {
            usedHiddenHintRights,
            hiddenHintCount,
            isGameCompleted,
        }
    } = useGame();
    const hasHintRight = hiddenHintCount - usedHiddenHintRights;
    const modalConfirm = useModalConfirm();
    const handleGiveAHint = () => {
        if (!hasHintRight || isGameCompleted) return;

        giveAHint();
    }
    const handleShowAnswer = () => {
        if (isGameCompleted) return;

        modalConfirm.actionLabel = "Show Answer";
        modalConfirm.submitMethod = showAnswer;
        modalConfirm.description = "Are you sure to see answer?"
        modalConfirm.icon = HiLightBulb;
        modalConfirm.secondaryActionLabel = "Close";
        modalConfirm.onOpen();
    }
    return (
        <div
            className="absolute lg:h-full top-full min-w-[18.75rem] lg:min-w-0 lg:top-0 lg:right-[110%] px-3 lg:px-0 w-full lg:w-48 grid content-center grid-cols-3 lg:grid-cols-1 gap-3 text-[10px] md:text-xs xl:text-sm text-white">
            <button type="button"
                    onClick={handleGiveAHint}
                    className={`${(hasHintRight && !isGameCompleted) ? "bg-purple-500 hover:bg-purple-600" : "bg-purple-400 text-purple-100 cursor-auto"} flex items-center justify-center gap-3 min-w-[5rem] lg:min-w-0 px-5 py-1 rounded-md shadow transition-all truncate`}>
                <span>Give A Hint</span>
            </button>

            <button type="button"
                    onClick={handleShowAnswer}
                    className={`${isGameCompleted ? "bg-purple-400 text-purple-100 cursor-auto" : "bg-purple-500 hover:bg-purple-600"} "flex items-center justify-center gap-3 min-w-[5rem] lg:min-w-0 px-5 py-1 rounded-md shadow transition-all truncate"`}>
                <span>Answer</span>
            </button>

            <button type="button"
                    onClick={newGame}
                    className="flex items-center justify-center gap-3 px-5 py-1 min-w-[5rem] lg:min-w-0 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>New Game</span>
            </button>

            <button type="button"
                    onClick={finishGame}
                    className="flex items-center justify-center gap-3 px-5 py-1 min-w-[5rem] lg:min-w-0 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>Finish Game</span>
            </button>
            <button type="button"
                    className="flex items-center justify-center gap-3 px-5 py-1 min-w-[5rem] lg:min-w-0 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>Help</span>
            </button>
        </div>
    );
};
