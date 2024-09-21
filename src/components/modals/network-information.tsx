"use client"
import React, { useEffect, useRef, useState } from "react";
import AudioPlayer from "../common/player/player";
import { getDictionary } from "@/dictionaries/dictionaries";
import Image from "next/image";
import { contractGetAllImportantDataForBattle } from "@/utils/contract-functions/contract-functions";
import { useAccount } from "wagmi";

export default function NetworkInformation({
    button, 
    dictionary,
    networkName,
    post1Title,
    post2Title,
    post2Id,
    post1Id,
    battleId
}: {
    networkName: string;
    button: React.ReactElement; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"];
    post1Title: string;
    post2Title: string;
    post1Id: string;
    post2Id: string;
    battleId: string;
}) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const { address } = useAccount();
    const [data, setData] = useState<{ 
        totalTokensPerPost1: number; 
        totalTokensPerPost2: number; 
        battleTokensTransfers1: number; 
        battleTokensTransfers2: number 
    } | undefined>(undefined);

    const fetchInfo = async() => {
        contractGetAllImportantDataForBattle(
            battleId,
            post1Id,
            post2Id,
            address as `0x${string}`
        ).then(data => {
            setData({
                totalTokensPerPost1: Number(data[0].result),
                totalTokensPerPost2: Number(data[1].result),
                battleTokensTransfers1: Number(data[2].result),
                battleTokensTransfers2: Number(data[3].result),
            });
        });
    }

    useEffect(() => {
        if (address) {
            setIsMounted(true);
            fetchInfo();
        }
    }, [address]);

    const handleOpen = () => {
        fetchInfo();
        ref.current && ref.current.showModal();
    }

    const onClose = () => {
        
    }

    if (!isMounted) {
        return;
    }

    return (
        <>
            {React.cloneElement(button, {
                onClick: handleOpen,
            })}
            <dialog ref={ref} className="modal w-full">
                <form method="dialog" className="modal-backdrop w-[100vw]">
                    <button onClick={onClose}>close</button>
                </form>
                <div className="modal-box text-gray-300 max-w-[350px] w-[100vw] h-fit md:max-w-[600px] md:w-[600px] no-scrollbar text-start flex flex-col glass">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button onClick={onClose} className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h4 className="font-bold text-lg">{networkName}</h4>

                    <div className="flex-1 h-fit w-full flex flex-col justify-center items-start overflow-y-auto overflow-x-hidden mt-5 no-scrollbar">
                        <p className="font-bold mb-2">Total USDC per posts:</p>
                        <div className="stats shadow bg-base-300 glass w-full stats-vertical md:stats-horizontal">
                            <div className="stat place-items-center">
                                <div className="stat-title">{post1Title}</div>
                                <div className="stat-value text-green-400">{data ? data.totalTokensPerPost1 : "---"}</div>
                                <div className="stat-desc flex flex-row gap-1 items-center justify-center mt-2">
                                    <Image src={"/assets/icons/usd-coin.svg"} alt="usdc" width={20} height={20}/>Your's: {data && data.battleTokensTransfers1} USDC
                                </div>
                            </div>

                            <div className="stat place-items-center">
                                <div className="stat-title">{post2Title}</div>
                                <div className="stat-value text-red-400">{data ? data.totalTokensPerPost2 : "---"}</div>
                                <div className="stat-desc flex flex-row gap-1 items-center justify-center mt-2">
                                    <Image src={"/assets/icons/usd-coin.svg"} alt="usdc" width={20} height={20}/>Your's: {data && data.battleTokensTransfers2} USDC
                                </div>
                            </div>
                        </div>

                        <p className="font-bold my-2">Possible USDC withdrawings:</p>

                        <div className="stats shadow bg-base-300 glass w-full stats-vertical md:stats-horizontal">
                            <div className="stat place-items-center">
                                <div className="stat-title">{post1Title}</div>
                                <div className="stat-value text-white">
                                    { data ? data.battleTokensTransfers1 : '---' }
                                </div>
                                <div className="stat-desc flex flex-row gap-1 items-center justify-center mt-2">
                                    <Image src={"/assets/icons/usd-coin.svg"} alt="usdc" width={20} height={20}/>USDC
                                </div>
                            </div>
                            <div className="stat place-items-center">
                                <div className="stat-title">{post2Title}</div>
                                <div className="stat-value text-white">
                                    { data ? data.battleTokensTransfers2 : '---' }
                                </div>
                                <div className="stat-desc flex flex-row gap-1 items-center justify-center mt-2">
                                    <Image src={"/assets/icons/usd-coin.svg"} alt="usdc" width={20} height={20}/>USDC
                                </div>
                            </div>
                        </div>

                        <button className="btn btn-primary glass btn-sm w-full text-white mt-5">Withdraw <span className="text-[#25e7de]">00000 USDC</span></button>
                    </div>
                </div>
            </dialog>
        </>
    );
}