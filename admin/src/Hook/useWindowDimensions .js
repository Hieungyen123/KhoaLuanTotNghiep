import { useState, useEffect } from 'react';

function getWindowDimensions() {
    const { innerWidth: width, innerHeight: height } = window;
    return {
        width,
        height
    };
}

export default function useWindowDimensions() {
    function handleResize() {
        setTimeout(() => {
            setWindowDimensions(getWindowDimensions());
        }, 1500)

    }
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
    useEffect(() => {

        handleResize()

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);



    }, []);
    return windowDimensions;
}