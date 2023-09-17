"use client";
import dynamic from 'next/dynamic';
import {  ReactNode } from "react";

interface Props {
    children: ReactNode;
}

const ClientOnly = ({ children }: Props) => {
    return <>{children}</>;
};

export default dynamic(() => Promise.resolve(ClientOnly), {
    ssr: false,
});

