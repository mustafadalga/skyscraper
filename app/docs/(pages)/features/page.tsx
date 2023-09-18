import Image from "next/image";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Explore Game Features: Leaderboard, Achievements, User Profiles & More",
    description: "Discover the extensive features of our game, from the competitive Leaderboard rankings to various Achievements and Badges. Get an in-depth look at User Profiles and the Hall of Wins. Learn how you can make the most out of your gaming experience."
}

export default function Page() {
    return (
        <>

            <h2 className="text-2xl lg:text-3xl text-gray-700 font-semibold ">Game Features</h2>
            <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-1">Leaderboard</h3>
            <p className="text-base lg:text-lg text-gray-900">
                A Leaderboard page is available where players can view their rankings. Filters allow you to sort the
                leaderboard by
                time frames such as &apos;This Week,&apos; &apos;This Month,&apos; and &apos;All Time.&apos; The
                leaderboard is limited to the top 100
                players.
            </p>

            <Image src="/images/docs/features/leader-board.png"
                   className="w-full my-10"
                   height={288}
                   width={1024}
                   alt="Leader board"/>


            <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-1">Achievements and Badges</h3>
            <p className="text-base lg:text-lg text-gray-900">
                Players can earn badges through various achievements. Each badge is tied to a specific goal, and there
                are 18
                different goals in total. For a complete list of badges and their associated goals, visit
                <Link href="/badges" className="text-purple-500">our badge page</Link>
            </p>

            <Image src="/images/docs/features/badges.png"
                   className="w-full my-10"
                   height={450}
                   width={1024}
                   alt="Badges"/>

            <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-1">Hall of Wins</h3>
            <p className="text-base lg:text-lg text-gray-900">
                The Hall of Wins page showcases all of your victorious games. You can filter these games by grid
                dimensions,
                difficulty level, and time frames like &apos;This Month,&apos; &apos;This Week,&apos; and &apos;All
                Time.&apos; Additionally, each
                game&apos;s details
                are available for review. Players can also share their completed challenges through a sharable URL
                feature.
            </p>

            <Image src="/images/docs/features/half-of-wins/s-1.png"
                   className="w-full my-10"
                   height={450}
                   width={1024}
                   alt="Hall of Wins"/>

            <Image src="/images/docs/features/half-of-wins/s-2.png"
                   className="w-full my-10"
                   height={450}
                   width={1024}
                   alt="Hall of Wins"/>

            <Image src="/images/docs/features/half-of-wins/s-3.png"
                   className="w-full my-10"
                   height={450}
                   width={1024}
                   alt="Hall of Wins"/>


            <Image src="/images/docs/features/half-of-wins/s-4.png"
                   className="w-full my-10"
                   height={450}
                   width={1024}
                   alt="Hall of Wins"/>


            <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-1">User Profiles</h3>
            <p className="text-base lg:text-lg text-gray-900 my-5">
                Every player has a public profile that tracks various metrics. Here&apos;s what you can find on each
                user
                profile:
            </p>

            <ul className="list-disc text-sm lg:text-base text-gray-900">
                <li>
                    <span className="font-medium">Player Profile Information:</span>
                    <span>Includes the highest badge earned, difficulty levels tackled, longest winning streak, total games played, overall score, average game completion time, average hints used, and date joined.</span>
                </li>
                <li>
                    <span className="font-medium">Achievement Badge Timeline:</span>
                    <span>Visualize when each badge was earned through a chronological timeline.</span>
                </li>
                <li>
                    <span className="font-medium">Win-Loss Ratio:</span>
                    <span>Displayed as a pie chart.</span>
                </li>
                <li>
                    <span className="font-medium">Winning and Losing Streaks</span>
                    <span>Illustrated with a doughnut chart.</span>
                </li>
                <li>
                    <span className="font-medium">List of Earned Badges</span>
                    <span>All your badges in one place.</span>
                </li>
                <li>
                    <span className="font-medium">Score Over Time</span>
                    <span>Tracked through a line chart.</span>
                </li>
                <li>
                    <span className="font-medium">Upcoming Badges</span>
                    <span>Monitor your progress toward new badges with a progress bar.</span>
                </li>
            </ul>

            <Image src="/images/docs/features/user-profile.png"
                   className="w-full my-10"
                   height={450}
                   width={1024}
                   alt="User Profile"/>
        </>
    );
};
