"use client";
import { useLeaderBoardStore, Button } from "@/_store/useLeaderBoardStore";
import Link from "next/link";

const EmptyLeaderboardMessage = () => {
    const selectedButton = useLeaderBoardStore(state => state.selectedButton);
    const title = selectedButton == Button.ThisMonth ? "for this month!" : "for this week!"
    return (
        <div className="my-20 text-center grid gap-1 justify-center">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">No leaders yet {title}</h2>
            <p className="text-sm lg:text-base text-center mb-4">Looks like the leaderboard is empty. Be the first one to top the list!</p>
            <Link href="/game"  className="mx-auto w-60 bg-purple-500 text-white px-4 py-2 rounded text-sm lg:text-base rounded-md hover:bg-purple-600 transition">Start a New Game</Link>
        </div>
    );
};

export default EmptyLeaderboardMessage;
