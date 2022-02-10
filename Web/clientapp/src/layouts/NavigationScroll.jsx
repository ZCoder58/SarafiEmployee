import React from 'react'
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
// ==============================|| NAVIGATION SCROLL TO TOP ||============================== //

export default function NavigationScroll({ children }){
    const location = useLocation();
    const { pathname } = location;
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }, [pathname]);

    return (<>{children}</>);
};
