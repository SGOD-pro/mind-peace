"use client"
import Loading from "@/app/loading";
import { useState } from "react";


function useShowLoader(showInitially: boolean = false) {
    const [show, setShow] = useState(showInitially);

    const Loader = () => {
        return show ? <Loading /> : null;
    };

    return { show, setShow, Loader };
}

export default useShowLoader;
