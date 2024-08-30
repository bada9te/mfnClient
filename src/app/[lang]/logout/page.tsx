"use client"

import { deleteCookie } from "cookies-next";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/store";
import { setUser } from "@/lib/redux/slices/user";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import InfoImage from "@/components/common/info-image/info-image";
import envCfg from "@/config/env";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";

export default async function LogoutPage({params}: {params: {lang: TLang}}) {
    const router = useRouter();
    const keyID = envCfg.userIdCookieKey as string;
    const keySE = envCfg.userSessionCookieKey as string;
    const dispatch = useAppDispatch();
    const dict = await getDictionary(params.lang)
    
    useEffect(() => {
        localStorage.removeItem("persist:user");
        dispatch(setUser(undefined));
        router.push('/feed/1');
    }, [keyID, keySE, dispatch, router]);

    return (
        <HeroWrapper
            title={dict.app.logout.title}
            description={dict.app.logout.description}
        >
            <InfoImage text="Logging out..." image="/assets/icons/logo_clear.png"></InfoImage>
        </HeroWrapper>
        
    );
}