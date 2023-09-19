"use client";
import useModalLogin from "@/(app)/_store/useModalLogin";
import { useEffect } from "react";

export default function Login() {
    const { onOpen, setShowClose } = useModalLogin();

    useEffect(() => {
        onOpen();
        setShowClose(false);
    }, [ onOpen, setShowClose ])
    return null;
};