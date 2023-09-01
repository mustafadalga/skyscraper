import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/_components/header/Header";
import dynamic from "next/dynamic";
import getCurrentUser from "@/_actions/getCurrentUser";
import { User } from ".prisma/client";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LoginModal = dynamic(() => import("@/_components/modals/LoginModal"), { ssr: false });
const ConfirmModal = dynamic(() => import("@/_components/modals/ConfirmModal"), { ssr: false });

const inter = Inter({ subsets: [ 'latin' ] })

export const metadata: Metadata = {
    title: 'Skyscrapers',
    description: 'Skyscrapers',
}

interface Props {
    children: React.ReactNode
}

export default async function RootLayout({ children }: Props) {
    const currentUser: User = await getCurrentUser() as User;
    return (
        <html lang="en">
        <body className={`${inter.className} bg-purple-50 text-gray-900 min-h-screen flex flex-col`}>
        <Header currentUser={currentUser}/>
        <LoginModal/>
        <ConfirmModal/>
        <main className="flex-grow grid">
            {children}
        </main>
        <ToastContainer/>
        </body>
        </html>
    )
}
