"use client"
// Import the necessary functions from redux store or wherever they are defined
import { useAppSelector } from "@/lib/redux/store";
import { useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import {useCallback, useEffect, useState} from "react";
// @ts-ignore
import { useAccount, useReadContract } from "wagmi";
import Link from "next/link";
//import formatNumber from "@/utils/common-functions/formatNumber";
import { useSnackbar } from "notistack";
import Image from "next/image";
import { USDCAddresses } from "@/config/wagmi";
import { type getDictionary } from "@/dictionaries/dictionaries";
import SwitchLocaleModal from "@/components/modals/switch-locale/switch-locale-modal";
import { BadgeHelp, Bell, Bookmark, Cog, DoorOpen, Languages, LogIn, RefreshCcw, User, Wallet } from "lucide-react";
import getIpfsUrl from "@/utils/common-functions/getIpfsUrl";



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
    const {data: decimals} = useReadContract({
        // @ts-ignore
        address: USDCAddresses[account.chainId]?.address as `0x${string}`,
        // @ts-ignore
        abi: USDCAddresses[account.chainId]?.abi,
        functionName: "decimals",
    });

    const handlebalanceInfoClick = useCallback(() => {
        enqueueSnackbar(`${userBalance ? (Number(userBalance) / 10**Number(decimals)).toFixed(3) : 0} USDC, on ${account.chain?.name}`, {autoHideDuration: 5000});
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
        <div className="dropdown dropdown-end bg-base-300 rounded-xl">
            <div className="flex flex-row flex-nowrap items-center justify-center">
                {
                    account.address 
                    &&
                    <span className="join p-4 px-0 w-fit flex z-20 mx-2">
                        <span className="join-item badge bg-[#2f818f] glass text-white cursor-pointer hover:bg-[#20d8ce] flex md:hidden rounded-l-xl" onClick={handlebalanceInfoClick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                                <path fillRule="evenodd" d="M15 8A7 7 0 1 1 1 8a7 7 0 0 1 14 0ZM9 5a1 1 0 1 1-2 0 1 1 0 0 1 2 0ZM6.75 8a.75.75 0 0 0 0 1.5h.75v1.75a.75.75 0 0 0 1.5 0v-2.5A.75.75 0 0 0 8.25 8h-1.5Z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <span className="badge glass text-white flex-1 text-start justify-start hidden md:flex">{`${userBalance ? (Number(userBalance) / 10**Number(decimals)).toFixed(3) : 0} USDC`}
                            {/* @ts-ignore */}
                            <Image src={USDCAddresses[account.chainId]?.icon} alt="chain-logo" width={16} height={16} className="ml-2"/>
                        </span>
                        
                        <span className="join-item badge bg-[#2f818f] glass text-white cursor-pointer hover:bg-[#20d8ce]" onClick={onBalanceRefetch}>
                            <RefreshCcw size={16}/>
                        </span>
                    </span>
                }
                <div tabIndex={0} role="button" className="btn btn-ghost w-fit m-0 p-0 pl-0 md:pl-5 pr-3 rounded-full">
                    <div className="rounded-full flex flex-row justify-center items-center gap-4">
                        <div className="hidden md:block">
                            <p className="font-bold text-lg">{user?.user?._id ? user?.user?.nick : "Login"}</p>
                        </div>

                        {
                            user?.user?._id 
                            ?
                            <Image
                                width={34}
                                height={34}
                                alt="Avatar"
                                className="rounded-full"
                                src={user?.user?.avatar ? getIpfsUrl(user.user.avatar) : '/assets/bgs/clear.png'}
                            />   
                            :
                            <LogIn />
                        }
                        
                    </div>
                </div>
            </div>

            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-56 glass bg-base-content text-black">
                {/* Conditional rendering based on user presence */}
                {user?.user?._id ? (
                    <>
                        <li>
                            <Link href="/profile/me/1" className="justify-between" legacyBehavior>
                                <a>
                                    <div className="flex flex-wrap gap-1">
                                        <User/>
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
                                                <Wallet/>
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
                                            <Image src={USDCAddresses[account.chainId]?.icon} alt="chain-logo" width={20} height={20}/>
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
                                            <Wallet/>
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
                                        <Bell/>
                                        {dictionary?.common["profile-button"].notifications}
                                    </div>
                                    <span className="badge">{user.unreadNotifications}</span>
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile/me/edit" legacyBehavior>
                                <a>
                                    <Cog/>
                                    {dictionary?.common["profile-button"]["edit-profile"]}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/profile/me/saved/1" legacyBehavior>
                                <a>
                                    <Bookmark/>
                                    {dictionary?.common["profile-button"].saved}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/support" legacyBehavior>
                                <a>
                                    <BadgeHelp/>
                                    {dictionary?.common["profile-button"].support}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/logout" className="text-error" legacyBehavior>
                                <a>
                                    <DoorOpen />
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
                                    <BadgeHelp/>
                                    {dictionary?.common["profile-button"].support}
                                </a>
                            </Link>
                        </li>
                        <li>
                            <Link href="/login" legacyBehavior>
                                <a>
                                    <LogIn />
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
                                    <Languages/>
                                    {dictionary.common["profile-button"]["switch-locale"]}
                                </button>
                            </li>
                        }
                    />
                
            </ul>
        </div>
    );
}



