const LeaderBoardError = () => {
    return (
        <div className="my-20 text-center grid gap-1 justify-center">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">Oops! Something went wrong.</h2>
            <p className="text-sm lg:text-base text-center mb-4">We We couldn&apos;t load the leaderboard. Please try refreshing the
                page.</p>
            <button className="mx-auto w-60 bg-purple-500 text-white px-4 py-2 rounded text-sm lg:text-base rounded-md hover:bg-purple-600 transition" onClick={() => location.reload()}>Refresh
            </button>
        </div>
    );
};

export default LeaderBoardError;
