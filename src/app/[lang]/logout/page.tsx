"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/lib/redux/store";
import { setUser } from "@/lib/redux/slices/user";
import envCfg from "@/config/env";
import { TLang } from "@/types/language";
import { deleteCookie } from "cookies-next";
import { httpLogOut } from "@/utils/http-requests/auth";

export default function LogoutPage({params}: {params: {lang: TLang}}) {
    const router = useRouter();
    const keyID = envCfg.userIdCookieKey as string;
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        httpLogOut().then(_ => {
            localStorage.removeItem("persist:user");
            dispatch(setUser(undefined));
            router.push('/feed/1');
            deleteCookie(keyID);
        });
    }, [keyID, dispatch, router]);

    return (
        <></>
    );
}