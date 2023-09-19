"use client"

import { useEffect } from 'react'

interface Props {
    error: Error,
    reset: () => void
}

export default function GlobalError({ error, reset, }: Props) {
    useEffect(() => {
        console.error(error);
    }, [ error ]);

    return (
        <main
            className="grid place-items-center p-5 min-h-screen w-full bg-gradient-to-r from-purple-200 to-purple-500 ">

            <section className="grid gap-3 rounded shadow-lg p-5 lg:p-10 xl:px-20 bg-purple-200">
                <h2 className="text-center text-purple-700 font-bold text-4xl lg:text-5xl">Oops! Something went
                    wrong!</h2>

                <p className="text-purple-900 text-base lg:text-lg xl:text-xl mb-5">
                    We&apos;re sorry for the inconvenience. Our team has been notified and is working on a fix.
                </p>
                <p>
                    Error Details:
                </p>
                <code className="text-xs lg:text-sm">{error.message}</code>

                <button type="button"
                        onClick={() => reset()}
                        className="w-full mx-auto sm:w-80 text-white text-center text-sm lg:text-base bg-purple-600 hover:bg-purple-700 transition py-3 px-5 rounded-lg shadow-md hover:shadow-lg">
                    Try Again
                </button>

                <p className="mx-auto text-purple-900 text-xs lg:text-sm xl:text-base mb-5">
                    If the issue persists, please <a href="mailto:veriuretimi01@gmail.com">contact support</a>.
                </p>
            </section>
        </main>
    );
}
