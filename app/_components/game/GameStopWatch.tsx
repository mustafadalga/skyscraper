"use client";
import StopWatch from "@/_components/StopWatch";
import useGame from "@/_providers/game/useGame";

const DELAY_COMPENSATION_MILLISECONDS = 4000;

const GameStopWatch = () => {
    const { game: { createdAt, isGameCompleted }, isTimerRunning } = useGame();

    let adjustedTime = new Date(new Date(createdAt).getTime() + DELAY_COMPENSATION_MILLISECONDS);
    const currentTime = new Date();
    if (adjustedTime > currentTime) {
        adjustedTime = currentTime;
    }

    return <StopWatch initialDate={adjustedTime} isTimerRunning={isTimerRunning && !isGameCompleted}/>
};

export default GameStopWatch;