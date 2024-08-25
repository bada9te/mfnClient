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
import { formatEther, parseEther } from "viem";
import Image from "next/image";


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
            console.log(envCfg.mfnContractAddress)
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
            }).catch(console.log);
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

                    <h4 className="font-bold text-lg">Buy USDC tokens</h4>

                    <p>There are recommended platforms to purchase USDC, you can also use your favourite one (<span className="font-bold">USDC</span> token must be associated with your <span className="font-bold">BINANCE</span> account)</p>
                    <p className="font-bold">USDC Token Address:</p>
                    <a className="font-bold text-[#23c0bd]" href="https://bscscan.com/address/0x8ac76a51cc950d9822d68b83fe1ad97b32cd580d#notes">{envCfg.usdcTokenAddress}</a>
                    <div className="join join-vertical mt-4">
                        <a className="join-item btn btn-warning glass text-white" target="_blank" href="https://www.binance.com/en/crypto/buy/USD/USDC">
                            <Image src={"/assets/icons/binance.png"} width={30} height={30} alt="binance"/>
                            Binance
                        </a>
                        <a className="join-item btn hover:bg-blue-400 glass text-white" target="_blank" href="https://www.coinbase.com/price/usdc">
                            <Image src={"/assets/icons/coinbase.png"} width={30} height={30} alt="coinbase"/>
                            Coinbase
                        </a>
                    </div>
                </div>
            </dialog>
        </>
    );
}