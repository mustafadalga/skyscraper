import './globals.css'
import type { Metadata } from 'next'
import { Roboto } from 'next/font/google'
import Header from "@/_components/header/Header";
import dynamic from "next/dynamic";
import getCurrentUser from "@/_actions/getCurrentUser";
import { User } from ".prisma/client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginModal = dynamic(() => import("@/_components/modals/ModalLogin"), { ssr: false });
const ConfirmModal = dynamic(() => import("@/_components/modals/ModalConfirm"), { ssr: false });
const LoaderV2 = dynamic(() => import("@/_components/loader/LoaderV2"), { ssr: false });

const roboto = Roboto({
    display: "swap",
    weight: [ '100', '300', '400', '500', '700', '900' ],
    subsets: [ "latin" ],
});
export const metadata: Metadata = {
    title: 'Skyscraper Mind Game: Solve the Skyscraper Puzzle and Sharpen Your Mind!',
    description: 'Play Skyscraper Mind Game and fill the grid with numbers that make up your skyscraper landscape. Use hints and logic to see how many skyscrapers are visible from each angle. Are you up for the challenge?',
    keywords: [ "Skyscraper Mind Game", "Puzzle Game", "Logic Game", "Number Puzzle", "Skyscraper Puzzle", "Brain Teasers", "Skyscraper Brain Teaser" ],
    authors: [ { name: "Mustafa Dalga", "url": "https://github.com/mustafadalga/skyscraper" } ],
    icons: [
        {
            rel: "icon",
            type: "image/png",
            sizes: "32x32",
            url: "/favicon-32x32.png"
        },
        {
            rel: "apple-touch-icon",
            sizes: "180x180",
            url: "/apple-touch-icon.png"
        },
        {
            rel: "icon",
            type: "image/png",
            sizes: "16x16",
            url: "/favicon-16x16.png"
        }, {
            rel: "mask-icon",
            url: "/safari-pinned-tab.svg",
            color: "#a855f7"
        }
    ],
    themeColor: "#ffffff",
    applicationName: "Skyscraper Brain Teaser",
}

interface Props {
    children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
    const currentUser: User = await getCurrentUser() as User;
    return (
        <html lang="en">
        <body className={`${roboto.className} bg-purple-50 text-gray-900 min-h-screen flex flex-col`}>
        <Header currentUser={currentUser}/>
        <LoginModal/>
        <ConfirmModal/>
        <LoaderV2/>
        <main className="container mx-auto flex-grow grid">
            {children}
        </main>
        <ToastContainer/>
        </body>
        </html>
    )
}
