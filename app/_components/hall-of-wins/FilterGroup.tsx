import FilterDifficulty from "./FilterDifficulty";
import FilterDimension from "./FilterDimension";
import FilterButtonGroup from "./FilterButtonGroup";

export default function FilterGroup() {
    return (
        <div className="w-full flex flex-col md:flex-row items-end justify-end gap-5 border-b border-purple-400 pb-5">
            <FilterDifficulty/>
            <FilterDimension/>
            <FilterButtonGroup />
        </div>
    );
};