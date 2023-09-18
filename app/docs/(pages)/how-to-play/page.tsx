import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'How to Solve the Skyscraper Puzzle: A Step-by-Step Guide',
    description: 'Master the Skyscraper Mind Game with our comprehensive step-by-step guide. Learn how to strategically place skyscrapers on a 4x4 grid, understand hints, and solve the puzzle to enhance your logical reasoning skills',
}


export default function Page() {
    return (
        <>
            <h2 className="text-2xl lg:text-3xl text-gray-700 font-semibold ">How to Solve the Skyscraper Puzzle ?</h2>

            <p className="text-base lg:text-lg text-gray-900 mt-5">
                While playing the game, you need to imagine that you are looking at an aerial view of a city block made
                up of
                skyscrapers of different heights. The number in a cell indicates the height of the skyscraper in that
                cell. (For
                example, the number 4 represents a 4-story building). A number outside the grid defines how many
                skyscrapers can be
                seen in that row or column from the perspective of that number.
            </p>

            <p className="text-base lg:text-lg text-gray-900 my-5">
                In real life, we can&apos;t see the buildings behind a tall one in front of us. However, if there is a
                low-rise building
                in front of a high-rise one, we can see both. You need to keep this information in mind when placing the
                numbers.
                That is, the number 1 on the edges means that only one building can be seen from that angle, and the
                number 2 means
                that only two buildings can be seen. To fully understand what we mean, please examine the image below.
            </p>

            <Image src="/images/docs/skyscraper-2d.jpeg"
                   className="w-full max-w-sm my-10"
                   height={166}
                   width={380}
                   alt="Skyscraper Mind Game"/>

            <p className="text-base lg:text-lg text-gray-900">
                In fact, there are no other rules in the game. There may just be some hints. In the skyscraper game, the
                locations
                of tall buildings are generally determined first while solving the puzzles. Noting the possibilities
                inside the
                squares will make your job easier in the skyscraper game, as in many similar types of puzzles. To better
                understand
                the subject, let&apos;s solve an example question.
            </p>


            <h3 className="text-xl lg:text-2xl font-semibold text-gray-700 mt-5 mb-1">How to Play ?</h3>

            <p className="text-base lg:text-lg text-gray-900 mt-5 mb-1">
                To demonstrate how to play, we will solve the example below. The puzzle consists of a 4×4 grid, so the
                numbers
                you&apos;ll use range from 1 to 4. It is advisable to start with the largest number, which in this case is 4.
                This clue
                indicates that you can see all four buildings from that perspective. Therefore, the tallest building
                should be
                placed at the back, making the sequence 1, 2, 3, 4.
            </p>

            <Image src="/images/docs/4x4-game/step-1.png"
                   className="w-full max-w-md my-10"
                   height={448}
                   width={448}
                   alt="Skyscraper Mind Game"/>


            <p className="text-base lg:text-lg text-gray-900">
                In the column at the top labeled as the second column, the hint is 1. There&apos;s only one possibility here
                because the
                hint of 1 on the top side indicates that only one skyscraper can be seen from that angle. Similarly, the
                number 1
                located in the first column from the bottom indicates that only one skyscraper can be seen from below.
                The same
                situation applies to the third row from the right side.
            </p>
            <Image src="/images/docs/4x4-game/step-2.png"
                   className="w-full max-w-md my-10"
                   height={448}
                   width={448}
                   alt="Skyscraper Mind Game"/>


            <p className="text-base lg:text-lg text-gray-900">
                Since each number can only be used once in each row and column, the only place where the number 4 can
                appear in the
                second row is the third column. On the right side, the hint number in the fourth row is 2, meaning that
                only two
                skyscrapers can be seen from that angle. Since there is already a 1-story building in the first column
                of that row,
                only a 3-story building should be placed in the far-right column so that only two skyscrapers can be
                seen.
            </p>
            <Image src="/images/docs/4x4-game/step-3.png"
                   className="w-full max-w-md my-10"
                   height={448}
                   width={448}
                   alt="Skyscraper Mind Game"/>


            <p className="text-base lg:text-lg text-gray-900">
                In the first row, the number 3 cannot be placed in the first column, nor can it be placed in the
                far-right column,
                as two of the same numbers cannot be in the same column. The only place where 3 can be is the third
                column of the
                first row. From the bottom in the third column, in order to see three skyscrapers, the remaining spaces
                must be
                filled with 1 and 2. In this case, the only number that can go into the second column of the bottom row
                is 2.
            </p>
            <Image src="/images/docs/4x4-game/step-4.png"
                   className="w-full max-w-md my-10"
                   height={448}
                   width={448}
                   alt="Skyscraper Mind Game"/>


            <p className="text-base lg:text-lg text-gray-900">
                From the bottom, the hint number in the second column is 3, and already two can be seen. When we try to
                place the
                number 3 in the third row, second column, and the number 1 in the second row, second column, the only
                number that
                can go into the remaining space in the first column of the third row is 1. In the first row, the only
                place where
                the number 1 can go is the fourth column. The remaining space in the first column of the first row then
                gets filled
                with the number 2.
            </p>
            <Image src="/images/docs/4x4-game/step-5.png"
                   className="w-full max-w-md my-10"
                   height={448}
                   width={448}
                   alt="Skyscraper Mind Game"/>


            <p className="text-base lg:text-lg text-gray-900">
                Only two empty cells remain. By placing the number 3 in the first column of the second row and the
                number 2 in the
                fourth column of the second row, we complete the arrangement of the skyscrapers.
            </p>
            <Image src="/images/docs/4x4-game/step-6.png"
                   className="w-full max-w-md my-10"
                   height={448}
                   width={448}
                   alt="Skyscraper Mind Game"/>


            <h2 className="text-xl lg:text-2xl text-purple-700 font-semibold ">Congratulations 🎉 👏. You did!</h2>
        </>
    );
};