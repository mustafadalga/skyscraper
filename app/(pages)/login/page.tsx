"use client";
import useModalLogin from "@/_store/useModalLogin";
import { useEffect } from "react";

const Page = () => {
    const { onOpen } = useModalLogin();
    useEffect(() => {
        onOpen();
    }, [onOpen])
    return null;
};

export default Page;