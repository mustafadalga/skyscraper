import { ReactNode } from "react";
import Sidebar from "@/docs/_components/Sidebar";

interface Props {
    children: ReactNode
}

export default async function DocLayout({ children }: Props) {
    return (
        <main className="grid md:grid-cols-12 w-full max-w-7xl mx-auto px-5 py-10 bg-white min-h-screen">
            <div className="mx-auto md:mx-0 md:col-span-2">
                <Sidebar/>
            </div>
            <div className="md:col-span-10 mt-10">
                {children}
            </div>
        </main>
    );
};
