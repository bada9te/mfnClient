"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import Image from "next/image";
import { contractGetAllImportantDataForBattle, contractGetPossibleWithdrawal } from "@/app/lib/rainbowkit/contract-functions/contract-functions";
import { useAccount, useWriteContract } from "wagmi";
import { useConnectModal } from "@rainbow-me/rainbowkit";
import mfnAbi from "@/app/lib/rainbowkit/abis/MusicFromNothingAbi.json";
import { useSnackbar } from "notistack";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "@/app/lib/rainbowkit/config";
import MainButton from "@/app/components/common/main-button/main-button";
import { X } from "lucide-react";

export default function NetworkInformation({
    button, 
    dictionary,
    networkName,
    post1Title,
    post2Title,
    post2Id,
    post1Id,
    battleId,
    battleisFInished,
    networkId,
    contractAddress,
    USDC_decimals
}: {
    networkName: string;
    button: React.ReactElement; 
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"];
    post1Title: string;
    post2Title: string;
    post1Id: string;
    post2Id: string;
    battleId: string;
    battleisFInished: boolean;
    networkId: number;
    contractAddress: string;
    USDC_decimals: number;
}) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const { address, chainId } = useAccount();
    const { openConnectModal } = useConnectModal();
    const [data, setData] = useState<{ 
        totalTokensPerPost1: number; 
        totalTokensPerPost2: number; 
        battleTokensTransfers1: number; 
        battleTokensTransfers2: number 
    } | undefined>(undefined);
    const [possibleWithdrawal, setPossibleWithdrawal] = useState(0);
    const { writeContractAsync } = useWriteContract();
    const { enqueueSnackbar } = useSnackbar();

    const fetchInfo = useCallback(async() => {
        if (chainId == networkId) {
            let transfersData = {
                totalTokensPerPost1: 0,
                totalTokensPerPost2: 0,
                battleTokensTransfers1: 0,
                battleTokensTransfers2: 0,
            };

            await contractGetAllImportantDataForBattle(
                battleId,
                post1Id,
                post2Id,
                address as `0x${string}`,
                networkId,
                contractAddress as `0x${string}`,
            ).then(data => {
                transfersData = {
                    totalTokensPerPost1: Number(data[0].result) / 10**USDC_decimals,
                    totalTokensPerPost2: Number(data[1].result) / 10**USDC_decimals,
                    battleTokensTransfers1: Number(data[2].result) / 10**USDC_decimals,
                    battleTokensTransfers2: Number(data[3].result) / 10**USDC_decimals,
                };
                setData(transfersData);
            }).catch(console.log);
    
            await contractGetPossibleWithdrawal(
                battleId, 
                address as string, 
                networkId, 
                contractAddress as `0x${string}`
            ).then(data => {
                // @ts-ignore
                const possibleWithdraw1 = Number(data[0]);
                // @ts-ignore
                const possibleWithdraw2 = Number(data[1]);

                if (transfersData.totalTokensPerPost1 > transfersData.totalTokensPerPost2) {
                    setPossibleWithdrawal(possibleWithdraw1 / 10**USDC_decimals || 0);
                } else {
                    setPossibleWithdrawal(possibleWithdraw2 / 10**USDC_decimals || 0);
                }
            }).catch(console.log);
            
        }
    }, [battleId, post1Id, post2Id, address, networkId, chainId, USDC_decimals]);

    useEffect(() => {
        setIsMounted(true);
        if (address) {
            fetchInfo();
        }
    }, [address, fetchInfo]);

    const handleOpen = () => {
        fetchInfo();
        ref.current && ref.current.showModal();
    }

    const onClose = () => {
        ref.current && ref.current.close();
    }
    
    const handelWithdraw = () => {
        onClose();
        enqueueSnackbar("Pending...", { autoHideDuration: 1500 });
        data && writeContractAsync({
            address: contractAddress as `0x${string}`,
            abi: mfnAbi,
            functionName: "withdrawTokensFromBattle",
            args: [
                battleId,
                data.totalTokensPerPost1 > data.totalTokensPerPost2 ? post1Id : post2Id,
            ],
        }).then(async hash => {
            enqueueSnackbar("Waiting for TX receipt...", { autoHideDuration: 2000 });
            await waitForTransactionReceipt(config, {
                hash,
                confirmations: 2
            });
            enqueueSnackbar("TX completed", { autoHideDuration: 3000, variant: 'success' });
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", { autoHideDuration: 4000, variant: 'error' })
        });
    }

    if (!isMounted) {
        return;
    }

    return (
        <>
            {React.cloneElement(button, {
                onClick: address?.length ? handleOpen : openConnectModal
            })}
            <dialog ref={ref} className="modal w-full cursor-default">
                <form method="dialog" className="modal-backdrop w-[100vw]">
                    <button onClick={onClose}>close</button>
                </form>
                <div className="modal-box text-gray-300 max-w-[350px] w-[100vw] h-fit md:max-w-[600px] md:w-[600px] no-scrollbar text-start flex flex-col ">
                    <form method="dialog" style={{ width:"32px", position: 'absolute', right: '14px', top: '14px' }}>
                        {/* if there is a button in form, it will close the modal */}
                        <MainButton onClick={onClose} color="error" className="w-[25px] h-[25px] p-1">
                            <X/>
                        </MainButton>
                    </form>

                    <h4 className="font-bold text-lg">{networkName}</h4>

                    <div className="flex-1 h-fit w-full flex flex-col justify-center items-start overflow-y-auto overflow-x-hidden mt-5 no-scrollbar">
                        <p className="font-bold mb-2">{dictionary.modals["network-information"]["total-per-posts"]}</p>
                        <div className="stats shadow bg-base-300  w-full stats-vertical md:stats-horizontal">
                            <div className="stat place-items-center">
                                <div className="stat-title">{post1Title}</div>
                                <div className="stat-value text-green-400">
                                    {data ? Number(data.totalTokensPerPost1 || 0) : "---"}
                                </div>
                                <div className="stat-desc flex flex-row gap-1 items-center justify-center mt-2">
                                    <Image src={"/assets/icons/usd-coin.svg"} alt="usdc" width={20} height={20}/>{dictionary.modals["network-information"].your} {data && Number(data.battleTokensTransfers1 || 0)} USDC
                                </div>
                            </div>

                            <div className="stat place-items-center">
                                <div className="stat-title">{post2Title}</div>
                                <div className="stat-value text-red-400">
                                    {data ? Number(data.totalTokensPerPost2 || 0) : "---"}
                                </div>
                                <div className="stat-desc flex flex-row gap-1 items-center justify-center mt-2">
                                    <Image src={"/assets/icons/usd-coin.svg"} alt="usdc" width={20} height={20}/>{dictionary.modals["network-information"].your} {data && Number(data.battleTokensTransfers2)} USDC
                                </div>
                            </div>
                        </div>

                        <p className="font-bold my-2">{dictionary.modals["network-information"]["possible-withdraw"]}</p>

                        <div className="stats shadow bg-base-300  w-full stats-vertical md:stats-horizontal">
                            <div className="stat place-items-center">
                                <div className="stat-title">{post1Title}</div>
                                <div className="stat-value text-base-content">
                                    { data ? Number(data.battleTokensTransfers1 || 0) : '---' }
                                </div>
                                <div className="stat-desc flex flex-row gap-1 items-center justify-center mt-2">
                                    <Image src={"/assets/icons/usd-coin.svg"} alt="usdc" width={20} height={20}/>USDC
                                </div>
                            </div>
                            <div className="stat place-items-center">
                                <div className="stat-title">{post2Title}</div>
                                <div className="stat-value text-base-content">
                                    { data ? Number(data.battleTokensTransfers2 || 0) : '---' }
                                </div>
                                <div className="stat-desc flex flex-row gap-1 items-center justify-center mt-2">
                                    <Image src={"/assets/icons/usd-coin.svg"} alt="usdc" width={20} height={20}/>USDC
                                </div>
                            </div>
                        </div>

                        <button 
                            className="btn   btn-sm w-full text-base-content mt-5" 
                            disabled={!battleisFInished || possibleWithdrawal == 0}
                            onClick={handelWithdraw}
                        >
                            {dictionary.modals["network-information"].withdraw} <span className="text-[#25e7de]">{String(possibleWithdrawal).slice(0, 7)} USDC</span>
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}