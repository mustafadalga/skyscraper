"use client";
import { useEffect, useState } from "react";
import { GoStopwatch } from "react-icons/go"

export default function StopWatch({ initialDate }: { initialDate: Date }) {
    const initialTimeDifference = Date.now() - initialDate.getTime();
    const SECOND_ONE = 1000;
    const [ time, setTime ] = useState(initialTimeDifference);
    const hours = Math.floor(time / 3600000);
    const minutes = Math.floor((time % 3600000) / 60000);
    const seconds = Math.floor((time % 60000) / 1000);

    useEffect(() => {
        const intervalID = setInterval(() => {
            setTime((prevTime) => prevTime + SECOND_ONE);
        }, SECOND_ONE);

        return () => clearInterval(intervalID);
    }, []);

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
