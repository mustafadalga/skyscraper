import React from 'react';
import NavLink from "@/_components/header/NavLink";
import { User } from ".prisma/client";
import useLoginModal from "@/_store/useLoginModal";

interface Props {
    closeAllMenus: () => void,
    currentUser: User
}

const HamburgerMenu = ({ closeAllMenus, currentUser }: Props) => {
    const loginModal = useLoginModal();

    return (
        <div className="sm:hidden absolute z-50 bg-purple-800 top-full left-0 right-0 space-y-1 grid">
            <NavLink currentUser={currentUser} toggleMenu={closeAllMenus} href="/" hoverBgColor={false}>
                Home
            </NavLink>
            <NavLink currentUser={currentUser} toggleMenu={closeAllMenus} href="/game" hoverBgColor={false}>
                Play
            </NavLink>
            <NavLink currentUser={currentUser} toggleMenu={closeAllMenus} href="/hall-of-wins" hoverBgColor={false}>
                Hall of Wins
            </NavLink>
            <NavLink currentUser={currentUser} toggleMenu={closeAllMenus} href="/leader-board" hoverBgColor={false}>
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
    );
};

export default HamburgerMenu;