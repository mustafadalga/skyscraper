"use client";
import { useCallback, useReducer } from 'react';
import { difficulties, dimensions } from "@/_constants";
import CustomSelect from "@/_components/Select";
import { User } from ".prisma/client";
import { BadgeLevelDetail } from "@/_types";

interface Props {
    currentUser: User,
    defaultOptions: BadgeLevelDetail
}

interface IOptions {
    difficulty: string,
    dimension: number
}

interface Action {
    action: keyof IOptions;
    value: string | number,
    type: string
}

const reducer = (state: IOptions, action: Action): IOptions => {
    return {
        ...state,
        [action.action]: action.value
    };
};

const GameOptions = ({ defaultOptions }: Props) => {
    const [ options, dispatch ] = useReducer(reducer, defaultOptions);
    const setOptions = useCallback((action: keyof IOptions, value: string | number) => {
        dispatch({ type: "", action, value });
    }, []);
    return (
        <section
            className="grid gap-3 sm:w-full sm:max-w-xl mx-8 sm:mx-auto mt-12 p-8 rounded-md transition-all ease-linear shadow-[0px_0px_5px_0px_#d8b4fe] hover:shadow-[0px_0px_10px_0px_#d8b4fe] bg-white">
            <h1 className="text-center text-purple-900 font-bold text-2xl md:text-3xl xl:text-4xl">Game Options</h1>
            {JSON.stringify(options)}
            <div className="grid gap-1">
                <label htmlFor="difficulty"
                       className="font-medium text-xs lg:text-sm xl:text-base text-gray-900">Difficulty</label>
                <CustomSelect
                    id="difficulty"
                    onChange={difficulty => setOptions("difficulty", difficulty?.value || "")}
                    placeholder="Select Difficulty"
                    options={difficulties}
                    value={difficulties.find(option => option.value === options.difficulty)}

                />
            </div>

            <div className="grid gap-1">
                <label htmlFor="dimension"
                       className="font-medium text-xs lg:text-sm xl:text-base text-gray-900">Dimension</label>
                <CustomSelect
                    id="dimension"
                    onChange={dimension => setOptions("dimension", dimension?.value || -1)}
                    placeholder="Select Dimension"
                    options={dimensions}
                    value={dimensions.find(option => option.value === options.dimension)}
                />
            </div>

            <div className="grid mt-10">
                <button
                    className="bg-purple-600 hover:bg-purple-800 transition-all shadow text-white px-5 py-2 rounded-lg">
                    Start Game
                </button>
            </div>
        </section>
    );
};

export default GameOptions;