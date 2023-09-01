"use client";
import useLoader from "@/_store/useLoader";
import Loader from "./Loader";

const LoaderV2 = () => {
    const loader = useLoader();

    if (!loader.isOpen) return;

    return <Loader/>
};

export default LoaderV2;