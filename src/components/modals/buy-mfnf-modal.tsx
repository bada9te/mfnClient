"use client"
import React, { useCallback, useEffect, useRef, useState } from "react";
import TokenAmountCard from "../common/token-amount-card/token-amount-card";
import { useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import envCfg from "@/config/env";
import mfnAbi from "@/config/MusicFromNothingAbi.json";
import { useSnackbar } from "notistack";
import { config } from "@/config/wagmi";
import mfntTokensData from "@/config/mfnt-tokens";


export default function BuyMFNTModal({button}: {button: React.ReactElement}) {
    const ref = useRef<HTMLDialogElement | null>(null);
    const [isMounted, setIsMounted] = useState(false);
    const [selectedPack, setSelectedPack] = useState<null | number>(null);
    const { enqueueSnackbar } = useSnackbar();

    const { writeContractAsync } = useWriteContract();
    const { data: tokenPrice } = useReadContract({
        address: envCfg.mfnContractAddress as `0x${string}`,
        abi: mfnAbi,
        functionName: "tokenPrice",
    });

    useEffect(() => {
        setIsMounted(true);
    }, [])

    const handleOpen = () => {
        ref.current && ref.current.showModal();
    }

    const handleClose = () => {
        ref.current && ref.current.close();
    }

    const submitPurchase = useCallback(() => {
        enqueueSnackbar("Pending...", {autoHideDuration: 1500});
        if (tokenPrice && selectedPack) {
            writeContractAsync({
                address: envCfg.mfnContractAddress as `0x${string}`,
                abi: mfnAbi,
                functionName: "buyTokens",
                value: BigInt(selectedPack * Number(tokenPrice))
            }).then(hash => {
                handleClose();
                waitForTransactionReceipt(config, {
                    hash,
                    confirmations: 2,
                }).then(_ => {
                    enqueueSnackbar("Success, tokens will be added to your MFNT balance soon.", {autoHideDuration: 3000, variant: 'success'});
                }).catch(_ => {
                    enqueueSnackbar("Sth went wrong, pls try again later", {autoHideDuration: 4000, variant: 'error'});
                });
            });
        }
    }, [tokenPrice, selectedPack]);

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
                    <button>close</button>
                </form>
                <div className="modal-box text-gray-300 max-w-[350px] w-[100vw] h-fit md:max-w-[600px] md:w-[600px] no-scrollbar text-start flex flex-col glass">
                    <form method="dialog">
                        {/* if there is a button in form, it will close the modal */}
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                    </form>

                    <h4 className="font-bold text-lg">Buy MFNT tokens</h4>

                    <div className="overflow-y-auto mt-5 no-scrollbar py-4">
                        <div className="flex gap-4 flex-wrap justify-center items-center">
                            {
                                mfntTokensData.map((i, key) => {
                                    return (
                                        <TokenAmountCard 
                                            title={i.title} 
                                            index={key + 1} 
                                            amount={i.amount} 
                                            key={key} 
                                            handleSelect={() => setSelectedPack(i.amount)}
                                        />
                                    )
                                })
                            }
                        </div>
                    </div>

                    <div className="modal-action z-50"> 
                        <button className="btn btn-primary w-full glass text-white" onClick={submitPurchase} disabled={selectedPack === null}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="M2.273 5.625A4.483 4.483 0 0 1 5.25 4.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 3H5.25a3 3 0 0 0-2.977 2.625ZM2.273 8.625A4.483 4.483 0 0 1 5.25 7.5h13.5c1.141 0 2.183.425 2.977 1.125A3 3 0 0 0 18.75 6H5.25a3 3 0 0 0-2.977 2.625ZM5.25 9a3 3 0 0 0-3 3v6a3 3 0 0 0 3 3h13.5a3 3 0 0 0 3-3v-6a3 3 0 0 0-3-3H15a.75.75 0 0 0-.75.75 2.25 2.25 0 0 1-4.5 0A.75.75 0 0 0 9 9H5.25Z" />
                            </svg>
                            Purchase<span className="font-bold text-[#23d7d3]">{selectedPack} MFNT</span>tokens
                        </button>
                    </div>
                </div>
            </dialog>
        </>
    );
}