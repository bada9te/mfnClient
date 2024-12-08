"use client"
import Image from "next/image"
import MainButton from "../common/main-button/main-button";
import { useEffect, useState } from "react";

export default function WeAreUsingCookiesModal() {
    const [isMounted, setIsMounted] = useState(false);

    const handleCookieOk = () => {
        localStorage.setItem("cookie-ok", "ok");
        setIsMounted(false);
    }

    useEffect(() => {
        const cookieOk = localStorage.getItem("cookie-ok");
        if (!cookieOk) {
            setIsMounted(true);
        }
    }, []);

    if (!isMounted) {
        return;
    }

    return (
        <div 
            className="
                fixed bottom-16 md:bottom-20 
                md:left-10 w-full md:w-[600px] 
                h-fit z-50 p-3 md:p-0
                translate-x-[50%] md:translate-x-0 -left-1/2 
            "
        >
            <div className="flex flex-row gap-4 bg-base-300 bg-opacity-65 backdrop-blur-xl rounded-xl shadow-lg p-3">
                <Image src={"/assets/icons/cookie.png"} alt="cookie" width={400} height={400} className="w-24 md:w-32 h-24 md:h-32"/>
                <div className="w-full h-full text-white">
                    <span className="text-lg font-bold">We use cookies to ensure you get the best experience on our website.</span>
                    <br/>
                    <span className="text-sm">Authentication cookies are necessary for secure logins.</span>
                    <div className="w-full flex justify-end p-2 pt-3">
                        <MainButton
                            handler={handleCookieOk}
                            color="primary"
                            width="80px"
                            height="20px"
                        >
                            Ok
                        </MainButton>
                    </div>
                </div>
            </div>
        </div>
    );
}