"use client";
import { TbBuildingSkyscraper } from "react-icons/tb";
import { RxHamburgerMenu } from "react-icons/rx";
import { useCallback, useEffect, useReducer, useRef } from "react";
import { User } from ".prisma/client";
import useLoginModal from "@/_store/useLoginModal";
import NavLink from "./NavLink";
import HamburgerMenu from "@/_components/header/HamburgerMenu";
import UserMenu from "@/_components/header/UserMenu";
import { MenuAction, MenuState } from "./types";

interface Props {
    currentUser: User
}

const reducer = (state: MenuState, action: MenuAction): MenuState => {
    return {
        ...state,
        [action.menuName]: action.status !== undefined ? action.status : !state[action.menuName]
    };
};
const Header = ({ currentUser }: Props) => {
    const loginModal = useLoginModal();
    const [ menuState, dispatch ] = useReducer(reducer, {
        isHamburgerMenuOpen: false,
        isUserProfileMenuOpen: false
    });
    const menuRef = useRef<HTMLDivElement>(null);

    const toggleMenu = useCallback((menuName: keyof MenuState, status?: boolean) => {
        dispatch({ type: "", menuName, status });
    }, []);
    const closeAllMenus = useCallback(() => {
        toggleMenu("isHamburgerMenuOpen", false);
        toggleMenu("isUserProfileMenuOpen", false);
    }, [ toggleMenu ]);

    useEffect(() => {
        function handleClickOutside(event: Event) {
            const target = event.target as HTMLDivElement;
            if (menuRef.current && !menuRef.current.contains(target)) {
                closeAllMenus();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [ closeAllMenus ]);

    return (
        <nav className="bg-purple-800" ref={menuRef}>
            <div className="mx-auto container sm:px-8">
                <div className="relative flex h-16 items-center px-4 sm:px-0 justify-between gap-3">
                    <div className="flex flex-shrink-0 items-center">
                        <NavLink href="/" currentUser={currentUser} toggleMenu={closeAllMenus} hoverBgColor={false}>
                            <TbBuildingSkyscraper className="text-white text-3xl"/>
                        </NavLink>
                    </div>

                    <div className="hidden sm:flex space-x-4 items-center justify-between w-full ml-5 sm:ml-0">
                        <div className="flex space-x-4">

                            {currentUser && (
                                <>
                                    <NavLink currentUser={currentUser} href="/" toggleMenu={closeAllMenus}
                                             hoverBgColor={false}>
                                        Home
                                    </NavLink>
                                    <NavLink currentUser={currentUser} href="/game" toggleMenu={closeAllMenus}
                                             hoverBgColor={false}>
                                        Play
                                    </NavLink></>
                            )}

                            <NavLink currentUser={currentUser} href="/leader-board" toggleMenu={closeAllMenus}
                                     hoverBgColor={false}>
                                Leader Board
                            </NavLink>
                            <NavLink currentUser={currentUser} href="/badges" toggleMenu={closeAllMenus}
                                     hoverBgColor={false}>
                                Badges
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
                            <HamburgerMenu closeAllMenus={closeAllMenus} currentUser={currentUser}/>
                        )}

                        {currentUser && (
                            <UserMenu toggleMenu={toggleMenu}
                                      currentUser={currentUser}
                                      menuIsOpen={menuState.isUserProfileMenuOpen}
                                      closeAllMenus={closeAllMenus}/>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Header;
