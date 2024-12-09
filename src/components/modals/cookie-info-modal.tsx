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
            <div className="flex flex-row gap-4 bg-base-300 bg-opacity-65 backdrop-blur-xl rounded-xl shadow-lg p-3 relative">
                <Image src={"/assets/icons/cookie.png"} alt="cookie" width={400} height={400} className="w-24 md:w-32 h-24 md:h-32"/>
                <div className="w-full h-full text-white">
                    <span className="text-md font-bold">We use only essential cookies to provide you with the best possible experience on our website.</span>
                    <br/>
                    <p className="text-sm max-w-72 mt-1">Authentication cookies are necessary for secure logins.</p>
                    <div className="m-2 md:m-0 block md:absolute bottom-5 right-5 justify-self-end self-end">
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