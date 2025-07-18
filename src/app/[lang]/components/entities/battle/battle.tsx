"use client"
import { Battle as TBattle, Post as TPost, useBattleMakeVoteMutation } from "@/app/utils/graphql-requests/generated/schema";
import { useEffect, useState } from "react";
import Post from "../post/post";
import formatNumber from "@/app/utils/common-functions/formatNumber";
import getTimeLeft from "@/app/utils/common-functions/getTimeLeft";
import { useSnackbar } from "notistack";
import { useAppSelector } from "@/app/lib/redux/store";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import SelectAmountOfMFNTokens from "./components/select-amount-of-tokens-modal";
import { USDCAddresses, config } from "@/app/lib/rainbowkit/config";
import { getDictionary } from "@/app/translations/dictionaries";
import ChainImage from "@/app/[lang]/components/common/chain-image/chain-image";
import NetworkInformation from "./components/network-information-modal";
import { generateDEFAULT_MFN_CONTRACT_CFG } from "@/app/lib/rainbowkit/contract-functions/contract-functions";
import { BadgeDollarSign, Gavel } from "lucide-react";


export default function Battle(props: {
    battleData: TBattle,
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const {battleData, dictionary} = props;
    const [timeLeft, setTimeLeft] = useState<{h:number, m:number, s:number}>({h:0, m:0, s:0});
    const [isMounted, setIsMounted] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const user = useAppSelector(state => state.user.user);

    const [makeVote] = useBattleMakeVoteMutation();
    const account = useAccount();
    const { writeContractAsync } = useWriteContract();
    const { data: userBalance } = useReadContract({
        // @ts-ignore
        address: USDCAddresses[account.chainId]?.address as `0x${string}`,
        // @ts-ignore
        abi: USDCAddresses[account.chainId]?.abi,
        functionName: "balanceOf",
        args: [account.address as `0x${string}`]
    });
    const { data: decimals } = useReadContract({
        // @ts-ignore
        address: USDCAddresses[account.chainId]?.address || "0x",
        // @ts-ignore
        abi: USDCAddresses[account.chainId]?.abi || [],
        functionName: "decimals",
    });
    const { address } = useAccount();

    useEffect(() => {
        if (battleData._id) {
            const tId = setInterval(() => {
                const timeLeft = getTimeLeft(+new Date(+battleData.willFinishAt) - new Date().getTime());
                setTimeLeft(timeLeft);
            }, 3000);

            return () => {
                clearInterval(tId);
            }
        }
    }, [battleData]);

    const makeBattleVote = (voteCount: number, postNScore: "post1Score" | "post2Score") => {
        if (String(voteCount).includes('.')) {
            voteCount = Number(String(voteCount).slice(0, String(voteCount).indexOf('.')))
        }

        console.log("VOTING...", voteCount)
        enqueueSnackbar("Voting...", {autoHideDuration: 1500});
        makeVote({
            variables: {
                input: {
                    voteCount,
                    voterId: user?._id as string,
                    battleId: battleData._id,
                    postNScore,
                }
            }
        }).then(_ => {
            enqueueSnackbar("Vote submitted", {autoHideDuration: 2500, variant: 'success'});
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {autoHideDuration: 4000, variant: 'error'});
        });
    }

    const makeBattleVoteWithUSDC = (amount: number, type:  "post1Score" | "post2Score") => {
        console.log(userBalance)
        if (Number(userBalance) < amount * 10**Number(decimals)) {
            enqueueSnackbar("Not enough USDC", {autoHideDuration: 4000, variant: 'error'});
            return;
        }

        setTimeout(async() => {
            const approveHash = await writeContractAsync({
                // @ts-ignore
                address: USDCAddresses[account.chainId].address,
                // @ts-ignore
                abi: USDCAddresses[account.chainId].abi,
                functionName: "approve",
                // @ts-ignore
                args: [battleData.contractAddress, amount * 10**Number(decimals)],
            });
            enqueueSnackbar("Waiting for tx receipt...", {autoHideDuration: 2000});
            await waitForTransactionReceipt(config, {
                hash: approveHash,
                confirmations: 2
            });
            enqueueSnackbar("Confirmed, voting with USDC...", {autoHideDuration: 2000});

            await writeContractAsync({
                // @ts-ignore
                ...generateDEFAULT_MFN_CONTRACT_CFG(account.chainId),
                address: battleData.contractAddress as `0x${string}`,
                functionName: "vote",
                args: [
                    battleData._id, 
                    type == "post1Score" ? battleData.post1?._id : battleData.post2?._id, 
                    amount * 10**Number(decimals)]
            }).then(async hash => {
                await waitForTransactionReceipt(config, {
                    hash,
                    confirmations: 2
                });
                makeBattleVote(amount, type);
            }).catch(err => {
                console.log(err);
                enqueueSnackbar("Execution error, pls try again later", {autoHideDuration: 4000, variant: 'error'});
            });
        }, 200);   
    }

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return;
    }

    return (
        <div className={
                `card bg-base-100 w-full shadow-2xl 
                ${battleData.finished && (battleData.post1Score > battleData.post2Score ? "bg-gradient-to-r from-green-400/30 to-red-400/30": "bg-gradient-to-r from-red-400/30 to-green-400/30")}
            `}>
            <div className="card-body justify-center items-center flex flex-col gap-5 p-4 pt-5 relative">
                {
                    battleData.chainId
                    &&
                    <NetworkInformation 
                        USDC_decimals={Number(decimals)}
                        battleisFInished={+new Date(+battleData.willFinishAt) - new Date().getTime() < 0}
                        button={
                            <div className="bg-base-300 cursor-pointer hover:bg-[#19a29b] absolute top-0 right-0 rounded-none rounded-tr-2xl rounded-bl-2xl text-base-content flex flex-row gap-2 items-center justify-center p-2">
                                <ChainImage chainId={battleData.chainId}/>
                                {config.chains.find(i => i.id === battleData.chainId)?.name}
                            </div>
                        }
                        dictionary={dictionary}
                        networkName={config.chains.find(i => i.id === battleData.chainId)?.name || "---"}
                        post1Title={battleData.post1?.title || "---"}
                        post2Title={battleData.post2?.title || "---"}
                        post1Id={battleData.post1?._id as string}
                        post2Id={battleData.post2?._id as string}
                        battleId={battleData._id as string}
                        networkId={battleData.chainId}
                        contractAddress={battleData.contractAddress as string}
                    />
                    
                }
                <h2 className="card-title mt-10 md:mt-0">{battleData.post1?.title} {dictionary.entities.battle.versus} {battleData.post2?.title}</h2>
                <div className="flex flex-wrap gap-5 justify-center items-center flex-col lg:flex-row">
                    {/* left */}
                    <div className="flex flex-nowrap flex-col">
                        <Post data={battleData.post1 as TPost} dictionary={dictionary}/>
                        <div className="py-2 flex flex-col gap-2 mt-3">
                            {
                                !battleData.finished && timeLeft.h >= 0 && timeLeft.m >= 0 && timeLeft.s >= 0 &&
                                <>
                                    {
                                        battleData.chainId ?
                                        <SelectAmountOfMFNTokens 
                                            dictionary={dictionary}
                                            type="post1Score"
                                            button={<button className="btn btn-sm  text-base-content w-full  join-item" disabled={!address}><BadgeDollarSign />{dictionary.entities.battle.supervote}</button>}
                                            handleClose={makeBattleVoteWithUSDC}
                                        /> : 
                                        <button 
                                            disabled={battleData.votedBy?.map(i => i?._id)?.includes(user?._id as string)}
                                            onClick={() => makeBattleVote(1, "post1Score")}
                                            className="btn btn-sm  text-base-content w-full join-item">
                                                <Gavel />{dictionary.entities.battle["vote-for"]} {battleData.post1?.title}
                                        </button>
                                    }
                                </>
                            }
                        </div>
                    </div>
                    {/* mid */}
                    <div className="stats stats-vertical shadow-md w-64 bg-base-300">
                        <div className="stat place-items-center">
                            <div className="stat-title">{dictionary.entities.battle.votes}</div>
                            <div className="stat-value">{formatNumber(battleData.post1Score)}</div>
                            <div className="stat-desc">{dictionary.entities.battle.for} {battleData.post1?.title}</div>
                        </div>
                        <div className="stat place-items-center">
                            {
                                battleData.finished
                                ?
                                <span className="font-mono text-2xl">
                                    {
                                        (() => {
                                            if ((battleData.winner?._id == battleData.post1?._id) || (battleData.post1Score > battleData.post2Score)) {
                                                return battleData.post1?.title;
                                            }

                                            if ((battleData.winner?._id == battleData.post2?._id) || (battleData.post1Score < battleData.post2Score)) {
                                                return battleData.post2?.title;
                                            }

                                            if (battleData.post1Score === battleData.post2Score) {
                                                return "Draw";
                                            }
                                        })()
                                    }
                                </span>
                                :
                                <span className="countdown font-mono text-2xl">
                                    {/* @ts-ignore */}
                                    <span style={{"--value":(timeLeft.h < 0 ? 0 : timeLeft.h)}}></span>h:
                                    {/* @ts-ignore */}
                                    <span style={{"--value":(timeLeft.m < 0 ? 0 : timeLeft.m)}}></span>m:
                                    {/* @ts-ignore */}
                                    <span style={{"--value":(timeLeft.s < 0 ? 0 : timeLeft.s)}}></span>s
                                </span>
                            }
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">{dictionary.entities.battle.votes}</div>
                            <div className="stat-value">{formatNumber(battleData.post2Score)}</div>
                            <div className="stat-desc">{dictionary.entities.battle.for} {battleData.post2?.title}</div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="flex flex-nowrap flex-col">
                        <Post data={battleData.post2 as TPost} dictionary={dictionary}/>
                        <div className="py-2 flex flex-col gap-2 mt-3">
                            {
                                !battleData.finished && timeLeft.h >= 0 && timeLeft.m >= 0 && timeLeft.s >= 0 &&
                                <>
                                    {
                                        battleData.chainId ?
                                        <SelectAmountOfMFNTokens 
                                            dictionary={dictionary}
                                            type="post2Score"
                                            button={<button className="btn btn-sm  text-base-content w-full  join-item" disabled={!address}><BadgeDollarSign />{dictionary.entities.battle.supervote}</button>}
                                            handleClose={makeBattleVoteWithUSDC}
                                        /> :
                                        <button
                                            disabled={battleData.votedBy?.map(i => i?._id)?.includes(user?._id as string)}
                                            onClick={() => makeBattleVote(1, "post2Score")}
                                            className="btn btn-sm  text-base-content w-full join-item"
                                        >
                                            <Gavel />{dictionary.entities.battle["vote-for"]} {battleData.post2?.title}
                                        </button>
                                    }
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}