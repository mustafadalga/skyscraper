"use client";
import { GrFormClose } from "react-icons/gr";
import { signIn } from 'next-auth/react'
import useLoginModal from "@/_store/useLoginModal";
import { useCallback, useEffect, useState } from "react";

const LoginModal = () => {
    const loginModal = useLoginModal();
    const [ showModal, setShowModal ] = useState(loginModal.isOpen);

    useEffect(() => {
        setShowModal(loginModal.isOpen);
    }, [ loginModal.isOpen ]);

    const onToggle = useCallback(() => {
        setShowModal(false);
        setTimeout(() => {
            loginModal.onClose();
        }, 300)

    }, [ loginModal ])

    if (!loginModal.isOpen) {
        return null;
    }

    return (
        <div
            className="fixed bg-neutral-800/70 grid place-items-center inset-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto h-screen w-screen max-h-full">
            <div
                className={`relative bg-white rounded-lg shadow mx-auto max-w-md w-full translate duration-300 ${showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0'}`}>
                <div className="relative bg-white rounded-lg shadow">
                    <button type="button"
                            onClick={onToggle}
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
    );
};

export default LoginModal;