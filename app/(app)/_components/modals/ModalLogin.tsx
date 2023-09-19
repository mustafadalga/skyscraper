"use client";
import { GrFormClose } from "react-icons/gr";
import { signIn } from 'next-auth/react'
import { CSSTransition } from 'react-transition-group';
import useModalLogin from "@/(app)/_store/useModalLogin";
import "./modalCSSTransition.css"

const ModalLogin = () => {
    const { isOpen, onClose } = useModalLogin();

    return (
        <CSSTransition
            in={isOpen}
            timeout={300}
            classNames="modal-transition"
            unmountOnExit
        >
            <div
                className="fixed bg-neutral-800/70 grid place-items-center inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-screen w-screen max-h-full">
                <div
                    className="relative bg-white rounded-lg shadow mx-auto max-w-md w-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <button type="button"
                                onClick={onClose}
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="authentication-modal">
                            <GrFormClose/>
                            <span className="sr-only">Close modal</span>
                        </button>
                        <div className="px-6 py-6 lg:px-8">
                            <h3 className="mb-4 text-xl font-medium text-purple-700 text-center">
                                Sign in to Skyscraper</h3>
                            <form className="space-y-6">
                                <button type="button"
                                        onClick={() => signIn("google")}
                                        className="w-full text-white bg-purple-700 hover:bg-purple-700 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                    Sign in/ Register with Google
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </CSSTransition>
    );
};

export default ModalLogin;