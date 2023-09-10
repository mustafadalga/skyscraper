"use client";
import useLoginModal from "@/_store/useLoginModal";
import { useEffect } from "react";

const Page = () => {
    const loginModal = useLoginModal();
    useEffect(() => {
        loginModal.onOpen();
    }, [loginModal])
    return null;
};

export default Page;