"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/app/lib/redux/store";
import { setUser } from "@/app/lib/redux/slices/user";
import envCfg from "@/app/config/env";
import { TLang } from "@/types/language";
import { deleteCookie } from "cookies-next";
import { httpLogOut } from "@/app/utils/http-requests/auth";
import { useAccount, useDisconnect } from "wagmi";

export default function LogoutPage({params}: {params: {lang: TLang}}) {
    const router = useRouter();
    const account = useAccount();
    const { disconnect } = useDisconnect();
    const keyID = envCfg.userIdCookieKey as string;
    const dispatch = useAppDispatch();
    
    useEffect(() => {
        httpLogOut().then(_ => {
            try {
                account.address && disconnect();
            } catch (error) {
                console.log("on_web3_logout: No web3 account connected!")
            }
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