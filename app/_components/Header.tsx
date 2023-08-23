"use client";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { signIn, signOut } from 'next-auth/react'
import Link from "next/link";
import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { User } from ".prisma/client";
import loginModal from "@/_components/modals/LoginModal";
import useLoginModal from "@/_store/useLoginModal";

interface Props {
    currentUser: User
}

const Header = ({ currentUser }: Props) => {
    const [ open, setOpen ] = useState(false);
    const pathname = usePathname();
    const loginModal = useLoginModal();
    const linkClassName = useCallback((href: string): string => {
        return (href === pathname) ? "text-white" : "text-gray-300";
    }, [ pathname ])

    return (
        <nav className="bg-purple-800">
            <div className="mx-auto max-w-7xl sm:px-8">
                <div className="relative flex h-16 items-center justify-between gap-3">

                    <div className="flex flex-shrink-0 items-center">
                        <TbBuildingSkyscraper className="text-white text-3xl"/>
                    </div>

                    <div className="hidden sm:flex space-x-4 items-center justify-between w-full ml-5 sm:ml-0">
                        <div className="flex space-x-4">
                            <Link href="/"
                                  className={`${linkClassName("/")} hover:text-white text-sm font-medium`}>
                                Home</Link>
                            <Link href="/leader-board"
                                  className={`${linkClassName("/leader-board")} hover:text-white text-sm font-medium`}>
                                Leader Board
                            </Link>
                        </div>
                        {currentUser ? (
                            <button type="button"
                                    onClick={() => signOut()}
                                    className="text-gray-300 hover:text-white text-sm font-medium">Logout
                            </button>
                        ) : (
                            <button type="button"
                                    onClick={() => loginModal.onOpen()}
                                    className="text-gray-300 hover:text-white text-sm font-medium">Login
                            </button>
                        )}
                    </div>

                    <div className="absolute sm:hidden inset-y-0 right-0 flex items-center">
                        <button type="button"
                                onClick={() => setOpen(!open)}
                                className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                aria-controls="mobile-menu" aria-expanded="false">
                            <span className="sr-only">Open main menu</span>
                            <RxHamburgerMenu/>
                        </button>
                    </div>

                    {open && (
                        <div className="sm:hidden absolute bg-purple-800 top-full left-0 right-0 space-y-1">
                            <Link href="/" className="text-white text-sm font-medium block px-3 py-2 rounded-md"
                                  aria-current="page">Home</Link>
                            <Link href="/leader-board"
                                  className="text-gray-300 hover:bg-purple-600 hover:text-white text-sm font-medium block px-3 py-2 rounded-md">Leader
                                Board</Link>
                            {currentUser ? (
                                <button type="button"
                                        onClick={() => signOut()}
                                        className="text-gray-300 hover:bg-purple-600 hover:text-white text-sm font-medium block px-3 py-2 rounded-md">Logout
                                </button>
                            ) : (
                                <button type="button"
                                        onClick={() => loginModal.onOpen()}
                                        className="text-gray-300 hover:bg-purple-600 hover:text-white text-sm font-medium block px-3 py-2 rounded-md">Logout
                                </button>
                            )}

                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Header;
