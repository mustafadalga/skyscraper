import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from "@/_components/header/Header";
import dynamic from "next/dynamic";
import getCurrentUser from "@/_actions/getCurrentUser";
import { User } from ".prisma/client";

const LoginModal = dynamic(() => import("@/_components/modals/LoginModal"), { ssr: false });

const inter = Inter({ subsets: [ 'latin' ] })

export const metadata: Metadata = {
    title: 'Skyscrapers',
    description: 'Skyscrapers',
}

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const currentUser: User = await getCurrentUser() as User;

    return (
        <html lang="en">
        <body className={`${inter.className} bg-purple-100`}>

        <Header currentUser={currentUser}/>
        <LoginModal/>
        {children}
        </body>
        </html>
    )
}
