"use client"

import { deleteCookie } from "cookies-next";
import { useEffect } from "react";
import nextConfig from "@/../next.config.mjs";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/store";
import { setUser } from "@/lib/redux/slices/user";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import InfoImage from "@/components/info-image/info-image";

export default function LogoutPage() {
    const router = useRouter();
    const keyID = nextConfig.env?.userIdCookieKey as string;
    const keySE = nextConfig.env?.userSessionCookieKey as string;
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        localStorage.removeItem("persist:user");
        dispatch(setUser(null));
        router.push('/feed/1');
    }, [keyID, keySE]);

    return (
        <HeroWrapper
            title="Logout"
            description="You will be logged out soon"
        >
            <InfoImage text="Logging out..."></InfoImage>
        </HeroWrapper>
        
    );
}