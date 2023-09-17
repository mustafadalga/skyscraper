import { useCallback, useEffect, useState } from "react";
import useModalGame from "@/_store/useModalGame";
import { AiOutlineClose } from "react-icons/ai";
import { GiHiveMind } from "react-icons/gi"
import GameHints from "@/_components/game/GameHints";
import GameBoard from "@/_components/game/GameBoard";
import { Game } from ".prisma/client";
import useLoader from "@/_store/useLoader";
import useModalSharedChallenge from "@/_store/useModalSharedChallenge";
import useHallOfWins from "@/_components/hall-of-wins/useHallOfWins";

export default function ModalGame() {
    const { onOpen: onLoaderOpen, onClose: onLoaderClose } = useLoader();
    const { isOpen, onClose, game } = useModalGame();
    const { user } = useHallOfWins();
    const { onOpen: onModalSharedChallengeOpen, url, createSharedChallengeID } = useModalSharedChallenge();
    const [ showModal, setShowModal ] = useState(isOpen);

    const onToggle = useCallback(() => {
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)

    }, [ onClose, setShowModal ]);

    const handleShareChallenge = useCallback(async () => {
        onLoaderOpen();
        await createSharedChallengeID(game?.id as string, user?.id as string);
        onLoaderClose();
        onModalSharedChallengeOpen();
    }, [ game?.id, user?.id, createSharedChallengeID, onLoaderOpen, onLoaderClose, onModalSharedChallengeOpen ])

    useEffect(() => {
        setShowModal(isOpen);
    }, [ isOpen ]);

    if (!isOpen) return null;

    const gameData = game as Game;

    const parsedGame = {
        ...gameData,
        validGrid: JSON.parse(gameData.validGrid),
        filledGrid: JSON.parse(gameData.filledGrid),
        hints: JSON.parse(gameData.hints),
        shownHints: JSON.parse(gameData.shownHints),
    }

    return (
        <section
            className="fixed bg-neutral-800/70 grid place-items-center inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-screen w-screen max-h-full">
            <div
                className={`relative bg-white rounded-lg shadow mx-auto max-w-7xl w-full translate duration-300 ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <div className="relative p-4 text-center bg-white sm:p-5 w-full">
                    <button type="button"
                            onClick={onToggle}
                            className="absolute top-2 right-2 text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <AiOutlineClose/>
                        <span className="sr-only">Close modal</span>
                    </button>
                    <div className="flex justify-center">
                        <div
                            className="relative grid content-start grid-rows-[48px_auto_48px] grid-cols-[48px_auto_48px] gap-5">
                            <GameHints game={parsedGame}/>
                            <GameBoard game={parsedGame} hasActions={false}/>
                        </div>
                    </div>

                    <button type="button"
                            onClick={handleShareChallenge}
                            className="flex items-center gap-3 mx-auto mt-8 mb-5 bg-purple-600 hover:bg-purple-800 transition-all shadow text-white px-5 py-2 rounded-lg">
                        <GiHiveMind className="text-sm lg:text-base"/>
                        <span>Share My Challenge</span>
                    </button>
                </div>
            </div>
        </section>
    );
};