import CustomSelect from "@/_components/Select";
import { dimensions } from "@/_constants";
import useHallOfWins from "./useHallOfWins";

export default function FilterDimension() {
    const { dimension, setDimension } = useHallOfWins();
    return (
        <div className="grid gap-1 w-full md:max-w-sm">
            <label htmlFor="dimension"
                   className="font-medium text-xs lg:text-sm xl:text-base text-gray-900">Dimension</label>
            <CustomSelect
                key={dimension}
                id="dimension"
                isClearable={true}
                onChange={dimension => setDimension(dimension?.value as number)}
                placeholder="Select Dimension"
                options={dimensions}
                value={dimensions.find(option => option.value === dimension)}
            />
        </div>
    );
};