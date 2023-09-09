import { Button, useLeaderBoardStore } from "@/_store/useLeaderBoardStore";

const ListOptions = () => {
    const setSelectedButton = useLeaderBoardStore(state => state.setSelectedButton);
    return (
        <div className="flex justify-end gap-4 border-b border-purple-400 p-5">
            <button type="button"
                    onClick={() => setSelectedButton(Button.Top100)}
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 text-white truncate">
                <span className="text-white">Top 100</span>
            </button>
            <button type="button"
                    onClick={() => setSelectedButton(Button.ThisMonth)}
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 text-white truncate">
                <span className="text-white">This Month</span>
            </button>
            <button type="button"
                    onClick={() => setSelectedButton(Button.ThisWeek)}
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 text-white truncate">
                <span>This Week</span>
            </button>
        </div>
    );
};

export default ListOptions;