"use client";
import { AiOutlineClose } from "react-icons/ai";
import { useCallback } from "react";
import { CSSTransition } from "react-transition-group";
import { IconType } from "react-icons";
import useModalConfirm from "@/_store/useModalConfirm";
import "./modalCSSTransition.css"

const ModalConfirm = () => {
    const modalConfirm = useModalConfirm();
    const Icon = modalConfirm.icon as IconType;

    const onSubmit = useCallback(() => {
        modalConfirm.onSubmit();
        modalConfirm.onClose();
    }, [ modalConfirm ]);

    return (
        <CSSTransition
            in={modalConfirm.isOpen}
            timeout={300}
            classNames="modal-transition"
            unmountOnExit>
            <section
                className="fixed bg-neutral-800/70 grid place-items-center inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-screen w-screen max-h-full">
                <div
                    className="relative bg-white rounded-lg shadow mx-auto max-w-md w-full translate duration-300">

                    <div className="relative p-4 text-center bg-white rounded-lg shadow sm:p-5 w-full">
                        <button type="button"
                                onClick={modalConfirm.onClose}
                                className="text-gray-400 absolute top-2.5 right-2.5 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center">
                            <AiOutlineClose/>
                            <span className="sr-only">Close modal</span>
                        </button>

                        <Icon className="text-5xl mx-auto text-purple-500"/>
                        <p className="my-4 text-gray-500">
                            {modalConfirm.description}
                        </p>
                        <div className="flex justify-center items-center space-x-4">
                            <button type="button"
                                    onClick={modalConfirm.onClose}
                                    className="text-sm font-medium text-gray-500 bg-white hover:text-gray-900 focus:ring-primary border-gray-200 hover:bg-gray-100 py-2 px-3 text-center rounded-lg border focus:outline-none">
                                Close
                            </button>
                            <button type="button"
                                    onClick={onSubmit}
                                    className="text-sm font-medium text-white bg-purple-500 hover:bg-purple-600 focus:outline-none focus:ring-primary py-2 px-3 text-center rounded-lg">
                                {modalConfirm.actionLabel}
                            </button>
                        </div>
                    </div>
                </div>
            </section>
        </CSSTransition>
    );
};

export default ModalConfirm;