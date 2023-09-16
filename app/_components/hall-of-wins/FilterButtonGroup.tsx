import useHallOfWins from "./useHallOfWins";
import { TimeFrame } from "@/_enums";

export default function FilterButtonGroup() {
    const { setTimeFrame } = useHallOfWins();
    return (
        <div className="w-full md:w-auto flex justify-end md:justify-normal gap-4">
            <button type="button"
                    onClick={() => setTimeFrame(TimeFrame.All)}
                    className="flex items-center justify-center gap-3 px-3 md:px-5 py-1 md:py-2 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 text-white text-xs md:text-sm truncate">
                <span>All</span>
            </button>
            <button type="button"
                    onClick={() => setTimeFrame(TimeFrame.ThisMonth)}
                    className="flex items-center justify-center gap-3 px-3 md:px-5 py-1 md:py-2 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 text-white text-xs md:text-sm truncate">
                <span>This Month</span>
            </button>
            <button type="button"
                    onClick={() => setTimeFrame(TimeFrame.ThisWeek)}
                    className="flex items-center justify-center gap-3 px-3 md:px-5 py-1 md:py-2 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 text-white text-xs md:text-sm truncate">
                <span>This Week</span>
            </button>
        </div>
    );
};