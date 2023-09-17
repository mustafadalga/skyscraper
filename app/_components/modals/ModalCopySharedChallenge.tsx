import { useCallback, useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { FaCopy } from "react-icons/fa"
import useModalSharedChallenge from "@/_store/useModalSharedChallenge";
import IconAvatarGroup from "@/_components/icons/IconAvatarGroup";

export default function ModalCopySharedChallenge() {
    const { isOpen, onClose, url } = useModalSharedChallenge();
    const [ showModal, setShowModal ] = useState(isOpen);
    const onToggle = useCallback(() => {
        setShowModal(false);
        setTimeout(() => {
            onClose();
        }, 300)

    }, [ onClose, setShowModal ]);
    const handleCopyURL = useCallback(async () => {
        await navigator.clipboard.writeText(url);
        onToggle();
    }, [ url, onToggle ])

    useEffect(() => {
        setShowModal(isOpen);
    }, [ isOpen ]);


    if (!isOpen) return null;

    return (
        <section
            className="fixed bg-neutral-800/70 grid place-items-center inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-screen w-screen max-h-full">
            <div
                className={`relative bg-white rounded-lg shadow mx-auto max-w-7xl w-full translate duration-300 ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <div className="relative p-5 py-10 text-center bg-white w-full">
                    <button type="button"
                            onClick={onToggle}
                            className="absolute top-2 right-2 text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                        <AiOutlineClose/>
                        <span className="sr-only">Close modal</span>
                    </button>

                    <div>

                        <div className="flex justify-center w-full">
                            <IconAvatarGroup/>
                        </div>
                        <h1
                            className="mt-5 font-bold text-center text-2xl text-purple-500 lg:text-3xl xl:text-4xl 2xl:text-4xl">
                            Share your challenge with everybody!
                        </h1>

                        <p className="font-normal text-purple-400 text-center text-sm lg:text-sm 2xl:text-base my-3">
                            Anyone with this link can view your challenge.
                        </p>

                        <div className="mt-10 flex items-center flex-col md:flex-row gap-2.5">
                            <div
                                className="grid place-items-center py-2 h-fit md:py-0 md:h-10 lg:h-12 w-full px-4 border border-solid border-purple-500 rounded-md">
                            <span className="font-switzer font-medium text-purple-500 text-xs lg:text-sm truncate">
                              {url}
                            </span>
                            </div>
                            <button
                                type="button"
                                onClick={handleCopyURL}
                                className="grid place-items-center relative bg-purple-500 rounded h-10 lg:h-12 w-10 lg:w-12
                            cursor-pointer">
                                <FaCopy
                                    className="w-3 h-3 lg:w-4 lg:h-4 text-white"/>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
};