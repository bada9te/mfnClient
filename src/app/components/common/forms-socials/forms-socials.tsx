"use client"
import envCfg from "@/app/config/env";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { setUnreadNotificationsCount, setUser } from "@/app/lib/redux/slices/user";
import { useAppDispatch } from "@/app/lib/redux/store";
import { httpWeb3Login } from "@/app/utils/http-requests/auth";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import { setCookie } from "cookies-next";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect } from "react";
import { useAccount, useDisconnect, useSignMessage } from "wagmi";


export default function FormsSocials({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const account = useAccount();
    const { openConnectModal } = useConnectModal();
    const { signMessageAsync } = useSignMessage();
    const { enqueueSnackbar }  = useSnackbar();
    const { disconnect }       = useDisconnect();
    const dispatch = useAppDispatch();
    const router = useRouter();

    useEffect(() => {
        if (account.address) {
            const processSigning = async(msg: string) => {
                try {
                    const signHex = await signMessageAsync({ message: msg });
                    httpWeb3Login(
                        account.address as string,
                        msg,
                        signHex
                    ).then(({data: response}) => {
                        console.log("LOGIN:", response);
                        enqueueSnackbar(`Logged in as ${response.user.nick}`, {variant: 'success', autoHideDuration: 2000});
                        dispatch(setUser(response.user));
                        dispatch(setUnreadNotificationsCount(response.unreadNotifications));
                        setCookie(envCfg.userIdCookieKey as string, response.user._id);
                        router.replace('/feed/1');
                    });
                } catch (error) {
                    console.log(error)
                }
            };

            const message = new Date().getTime().toString();
            processSigning(message);
        }
    }, [account.address]);

    useEffect(() => {
        try {
            account.address && disconnect();
        } catch (error) {
            console.log("on_web3_logout: No web3 account connected!")
        }
    }, []);

    return (
        <>
            <div className="divider divider-primary w-80 mt-14 md:mt-10 hidden md:flex">{dictionary.common["forms-socials"]["use-socials"]}</div>
            <div className="join w-full flex justify-center mb-5">
                <Link href={envCfg.googleAuthURL as string} className="join-item btn hover:bg-white hover:text-black  text-base-content w-16">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                    </svg>
                </Link>
                <Link href={envCfg.facebookAuthURL as string} className="join-item btn hover:bg-blue-600  text-base-content w-16">
                    <svg fill="#0091ff" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 310" stroke="#0091ff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <g id="XMLID_834_"> 
                            <path id="XMLID_835_" d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064 c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996 V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545 C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703 c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z">
                            </path>
                        </g> 
                        </g>
                    </svg>
                </Link>
                <Link href={envCfg.twitterAuthURL as string} className="join-item btn hover:bg-base-300  text-base-content w-16">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
                        <path fill="#212121" fillRule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clipRule="evenodd"></path><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"></path><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
                    </svg>
                </Link>

                <button className="join-item btn hover:bg-indigo-500  text-base-content w-16" onClick={openConnectModal}>
                    <Image src={"/assets/icons/ethereum-eth.svg"} alt="ether" width={100} height={100} className="w-6"/>
                </button>
            </div>
        </>
    );
} 