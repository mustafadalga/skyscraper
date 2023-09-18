import Link from "next/link";
import Image from "next/image";

import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Skyscraper Mind Game: Enhance Logical Reasoning and Architectural Skills',
    description: 'Skyscraper Mind Game offers a unique blend of logical challenges and architectural design. Build your virtual skyscraper, enhance your cognitive skills, and dive deep into the world of architecture. Learn how to play today!',
}

export default function Page() {
    return (
        <>
            <h2 className="text-2xl lg:text-3xl text-gray-700 font-semibold ">What is Skyscraper Mind Game ?</h2>
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-1">Introduction</h3>
            <p className="text-base lg:text-lg text-gray-900">
                Welcome to Skyscraper Mind Game—a challenge for your logical thinking and spatial awareness through engaging
                puzzles.
            </p>


            <Image src="/images/docs/7x7-skyscraper.png"
                   className="w-full my-10"
                   height={800}
                   width={1024}
                   alt="Skyscraper Mind Game"/>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-1">Objective</h3>
            <p className="text-base lg:text-lg text-gray-900">
                Construct a virtual skyscraper by following specific rules to sharpen your cognitive skills.
            </p>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-1">Gameplay Phases</h3>
            <ul className="list-disc text-sm lg:text-base text-gray-900">
                <li>
                    <span className="font-medium">Design:</span>
                    <span>Create your skyscraper&apos;s layout.</span>
                </li>
                <li>
                    <span className="font-medium">Construction:</span>
                    <span>Construction: Build it floor by floor, adhering to the rules.</span>
                </li>
                <li>
                    <span className="font-medium">Inspection:</span>
                    <span>Inspection: Validate your skyscraper against the guidelines.</span>
                </li>
            </ul>


            <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-1">Why Play ?</h3>
            <ul className="list-disc text-sm lg:text-base text-gray-900">
                <li>Enhance logical reasoning and problem-solving</li>
                <li>Learn architectural principles</li>
                <li>Enjoy a mentally stimulating game</li>
            </ul>


            <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-1">Conclusion</h3>
            <p className="text-base lg:text-lg text-gray-900">
                Skyscraper Mind Game is more than just a game; it&apos;s a deep dive into architecture and design. Ready to build your
                dream skyscraper?

                <Link href="/docs/how-to-play" className="ml-1">Learn how to play.</Link>
            </p>
        </>
    );
};






