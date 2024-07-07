"use client"

import { deleteCookie } from "cookies-next";
import { useEffect } from "react";
import nextConfig from "@/../next.config.mjs";
import { useRouter } from "next/navigation";
import { deleteCookieAction } from "@/actions/cookies";

export default function LogoutPage() {
    const router = useRouter();
    const keyID = nextConfig.env?.userIdCookieKey as string;
    const keySE = nextConfig.env?.userSessionCookieKey as string;
    
    useEffect(() => {
        if (keyID && keySE) {
            localStorage.removeItem("persist:user");
            deleteCookieAction(keyID);
            deleteCookieAction(keySE);
            router.replace('/feed/1');
        }
    }, [keyID, keySE]);

    return <>Logging out...</>
}