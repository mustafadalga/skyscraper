import { useCallback } from "react";
import useModalGame from "@/(app)/_store/useModalGame";
import { AiOutlineClose } from "react-icons/ai";
import { GiHiveMind } from "react-icons/gi"
import { CSSTransition } from 'react-transition-group';

import GameHints from "@/(app)/_components/game/GameHints";
import GameBoard from "@/(app)/_components/game/GameBoard";
import { Game } from ".prisma/client";
import useLoader from "@/(app)/_store/useLoader";
import useModalSharedChallenge from "@/(app)/_store/useModalSharedChallenge";
import useHallOfWins from "@/(app)/_components/hall-of-wins/useHallOfWins";
import { IGame } from "@/(app)/_providers/game/types";
import "./modalCSSTransition.css"

export default function ModalGame() {
    const { onOpen: onLoaderOpen, onClose: onLoaderClose } = useLoader();
    const { isOpen, onClose, game } = useModalGame();
    const { user } = useHallOfWins();
    const { onOpen: onModalSharedChallengeOpen, url, createSharedChallengeID } = useModalSharedChallenge();

    const handleShareChallenge = useCallback(async () => {
        onLoaderOpen();
        await createSharedChallengeID(game?.id as string, user?.id as string);
        onLoaderClose();
        onModalSharedChallengeOpen();
    }, [ game?.id, user?.id, createSharedChallengeID, onLoaderOpen, onLoaderClose, onModalSharedChallengeOpen ])

    const gameData = game as Game;
    let parsedGame;

    if (gameData) {
        parsedGame = {
            ...gameData,
            validGrid: JSON.parse(gameData.validGrid),
            filledGrid: JSON.parse(gameData.filledGrid),
            hints: JSON.parse(gameData.hints),
            shownHints: JSON.parse(gameData.shownHints),
        }
    }

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames="modal-transition"
            unmountOnExit
        >
            <section
                className="fixed bg-neutral-800/70 grid place-items-center inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-screen w-screen max-h-full">
                <div
                    className="relative bg-white rounded-lg shadow mx-auto max-w-7xl w-full">
                    <div className="relative p-12 text-center bg-white w-full rounded shadow-[0px_0px_5px_0px_#7e22ce]">
                        <button type="button"
                                onClick={onClose}
                                className="absolute top-2 right-2 text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <AiOutlineClose/>
                            <span className="sr-only">Close modal</span>
                        </button>

                        {gameData && (
                            <div className="flex justify-center">
                                <div
                                    className="relative grid content-start grid-rows-[48px_auto_48px] grid-cols-[48px_auto_48px] gap-5">
                                    <GameHints game={parsedGame as IGame}/>
                                    <GameBoard game={parsedGame as IGame} hasActions={false}/>
                                </div>
                            </div>
                        )}

                        <button type="button"
                                onClick={handleShareChallenge}
                                className="flex items-center gap-3 mx-auto mt-8 mb-5 bg-purple-600 hover:bg-purple-800 transition-all shadow text-white px-5 py-2 rounded-lg">
                            <GiHiveMind className="text-sm lg:text-base"/>
                            <span>Share My Challenge</span>
                        </button>
                    </div>
                </div>
            </section>
        </CSSTransition>
    );
};