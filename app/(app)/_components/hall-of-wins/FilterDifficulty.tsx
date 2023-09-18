
import CustomSelect from "@/(app)/_components/Select";
import { difficulties } from "@/(app)/_constants";
import useHallOfWins from "./useHallOfWins";
import { Difficulty } from "@/(app)/_enums";

export default function FilterDifficulty() {
    const { setDifficulty,difficulty } = useHallOfWins();
    return (
        <div className="grid gap-1 w-full md:max-w-sm">
            <label htmlFor="difficulty"
                   className="font-medium text-xs lg:text-sm xl:text-base text-gray-900">Difficulty</label>
            <CustomSelect
                key={difficulty}
                id="difficulty"
                isClearable={true}
                onChange={difficulty => setDifficulty(difficulty?.value as Difficulty)}
                placeholder="Select Difficulty"
                options={difficulties}
                value={difficulties.find(option => option.value === difficulty)}
            />
        </div>
    );
};