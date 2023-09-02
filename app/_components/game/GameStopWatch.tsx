"use client";
import StopWatch from "@/_components/StopWatch";
import useGame from "@/_providers/game/useGame";

const GameStopWatch = () => {
    const { game: { createdAt, isGameCompleted }, isStopWatchRunning } = useGame();
    if (isGameCompleted || !isStopWatchRunning) return;

    const DELAY_COMPENSATION_MILLISECONDS = 4000;

    let adjustedTime = new Date(new Date(createdAt).getTime() + DELAY_COMPENSATION_MILLISECONDS);
    const currentTime = new Date();
    if (adjustedTime > currentTime) {
        adjustedTime = currentTime;
    }

    return <StopWatch initialDate={adjustedTime}/>
};

export default GameStopWatch;