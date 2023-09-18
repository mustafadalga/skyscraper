import { useCallback, useEffect, useState } from "react";
import { Game } from ".prisma/client";
import { IoIosEye } from "react-icons/io"
import useModalGame from "@/(app)/_store/useModalGame";
import useLoader from "@/(app)/_store/useLoader";

export default function GameList({ games }: { games: Game[] }) {
    const { setGame, game, onOpen: onModalOpen } = useModalGame();
    const { onClose, onOpen } = useLoader();
    const [ opacity, setOpacity ] = useState(100);

    const handleDetail = useCallback(async (id: string) => {
        onOpen();
        await setGame(id);
        onClose();
    }, [ setGame, onOpen, onClose ])

    useEffect(() => {
        if (game?.id) {
            onModalOpen();
        }
    }, [ game?.id,onModalOpen ])

    useEffect(() => {
        setOpacity(0);
        const timer = setTimeout(() => setOpacity(100), 300);  // 300 ms matches the duration in Tailwind CSS class
        return () => clearTimeout(timer);
    }, [ games ]);

    return (
        <div className="overflow-x-auto">
            <table className="w-full bg-white text-left text-xs lg:text-sm xl:text-base">
                <thead>
                <tr>
                    <th className="py-2 px-4 border-b">Difficulty</th>
                    <th className="py-2 px-4 border-b">Dimension</th>
                    <th className=" py-2 px-4 border-b">Total Hints</th>
                    <th className="py-2 px-4 border-b">Shown Hints</th>
                    <th className="py-2 px-4 border-b">Used Hint Rights</th>
                    <th className="py-2 px-4 border-b">Has Mistake</th>
                    <th className="py-2 px-4 border-b">Hint Required</th>
                    <th className="py-2 px-4 border-b">Detail</th>
                </tr>
                </thead>

                <tbody>
                {games.map(game => (
                    <tr key={game.id}
                        className={`hover:bg-gray-100 transition-opacity duration-300 ease-in-out ${opacity === 100 ? 'opacity-100' : 'opacity-0'}`}>
                        <td className="py-2 px-4 border-b capitalize">{game.difficulty}</td>
                        <td className="py-2 px-4 border-b">{game.dimension}</td>
                        <td className="py-2 px-4 border-b">{Math.pow(game.dimension, 2)}</td>
                        <td className="py-2 px-4 border-b">{Math.pow(game.dimension, 2) - game.usedHiddenHintRights}</td>
                        <td className="py-2 px-4 border-b">{game.usedHiddenHintRights}</td>
                        <td className="py-2 px-4 border-b">{game.hasMistake ? "Yes" : "No"}</td>
                        <td className="py-2 px-4 border-b">{game.isHintRequired ? "Yes" : "No"}</td>
                        <td className="py-2 px-4 border-b">
                            <IoIosEye
                                onClick={() => handleDetail(game.id)}
                                className="text-xl cursor-pointer text-purple-500"/>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </div>);
};
