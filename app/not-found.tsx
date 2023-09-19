import Link from "next/link";

export default function NotFound() {
    return (
        <main className="grid place-items-center p-5 min-h-screen w-full bg-gradient-to-r from-purple-200 to-purple-500 ">

            <section className="grid gap-3 rounded shadow-lg p-5 lg:p-10 xl:px-20 bg-purple-200">
                <h1 className="text-center text-purple-700 font-bold text-8xl lg:text-9xl 2xl:text-[15rem]">404</h1>

                <p className="text-purple-900 text-base lg:text-xl xl:text-2xl mb-5">
                    Oops! The page you are looking for does not exist. It might have been moved or deleted.
                </p>

                <Link href="/"
                      className="w-full mx-auto sm:w-80 text-white text-center text-sm lg:text-base bg-purple-600 hover:bg-purple-700 transition py-3 px-5 rounded-lg shadow-md hover:shadow-lg">
                    Home
                </Link>
            </section>
        </main>
    )
}