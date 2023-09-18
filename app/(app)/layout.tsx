import { ReactNode } from "react";
import dynamic from "next/dynamic";
import { User } from ".prisma/client";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Header from "@/(app)/_components/header/Header";
import getCurrentUser from "@/(app)/_actions/getCurrentUser";

const ModalLogin = dynamic(() => import("@/(app)/_components/modals/ModalLogin"), { ssr: false });
const ModalConfirm = dynamic(() => import("@/(app)/_components/modals/ModalConfirm"), { ssr: false });
const LoaderV2 = dynamic(() => import("@/(app)/_components/loader/LoaderV2"), { ssr: false });


interface Props {
    children: ReactNode
}

export default async function AppLayout({ children }: Props) {
    const currentUser: User = await getCurrentUser() as User;
    return (
        <main className="min-h-screen bg-purple-50 text-gray-900 flex flex-col">
            <Header currentUser={currentUser}/>
            <ModalLogin/>
            <ModalConfirm/>
            <LoaderV2/>
            <main className="container mx-auto flex-grow grid">
                {children}
            </main>
            <ToastContainer/>
        </main>
    );
};
