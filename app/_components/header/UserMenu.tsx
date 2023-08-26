import React from 'react';
import Image from "next/image";
import NavLink from "@/_components/header/NavLink";
import { signOut } from "next-auth/react";
import { User } from ".prisma/client";
import { MenuState } from "./types";

interface Props {
    toggleMenu: (menuName: keyof MenuState, status?: boolean) => void,
    currentUser: User,
    menuIsOpen: boolean,
    closeAllMenus: () => void,
}

const UserMenu = ({ toggleMenu, currentUser, menuIsOpen, closeAllMenus }: Props) => {
    return (
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
                className={`${menuIsOpen ? 'grid' : 'hidden'} absolute left-0 sm:left-[initial] w-full sm:w-auto sm:right-0 my-4 z-50 text-base rounded-lg shadow-lg shadow-gray-300`}>
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
    );
};

export default UserMenu;