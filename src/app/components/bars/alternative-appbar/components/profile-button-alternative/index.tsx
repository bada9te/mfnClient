"use client"
// Import the necessary functions from redux store or wherever they are defined
import { useAppSelector } from "@/app/lib/redux/store";
import { useAccountModal, useChainModal, useConnectModal } from "@rainbow-me/rainbowkit";
import {useCallback, useEffect, useState} from "react";
// @ts-ignore
import { useAccount, useReadContract } from "wagmi";
import Link from "next/link";
//import formatNumber from "@/utils/common-functions/formatNumber";
import { useSnackbar } from "notistack";
import Image from "next/image";
import { USDCAddresses } from "@/app/lib/rainbowkit/config";
import { type getDictionary } from "@/app/dictionaries/dictionaries";
import SwitchLocaleModal from "@/app/components/modals/switch-locale/switch-locale-modal";
import { BadgeHelp, Bell, Bookmark, Cog, DoorOpen, Languages, LogIn, RefreshCcw, User, Wallet } from "lucide-react";
import getIpfsUrl from "@/app/utils/common-functions/getIpfsUrl";
import { useUserAchievementsDataLazyQuery } from "@/app/utils/graphql-requests/generated/schema";



export default function ProfileButtonAlternative({
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

    const [getUserAchievements, { data: userAchievementsData }] = useUserAchievementsDataLazyQuery();

    useEffect(() => {
        setIsMounted(true);

        if (user?.user) {
            getUserAchievements({
                variables: {
                    _id: user?.user?._id as string,
                }
            })
        }
    }, [user]);



    if (!isMounted) {
        return (
            <></>
        );
    }

    return (
        <div className="flex flex-col gap-3">
            {
                user?.user && userAchievementsData?.userAchievementsData &&
                <div className="card bg-base-100 image-full w-full shadow-xl relative min-h-44">

                    <div className="flex flex-row z-50 items-end">
                        <div className="flex flex-row justify-around w-full mb-4">
                            <div className="dropdown dropdown-start dropdown-top bg-opacity-0 rounded-full">
                                <button className="rounded-full">
                                    <Image 
                                        src={getIpfsUrl(user?.user?.avatar)} 
                                        alt={`Avatar`} 
                                        className="rounded-full h-14 w-14 shadow-2xl cursor-pointer border-[3px] border-[#21d4ce]" 
                                        width={100} 
                                        height={100}
                                    />
                                </button>

                                <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-56  bg-base-content text-black">
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
                                </ul>    
                            </div>
                            <div>
                                <div className="stat relative flex justify-center flex-col gap-1 text-base-content p-0">
                                    <div className="stat-actions relative">
                                        <span className="font-bold absolute top-[-14px]">{userAchievementsData?.userAchievementsData?.totalRP}</span>
                                        <span className="font-bold absolute top-[-14px] right-0">800</span>
                                        <progress className="progress w-full min-w-40" value={userAchievementsData?.userAchievementsData?.totalRP} max={800}></progress>
                                        <span className="font-bold absolute top-[24px] left-0 flex flex-row gap-1">
                                            <Image src={"/assets/icons/trophy.png"} alt="trophy" width={24} height={24} className="w-5"/>
                                            Current level ({Math.floor((userAchievementsData?.userAchievementsData?.totalRP) / 800) + 1})
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <figure>
                        <Image 
                            src={getIpfsUrl(user?.user?.background)} 
                            alt={`background`} 
                            width={1000} 
                            height={400}
                        />
                    </figure>
                    <div className="card-body">
                        <h2 className="card-title">{user.user.nick}</h2>
                        <p>{user.user.description}</p>
                    </div>
                </div>
            }
            <div className="flex flex-col bg-base-300 w-full rounded-box p-3">
                <div className="flex flex-row gap-1">
                    <div className="btn btn-sm w-10 h-10">
                        <Link href="/support"> 
                            <BadgeHelp/>
                        </Link>
                    </div>

                    <SwitchLocaleModal 
                        dictionary={dictionary}
                        button={
                            <div className="btn btn-sm w-10 h-10">
                                <Languages />
                            </div>
                        }
                    />

                    <div className="btn btn-sm w-44 h-10 flex flex-row gap-2">
                        {
                            user?.user 
                            ?
                            <Link href="/logout" className="text-error" legacyBehavior>
                                <a className="flex flex-row gap-2 items-center justify-center">
                                    <DoorOpen />
                                    {dictionary?.common["profile-button"].logout}
                                </a>
                            </Link>
                            :
                            <Link href="/login" legacyBehavior>
                                <a className="flex flex-row gap-2 items-center justify-center">
                                    <LogIn />
                                    {dictionary?.common["profile-button"].login}
                                </a>
                            </Link>
                        }
                        
                    </div>
                </div>
            </div>
        </div>
    );
   
}

