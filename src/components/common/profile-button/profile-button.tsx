"use client"
// Import the necessary functions from redux store or wherever they are defined
import { useAppSelector } from "@/lib/redux/store";
import { useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import {useCallback, useEffect, useState} from "react";
// @ts-ignore
import { useAccount, useReadContract } from "wagmi";
import Link from "next/link";
import envCfg from "@/config/env";
//import formatNumber from "@/utils/common-functions/formatNumber";
import { useSnackbar } from "notistack";
import Image from "next/image";
import { USDCAddresses } from "@/config/wagmi";
import { type getDictionary } from "@/dictionaries/dictionaries";
import SwitchLocaleModal from "@/components/modals/switch-locale/switch-locale-modal";



export default function ProfileButton({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    // Use the useSelector hook to get the user state from redux store
    const user = useAppSelector(state => state.user);
    const [isMounted, setIsMounted] = useState(false);
    const { openConnectModal } = useConnectModal();
    const { openAccountModal } = useAccountModal();
    const { openChainModal } = useChainModal();
    const { enqueueSnackbar } = useSnackbar();
    const account = useAccount();
    const {data: userBalance, refetch: refetchUserBalance} = useReadContract({
        // @ts-ignore
        address: USDCAddresses[account.chainId]?.address as `0x${string}`,
        // @ts-ignore
        abi: USDCAddresses[account.chainId]?.abi,
        functionName: "balanceOf",
        args: [account.address as `0x${string}`]
    });

    const handlebalanceInfoClick = useCallback(() => {
        enqueueSnackbar(`${userBalance ? (Number(userBalance) / 10**18).toFixed(3) : 0} USDC, on ${account.chain?.name}`, {autoHideDuration: 5000});
    }, [userBalance, account.chain?.name, enqueueSnackbar]);

    const onBalanceRefetch = () => {
        refetchUserBalance();
        enqueueSnackbar("Refetched", {autoHideDuration: 1500});
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);


    if (!isMounted) {
        return (
            <></>
        );
    }

    return (
        <div className="dropdown dropdown-end text-white">
            <div className="flex flex-row flex-nowrap items-center justify-center">
                {
                    account.address 
                    &&
                    <span className="join p-4 px-0 w-fit flex z-20 mr-2">
                        <span className="join-item badge bg-[#2f818f] glass text-white cursor-pointer hover:bg-[#20d8ce] flex md:hidden rounded-l-xl" onClick={handlebalanceInfoClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <span className="badge glass text-white flex-1 text-start justify-start hidden md:flex">{`${userBalance ? (Number(userBalance) / 10**18).toFixed(3) : 0} USDC`}
                            <a href="https://www.google.com" target="_blank">
                                {/* @ts-ignore */}
                                <Image src={USDCAddresses[account.chainId].icon} alt="chain-logo" width={16} height={16} className="ml-2"/>
                            </a>    
                        </span>
                        
                        <span className="join-item badge bg-[#2f818f] glass text-white cursor-pointer hover:bg-[#20d8ce]" onClick={() => onBalanceRefetch()}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path fillRule="evenodd" d="M13.836 2.477a.75.75 0 0 1 .75.75v3.182a.75.75 0 0 1-.75.75h-3.182a.75.75 0 0 1 0-1.5h1.37l-.84-.841a4.5 4.5 0 0 0-7.08.932.75.75 0 0 1-1.3-.75 6 6 0 0 1 9.44-1.242l.842.84V3.227a.75.75 0 0 1 .75-.75Zm-.911 7.5A.75.75 0 0 1 13.199 11a6 6 0 0 1-9.44 1.241l-.84-.84v1.371a.75.75 0 0 1-1.5 0V9.591a.75.75 0 0 1 .75-.75H5.35a.75.75 0 0 1 0 1.5H3.98l.841.841a4.5 4.5 0 0 0 7.08-.932.75.75 0 0 1 1.025-.273Z" clipRule="evenodd" />
                            </svg>
                        </span>
                    </span>
                }
                <div tabIndex={0} role="button" className="btn btn-ghost w-fit m-0 p-0 pl-0 md:pl-2 rounded-full">
                    <div className="rounded-full flex flex-row justify-center items-center gap-4">
                        <div className="hidden md:block">
                            <p className="font-bold text-lg">{user?.user?._id ? user?.user?.nick : "Login"}</p>
                        </div>
                        <img
                            width={45}
                            height={45}
                            alt="Avatar"
                            className="rounded-full"
                            src={user?.user?.avatar?.length ? `${envCfg.serverFilesEndpoint}/images/${user?.user?.avatar}` : "/assets/icons/logo_clear.png"}
                        />
                    </div>
                </div>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52 glass bg-base-300">
                {/* Conditional rendering based on user presence */}
                {user?.user?._id ? (
                    <>
                        <li>
                            <Link href="/profile/me/1" className="justify-between" legacyBehavior>
                                <a>
                                    <div className="flex flex-wrap gap-1">
                                        
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                            <path
                                                d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z"/>
                                        </svg>
                                        {dictionary?.common["profile-button"].profile}
                                    </div>
                                </a>
                            </Link>
                        </li>
                        {
                            account.address
                            ?
                            <>
                                {
                                    openAccountModal &&
                                    <li>
                                        <button onClick={openAccountModal}>
                                            <div className="flex flex-wrap gap-1">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                    <path
                                                        d="M1 4.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 2H3.25A2.25 2.25 0 0 0 1 4.25ZM1 7.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 5H3.25A2.25 2.25 0 0 0 1 7.25ZM7 8a1 1 0 0 1 1 1 2 2 0 1 0 4 0 1 1 0 0 1 1-1h3.75A2.25 2.25 0 0 1 19 10.25v5.5A2.25 2.25 0 0 1 16.75 18H3.25A2.25 2.25 0 0 1 1 15.75v-5.5A2.25 2.25 0 0 1 3.25 8H7Z"/>
                                                </svg>
                                                {`${account.address.slice(0, 4)}...${account.address.slice(account.address.length - 4, account.address.length)}`}
                                            </div>
                                        </button>
                                    </li>
                                }
                                {
                                    openChainModal &&
                                    <li>
                                        <button onClick={openChainModal}>
                                            {/* @ts-ignore */}
                                            <Image src={USDCAddresses[account.chainId].icon} alt="chain-logo" width={20} height={20}/>
                                            {dictionary?.common["profile-button"]["switch-chain"]}
                                        </button>
                                    </li>
                                }
                            </>
                            :
                            <>
                                {
                                    openConnectModal &&
                                    <li>
                                        <button onClick={openConnectModal}>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                                <path
                                                    d="M1 4.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 2H3.25A2.25 2.25 0 0 0 1 4.25ZM1 7.25a3.733 3.733 0 0 1 2.25-.75h13.5c.844 0 1.623.279 2.25.75A2.25 2.25 0 0 0 16.75 5H3.25A2.25 2.25 0 0 0 1 7.25ZM7 8a1 1 0 0 1 1 1 2 2 0 1 0 4 0 1 1 0 0 1 1-1h3.75A2.25 2.25 0 0 1 19 10.25v5.5A2.25 2.25 0 0 1 16.75 18H3.25A2.25 2.25 0 0 1 1 15.75v-5.5A2.25 2.25 0 0 1 3.25 8H7Z"/>
                                            </svg>
                                            {dictionary?.common["profile-button"].wallet}
                                        </button>
                                    </li>
                                }
                            </>
                            
                        }
                        <li>
                            <Link href="/profile/me/notifications/new/1" className="justify-between" legacyBehavior>
                                <a>
                                    <div className="flex flex-wrap gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                            <path
                                                fillRule="evenodd"
                                                d="M10 2a6 6 0 0 0-6 6c0 1.887-.454 3.665-1.257 5.234a.75.75 0 0 0 .515 1.076 32.91 32.91 0 0 0 3.256.508 3.5 3.5 0 0 0 6.972 0 32.903 32.903 0 0 0 3.256-.508.75.75 0 0 0 .515-1.076A11.448 11.448 0 0 1 16 8a6 6 0 0 0-6-6ZM8.05 14.943a33.54 33.54 0 0 0 3.9 0 2 2 0 0 1-3.9 0Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {dictionary?.common["profile-button"].notifications}
                                    </div>
                                    <span className="badge">{user.unreadNotifications}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile/me/edit" legacyBehavior>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path
                                            fillRule="evenodd"
                                            d="M7.84 1.804A1 1 0 0 1 8.82 1h2.36a1 1 0 0 1 .98.804l.331 1.652a6.993 6.993 0 0 1 1.929 1.115l1.598-.54a1 1 0 0 1 1.186.447l1.18 2.044a1 1 0 0 1-.205 1.251l-1.267 1.113a7.047 7.047 0 0 1 0 2.228l1.267 1.113a1 1 0 0 1 .206 1.25l-1.18 2.045a1 1 0 0 1-1.187.447l-1.598-.54a6.993 6.993 0 0 1-1.929 1.115l-.33 1.652a1 1 0 0 1-.98.804H8.82a1 1 0 0 1-.98-.804l-.331-1.652a6.993 6.993 0 0 1-1.929-1.115l-1.598.54a1 1 0 0 1-1.186-.447l-1.18-2.044a1 1 0 0 1 .205-1.251l1.267-1.114a7.05 7.05 0 0 1 0-2.227L1.821 7.773a1 1 0 0 1-.206-1.25l1.18-2.045a1 1 0 0 1 1.187-.447l1.598.54A6.992 6.992 0 0 1 7.51 3.456l.33-1.652ZM10 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {dictionary?.common["profile-button"]["edit-profile"]}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile/me/saved/1" legacyBehavior>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {dictionary?.common["profile-button"].saved}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/support" legacyBehavior>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {dictionary?.common["profile-button"].support}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/logout" className="text-error" legacyBehavior>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path
                                            fillRule="evenodd"
                                            d="M17 4.25A2.25 2.25 0 0 0 14.75 2h-5.5A2.25 2.25 0 0 0 7 4.25v2a.75.75 0 0 0 1.5 0v-2a.75.75 0 0 1 .75-.75h5.5a.75.75 0 0 1 .75.75v11.5a.75.75 0 0 1-.75.75h-5.5a.75.75 0 0 1-.75-.75v-2a.75.75 0 0 0-1.5 0v2A2.25 2.25 0 0 0 9.25 18h5.5A2.25 2.25 0 0 0 17 15.75V4.25Z"
                                            clipRule="evenodd"
                                        />
                                        <path
                                            fillRule="evenodd"
                                            d="M14 10a.75.75 0 0 0-.75-.75H3.704l1.048-.943a.75.75 0 1 0-1.004-1.114l-2.5 2.25a.75.75 0 0 0 0 1.114l2.5 2.25a.75.75 0 1 0 1.004-1.114l-1.048-.943h9.546A.75.75 0 0 0 14 10Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {dictionary?.common["profile-button"].logout}
                                </a>
                            </Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link href="/support" legacyBehavior>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0ZM8.94 6.94a.75.75 0 1 1-1.061-1.061 3 3 0 1 1 2.871 5.026v.345a.75.75 0 0 1-1.5 0v-.5c0-.72.57-1.172 1.081-1.287A1.5 1.5 0 1 0 8.94 6.94ZM10 15a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {dictionary?.common["profile-button"].support}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/login" legacyBehavior>
                                <a>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path
                                            fillRule="evenodd"
                                            d="M7.5 6a4.5 4.5 0 1 1 9 0 4.5 4.5 0 0 1-9 0ZM3.751 20.105a8.25 8.25 0 0 1 16.498 0 .75.75 0 0 1-.437.695A18.683 18.683 0 0 1 12 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 0 1-.437-.695Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {dictionary?.common["profile-button"].login}
                                </a>
                            </Link>
                        </li>
                    </>
                )}
                
                    <SwitchLocaleModal 
                        dictionary={dictionary}
                        button={
                            <li>
                                <button>
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM6.262 6.072a8.25 8.25 0 1 0 10.562-.766 4.5 4.5 0 0 1-1.318 1.357L14.25 7.5l.165.33a.809.809 0 0 1-1.086 1.085l-.604-.302a1.125 1.125 0 0 0-1.298.21l-.132.131c-.439.44-.439 1.152 0 1.591l.296.296c.256.257.622.374.98.314l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" clipRule="evenodd" />
                                    </svg>
                                    {dictionary.common["profile-button"]["switch-locale"]}
                                </button>
                            </li>
                        }
                    />
                
            </ul>
        </div>
    );
}



