import { LuDelete } from "react-icons/lu";

interface Props {
    position: {
        x: number,
        y: number
    }
    showContextMenu: boolean,
    dimension: number,
    onMouseLeave: () => void,
    onSelectNumber: (no: number) => void,
    onDeleteNumber: () => void,
}

const CellContextMenu = ({
                             position,
                             dimension,
                             onMouseLeave,
                             onSelectNumber,
                             onDeleteNumber,
                             showContextMenu
                         }: Props) => {

    const numbers = Array.from({ length: dimension });
    const style = {
        left: `${position.x}px`,
        top: `${position.y}px`,
    }
    return (
        <div
            onMouseLeave={onMouseLeave}
            style={style}
            className={`${showContextMenu ? "animate-scale-in-center" : "animate-scale-out-center"} absolute grid grid-cols-3 w-40 md:w-44 lg:w-48 z-10 overflow-hidden shadow-[0px_0px_5px_0px_#7e22ce] rounded-lg bg-gray-700`}>

            {numbers.map((_, index) => (
                <div key={index}
                     onClick={() => onSelectNumber(index + 1)}
                     className="cursor-pointer rounded grid place-items-center h-12 text-white hover:bg-gray-600 text-base lg:text-lg xl:text-xl">{index + 1}</div>
            ))}

            <div className="col-span-3">
                <LuDelete
                    onClick={onDeleteNumber}
                    className="cursor-pointer ml-auto p-2 text-5xl text-red-500 hover:text-red-600"/>
            </div>
        </div>
    );
}

export default CellContextMenu;