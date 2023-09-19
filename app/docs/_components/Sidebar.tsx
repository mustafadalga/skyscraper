"use client";
import Link from 'next/link';
import { TbBuildingSkyscraper } from "react-icons/tb";
import { usePathname } from "next/navigation";

const Sidebar = () => {
    const pathname = usePathname();
    const linkClassName = (href: string): string => {
        return (href === pathname) ? "text-gray-900" : "text-gray-500";
    }


    return (
        <div className=" w-full grid place-content-start w-40">
            <Link href="/" className="flex gap-3 items-center border-b border-purple-500 pb-3">
                <TbBuildingSkyscraper className="text-purple-500 text-base lg:text-lg xl:text-xl"/>
                <h3 className="text-base lg:text-xl text-gray-800">Skyscraper</h3>
            </Link>
            <ul className="my-10 grid gap-1">
                <li>
                    <Link
                        className={`${linkClassName("/docs/skyscraper")} transition hover:text-gray-900`}
                        href="/docs/skyscraper">Introduction</Link>
                </li>
                <li>
                    <Link className={`${linkClassName("/docs/how-to-play")} transition hover:text-gray-900`}
                          href="/docs/how-to-play">How to Play</Link>
                </li>
                <li>
                    <Link className={`${linkClassName("/docs/features")} transition hover:text-gray-900`}
                          href="/docs/features">Features</Link>
                </li>
            </ul>
        </div>
    );
};

export default Sidebar;
