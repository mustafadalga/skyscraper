import useHallOfWins from "./useHallOfWins";

export default function NoGamesForFilter() {
    const { reset } = useHallOfWins();
    return (
        <div className="my-20 text-center grid gap-1 justify-center">
            <h2 className="text-xl lg:text-2xl font-semibold mb-4">No Game Found by your filter!</h2>
            <p className="text-sm lg:text-base text-center mb-4">Try to change your filter</p>
            <button type="button"
                    onClick={reset}
                    className="mx-auto w-60 bg-purple-500 text-white px-4 py-2 rounded text-sm lg:text-base rounded-md hover:bg-purple-600 transition">Remove
                Filter
            </button>
        </div>
    );
};