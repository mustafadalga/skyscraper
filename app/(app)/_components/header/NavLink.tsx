import { usePathname } from "next/navigation";
import { ReactNode, useCallback } from "react";
import Link from "next/link";
import axios from "axios";
import { User } from ".prisma/client";

interface Props {
    href: string,
    currentUser: User
    toggleMenu: () => void,
    children: ReactNode,
    hoverBgColor?: boolean,
}


const NavLink = ({ href, currentUser, toggleMenu, children, hoverBgColor = true }: Props) => {
    const pathname = usePathname();
    const linkClassName = useCallback((href: string): string => {
        return (href === pathname) ? "text-white" : "text-gray-300";
    }, [ pathname ]);
    const handleGameExit = useCallback(() => {
        if (href == "game" || !currentUser.currentGameId) return;

        try {
            const url = `/api/game/${currentUser.currentGameId}`;
            axios.patch(url, {
                isGameCompleted: true
            });
            return true;

        } catch (error) {
            return false;
        }


    }, [ href, currentUser?.currentGameId ]);
    const onClick = () => {
        toggleMenu();
        handleGameExit();
    };
    return (
        <Link href={href} onClick={onClick}
              scroll={false}
              className={`${linkClassName(href)} text-gray-300 ${hoverBgColor ? 'hover:bg-purple-600' : 'hover:bg-purple-600 sm:hover:bg-transparent'} hover:text-white text-sm font-medium block px-3 py-2 rounded-md`}>
            {children}
        </Link>
    );
};

export default NavLink;