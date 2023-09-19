import Link from "next/link";
import { TbBuildingSkyscraper } from "react-icons/tb";

export default function NoGameFound() {
    return (
        <div className="relative w-full grid place-items-center p-12">
               <div className="z-10 grid place-items-center text-center gap-5">
                   <h1 className="text-3xl lg:text-4xl xl:text-5xl font-semibold text-purple-900">Looks like challenge is not exist.</h1>
                   <p className="text-xl lg:text-2xl text-purple-700">It might have been moved or deleted.</p>
                   <Link href="/game"
                         className="w-full sm:w-80 text-white text-center text-sm lg:text-base bg-purple-500 hover:bg-purple-600 transition py-3 px-5 rounded-lg shadow-md hover:shadow-lg">
                       Play a new game!
                   </Link>
               </div>

            <TbBuildingSkyscraper className="absolute text-purple-300 text-[20rem] sm:text-[40rem] opacity-25 left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"/>
        </div>
    );
};