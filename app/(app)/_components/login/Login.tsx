"use client";
import { useEffect } from "react";
import useModalLogin from "@/(app)/_store/useModalLogin";

export default function Login() {
    const { onOpen, setShowClose } = useModalLogin();

    useEffect(() => {
        onOpen();
        setShowClose(false);
    }, [ onOpen, setShowClose ])
    return null;
};