"use client";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { signOut } from 'next-auth/react'
import Link from "next/link";
import { ReactNode, useCallback, useEffect, useReducer, useRef } from "react";
import { usePathname } from "next/navigation";
import { User } from ".prisma/client";
import useLoginModal from "@/_store/useLoginModal";
import Image from "next/image";

interface Props {
    currentUser: User
}

interface MenuState {
    isHamburgerMenuOpen: boolean;
    isUserProfileMenuOpen: boolean;
}

type MenuAction = {
    type: string,
    menuName: keyof MenuState;
    status?: boolean
};

interface NavLinkProps {
    href: string,
    toggleMenu: () => void,
    children: ReactNode,
    hoverBgColor?: boolean
}

const NavLink = ({ href, toggleMenu, children, hoverBgColor = true }: NavLinkProps) => {
    const pathname = usePathname();
    const linkClassName = useCallback((href: string): string => {
        return (href === pathname) ? "text-white" : "text-gray-300";
    }, [ pathname ]);
    return (
        <Link href={href} onClick={toggleMenu}
              className={`${linkClassName(href)} text-gray-300 ${hoverBgColor ? 'hover:bg-purple-600' : 'hover:bg-purple-600 sm:hover:bg-transparent'} hover:text-white text-sm font-medium block px-3 py-2 rounded-md`}>
            {children}
        </Link>
    );
};

const reducer = (state: MenuState, action: MenuAction): MenuState => {
    return {
        ...state,
        [action.menuName]: action.status !== undefined ? action.status : !state[action.menuName]
    };
};
const Header = ({ currentUser }: Props) => {
    const [ menuState, dispatch ] = useReducer(reducer, {
        isHamburgerMenuOpen: false,
        isUserProfileMenuOpen: false
    });
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = (menuName: keyof MenuState, status?: boolean) => {
        dispatch({ type: "", menuName, status });
    };
    const closeAllMenus = useCallback(() => {
        toggleMenu("isHamburgerMenuOpen", false);
        toggleMenu("isUserProfileMenuOpen", false);
    }, [ toggleMenu ]);

    const loginModal = useLoginModal();
    useEffect(() => {
        function handleClickOutside(event: Event) {
            const target = event.target as HTMLDivElement;
            if (menuRef.current && !menuRef.current.contains(target)) {
                closeAllMenus();
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [closeAllMenus]);

    return (
        <nav className="bg-purple-800" ref={menuRef}>
            <div className="mx-auto max-w-7xl sm:px-8">
                <div className="relative flex h-16 items-center px-4 sm:px-0 justify-between gap-3">
                    <div className="flex flex-shrink-0 items-center">
                        <TbBuildingSkyscraper className="text-white text-3xl"/>
                    </div>

                    <div className="hidden sm:flex space-x-4 items-center justify-between w-full ml-5 sm:ml-0">
                        <div className="flex space-x-4">
                            <NavLink href="/" toggleMenu={closeAllMenus} hoverBgColor={false}>
                                Home
                            </NavLink>
                            <NavLink href="/game" toggleMenu={closeAllMenus}  hoverBgColor={false}>
                                Game
                            </NavLink>
                            <NavLink href="/leader-board" toggleMenu={closeAllMenus}  hoverBgColor={false}>
                                Leader Board
                            </NavLink>
                        </div>
                        {!currentUser && (
                            <button type="button"
                                    onClick={() => {
                                        closeAllMenus()
                                        loginModal.onOpen()
                                    }}
                                    className="text-gray-300 hover:text-white text-sm font-medium">Sign In
                            </button>
                        )}
                    </div>

                    <div className="flex gap-3">
                        <div className="sm:hidden inset-y-0 right-4 flex items-center">
                            <button type="button"
                                    onClick={() => {
                                        toggleMenu("isUserProfileMenuOpen", false);
                                        toggleMenu("isHamburgerMenuOpen");
                                    }}
                                    className="relative inline-flex items-center justify-center rounded-md p-2 text-purple-100 hover:bg-purple-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    aria-controls="mobile-menu" aria-expanded="false">
                                <span className="sr-only">Open main menu</span>
                                <RxHamburgerMenu/>
                            </button>
                        </div>

                        {menuState.isHamburgerMenuOpen && (
                            <div className="sm:hidden absolute bg-purple-800 top-full left-0 right-0 space-y-1 grid">
                                <NavLink toggleMenu={closeAllMenus} href="/" hoverBgColor={false}>
                                    Home
                                </NavLink>
                                <NavLink toggleMenu={closeAllMenus} href="/game" hoverBgColor={false}>
                                    Game
                                </NavLink>
                                <NavLink toggleMenu={closeAllMenus} href="/leader-board" hoverBgColor={false}>
                                    Leader Board
                                </NavLink>

                                {!currentUser && (
                                    <button type="button"
                                            onClick={() => {
                                                closeAllMenus();
                                                loginModal.onOpen()
                                            }}
                                            className="text-left text-gray-300 hover:bg-purple-600 hover:text-white text-sm font-medium block px-3 py-2 rounded-md">Sign
                                        In
                                    </button>
                                )}

                            </div>
                        )}

                        {currentUser && (
                            <div className="sm:relative">
                                <button type="button"
                                        onClick={() => {
                                            toggleMenu("isHamburgerMenuOpen", false);
                                            toggleMenu("isUserProfileMenuOpen");
                                        }}
                                        className="ml-auto flex text-sm bg-transparent rounded-full h-8 w-8 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600">
                                    <span className="sr-only">Open user menu</span>
                                    <Image src={currentUser.image as string}
                                           alt={currentUser.name as string}
                                           className="rounded-full"
                                           width={32}
                                           height={32}/>
                                </button>

                                <div
                                    className={`${menuState.isUserProfileMenuOpen ? 'grid' : 'hidden'} absolute left-0 sm:left-[initial] w-full sm:w-auto sm:right-0 my-4 z-50 text-base rounded-lg shadow-lg shadow-gray-300`}>
                                    <div
                                        className="px-4 py-3 text-sm text-gray-300 bg-purple-800 border-b border-gray-300">
                                        <span> {currentUser.name} </span>
                                        <span
                                            className="block truncate dark:text-gray-400">{currentUser.email} </span>
                                    </div>
                                    <div
                                        className="grid overflow-hidden bg-purple-800 rounded-bl-lg rounded-br-lg text-center dark:text-gray-200 dark:hover:text-white text-sm text-gray-700">
                                        <NavLink href="/profile" toggleMenu={closeAllMenus}>
                                            Profile
                                        </NavLink>
                                        <button type="button"
                                                onClick={() => {
                                                    closeAllMenus();
                                                    signOut()
                                                }}
                                                className="text-gray-300 hover:bg-purple-600 hover:text-white text-sm font-medium block px-3 py-2 rounded-md">
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>


                </div>
            </div>
        </nav>
    );
};

export default Header;
