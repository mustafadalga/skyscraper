import Link from "next/link";

export default function EmptyLeaderBoard() {
    return (
        <div className="my-20 text-center grid gap-1 justify-center">
            <h2 className="text-xl lg:text-2xl text-purple-500 font-semibold mb-4">There is leader yet!</h2>
            <Link href="/game"
                  className="mx-auto w-60 bg-purple-500 text-white px-4 py-2 rounded text-sm lg:text-base rounded-md hover:bg-purple-600 transition">Be First Leader</Link>
        </div>
    );
};