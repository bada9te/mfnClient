"use client"
import { MFNAddresses, USDCAddresses } from "@/app/lib/rainbowkit/config";
import { getDictionary } from "@/app/translations/dictionaries";
import { useAccount, useReadContract } from "wagmi";
import MFNAbi from "@/app/lib/rainbowkit/abis/MusicFromNothingAbi.json";
import { RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";


export default function RefreshButtonPerContainer({
    handleClick,
    dictionary,
    addWithdrawAllBtn,
    handleWithdrawClick,
}: {
    handleClick: () => void;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"];
    addWithdrawAllBtn?: boolean;
    handleWithdrawClick?: () => void;
}) {
    const [isMounted, setIsMounted] = useState(false);

    const account = useAccount();
    const { data: possibleWithdrawalFromAllBattles, isLoading } = useReadContract({
        // @ts-ignore
        address: MFNAddresses[account.chainId] as string,
        abi: MFNAbi,
        functionName: "calculateWithdrawalTokensFromAllBattles",
        args: [account.address]
    });

    const { data: decimals } = useReadContract({
        // @ts-ignore
        address: USDCAddresses[account.chainId]?.address || "0x",
        // @ts-ignore
        abi: USDCAddresses[account.chainId]?.abi || [],
        functionName: "decimals",
    });

    const amount = Number(possibleWithdrawalFromAllBattles) / 10**Number(decimals);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return;
    }

    return (
        <div className="w-full flex flex-col justify-center items-center gap-4">
            <button className="z-40 btn btn-sm text-base-content w-80" onClick={handleClick}>
                <RefreshCcw/>
                {dictionary.common["refresh-btn-container"].refresh}
            </button>

            {
                addWithdrawAllBtn ?
                <button 
                    className="z-40 btn btn-sm text-base-content w-80" 
                    onClick={handleWithdrawClick} 
                    disabled={!possibleWithdrawalFromAllBattles}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                        <path fillRule="evenodd" d="M3.75 3.375c0-1.036.84-1.875 1.875-1.875H9a3.75 3.75 0 0 1 3.75 3.75v1.875c0 1.036.84 1.875 1.875 1.875H16.5a3.75 3.75 0 0 1 3.75 3.75v7.875c0 1.035-.84 1.875-1.875 1.875H5.625a1.875 1.875 0 0 1-1.875-1.875V3.375Zm10.5 1.875a5.23 5.23 0 0 0-1.279-3.434 9.768 9.768 0 0 1 6.963 6.963A5.23 5.23 0 0 0 16.5 7.5h-1.875a.375.375 0 0 1-.375-.375V5.25ZM12 10.5a.75.75 0 0 1 .75.75v.028a9.727 9.727 0 0 1 1.687.28.75.75 0 1 1-.374 1.452 8.207 8.207 0 0 0-1.313-.226v1.68l.969.332c.67.23 1.281.85 1.281 1.704 0 .158-.007.314-.02.468-.083.931-.83 1.582-1.669 1.695a9.776 9.776 0 0 1-.561.059v.028a.75.75 0 0 1-1.5 0v-.029a9.724 9.724 0 0 1-1.687-.278.75.75 0 0 1 .374-1.453c.425.11.864.186 1.313.226v-1.68l-.968-.332C9.612 14.974 9 14.354 9 13.5c0-.158.007-.314.02-.468.083-.931.831-1.582 1.67-1.694.185-.025.372-.045.56-.06v-.028a.75.75 0 0 1 .75-.75Zm-1.11 2.324c.119-.016.239-.03.36-.04v1.166l-.482-.165c-.208-.072-.268-.211-.268-.285 0-.113.005-.225.015-.336.013-.146.14-.309.374-.34Zm1.86 4.392V16.05l.482.165c.208.072.268.211.268.285 0 .113-.005.225-.015.336-.012.146-.14.309-.374.34-.12.016-.24.03-.361.04Z" clipRule="evenodd" />
                    </svg>
                    {dictionary.common["refresh-btn-container"]["withdraw-all"]} 
                    {' '}
                    ({
                        isLoading 
                        ?
                        <span className="loading loading-spinner loading-xs"></span>
                        :
                        <span className="text-[#25e7de]">{amount || 0}</span>
                    })
                </button> :
                null
            }
        </div>
    );
}