import useLeaderBoardStore from "./useLeaderBoardStore";
import { TimeFrame } from "@/(app)/_enums";

const ListOptions = () => {
    const { setTimeFrame } = useLeaderBoardStore();
    return (
        <div className="flex mx-auto lg:mx-0 w-full justify-center lg:justify-end gap-4 border-b border-purple-400 pb-5">
            <button type="button"
                    onClick={() => setTimeFrame(TimeFrame.All)}
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 text-white text-xs lg:text-sm truncate">
                <span>Top 100</span>
            </button>
            <button type="button"
                    onClick={() => setTimeFrame(TimeFrame.ThisMonth)}
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 text-white text-xs lg:text-sm truncate">
                <span>This Month</span>
            </button>
            <button type="button"
                    onClick={() => setTimeFrame(TimeFrame.ThisWeek)}
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 text-white text-xs lg:text-sm truncate">
                <span>This Week</span>
            </button>
        </div>
    );
};

export default ListOptions;