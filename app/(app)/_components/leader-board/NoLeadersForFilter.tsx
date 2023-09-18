"use client";
import useLeaderBoardStore from "./useLeaderBoardStore";
import Link from "next/link";
import { TimeFrame } from "@/(app)/_enums";

export default function NoLeadersForFilter() {
    const { timeFrame } = useLeaderBoardStore();
    const title = timeFrame == TimeFrame.ThisMonth ? "for this month!" : "for this week!"
    return (
        <div className="my-20 text-center grid gap-1 justify-center">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">No leaders yet {title}</h2>
            <p className="text-sm lg:text-base text-center mb-4">Looks like the leaderboard is empty. Be the first one
                to top the list!</p>
            <Link href="/game"
                  className="mx-auto w-60 bg-purple-500 text-white px-4 py-2 rounded text-sm lg:text-base rounded-md hover:bg-purple-600 transition">Start
                a New Game</Link>
        </div>
    );
};