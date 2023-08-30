const GameBoardOptionGroup = () => {
    return (
        <div className="absolute bg-red-300 lg:h-full top-full lg:top-0 lg:right-full px-3 lg:px-0 w-full lg:w-48 grid content-center grid-cols-3 lg:grid-cols-1 gap-3 text-[10px] md:text-xs xl:text-sm text-white">
            <button type="button"
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>Help</span>
            </button>
            <button type="button"
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>Answer</span>
            </button>

            <button type="button"
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>New Game</span>
            </button>

            <button type="button"
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500 hover:bg-purple-600 truncate">
                <span>Finish Game</span>
            </button>
            <button type="button"
                    className="flex items-center justify-center gap-3 px-5 py-1 rounded-md shadow transition-all bg-purple-500  hover:bg-purple-600 truncate">
                <span>Give A Hint</span>
            </button>
        </div>
    );
};

export default GameBoardOptionGroup;