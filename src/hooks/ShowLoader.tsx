import Loading from '@/app/loading'
import React, { useState } from 'react'

function useShowLoader(showInitially: boolean = false) {
    const [show, setShow] = useState(showInitially);

    const Loader = () => (show ? <Loading /> : null);

    return { show, setShow, Loader };
}

export default useShowLoader;
