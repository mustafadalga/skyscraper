"use client";
import useModalLogin from "@/(app)/_store/useModalLogin";
import { useEffect } from "react";

export default function Login() {
    const { onOpen } = useModalLogin();
    useEffect(() => {
        onOpen();
    }, [ onOpen ])
    return null;
};