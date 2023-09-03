import { GiLaurelsTrophy } from "react-icons/gi";
import useGame from "@/_providers/game/useGame";
import { useState, useEffect } from "react";

const TIMEOUT_MS = 1000;
const GameTrophy = () => {
    const { game: { isGameWon } } = useGame();
    const [ showEntrances, setShowEntrances ] = useState(false);

    useEffect(() => {
        let timeoutID: NodeJS.Timeout | null = null;

        if (isGameWon) {
            setShowEntrances(true);

            timeoutID = setTimeout(() => {
                setShowEntrances(false);
            }, TIMEOUT_MS);  // 1 second
        }

        return () => {
            if (timeoutID) {
                clearTimeout(timeoutID);
            }
        };
    }, [ isGameWon ]);

    if (!isGameWon) return null;

    return (
        <div className="absolute top-40">
            <GiLaurelsTrophy
                className={`${showEntrances ? "animate-bounce-in-top" : "animate-pulsate-bck"} text-orange-400 text-7xl lg:text-8xl xl:text-9xl`}/>
        </div>
    );
};

export default GameTrophy;
