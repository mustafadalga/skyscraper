import { usePathname } from "next/navigation";
import { ReactNode, useCallback } from "react";
import Link from "next/link";

interface Props {
    href: string,
    toggleMenu: () => void,
    children: ReactNode,
    hoverBgColor?: boolean
}



const NavLink = ({ href, toggleMenu, children, hoverBgColor = true }: Props) => {
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

export default NavLink;