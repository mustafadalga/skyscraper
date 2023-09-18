"use client";
import { useEffect, useState } from "react";
import { GoStopwatch } from "react-icons/go"

interface Props {
    initialDate: Date,
    isTimerRunning: boolean
}
const INTERVAL_DELAY = 1000;

export default function StopWatch({ initialDate, isTimerRunning }: Props) {
    const initialTimeDifference = Date.now() - initialDate.getTime();
    const [ time, setTime ] = useState(initialTimeDifference);
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    useEffect(() => {
        let intervalID: NodeJS.Timeout;

        if (isTimerRunning) {
            intervalID = setInterval(() => {
                setTime((prevTime) => prevTime + INTERVAL_DELAY);
            }, INTERVAL_DELAY);
        }

        return () => {
            if (intervalID) {
                clearInterval(intervalID);
            }
        };
    }, [ isTimerRunning ]);


    return (
        <div
            className="absolute top-20 w-32 lg:w-40 flex justify-center items-center gap-1 bg-purple-200 border border-purple-400 p-2 rounded text-base xl:text-xl">
            <GoStopwatch className="text-purple-700 text-base lg:text-xl xl:text-2xl"/>
            <span className="text-purple-800">{hours.toString().padStart(2, "0")}</span>
            <span className="text-purple-600">:</span>
            <span className="text-purple-800">{minutes.toString().padStart(2, "0")}</span>
            <span className="text-purple-600">:</span>
            <span className="text-purple-800">{seconds.toString().padStart(2, "0")}</span>
        </div>
    );
}
