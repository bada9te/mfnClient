"use client"
import { Battle as TBattle, Post as TPost, useBattleMakeVoteMutation } from "@/utils/graphql-requests/generated/schema";
import { useEffect, useState } from "react";
import Post from "../post/post";
import formatNumber from "@/utils/common-functions/formatNumber";
import getTimeLeft from "@/utils/common-functions/getTimeLeft";
import { useSnackbar } from "notistack";
import { useAppSelector } from "@/lib/redux/store";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import SelectAmountOfMFNTokens from "@/components/modals/select-amount-of-tokens-modal";
import envCfg from "@/config/env";
import mfnAbi from "@/config/abis/MusicFromNothingAbi.json";
import { config } from "@/config/wagmi";

const DollarIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
             className="size-5">
            <path
                d="M10.75 10.818v2.614A3.13 3.13 0 0 0 11.888 13c.482-.315.612-.648.612-.875 0-.227-.13-.56-.612-.875a3.13 3.13 0 0 0-1.138-.432ZM8.33 8.62c.053.055.115.11.184.164.208.16.46.284.736.363V6.603a2.45 2.45 0 0 0-.35.13c-.14.065-.27.143-.386.233-.377.292-.514.627-.514.909 0 .184.058.39.202.592.037.051.08.102.128.152Z"/>
            <path fillRule="evenodd"
                  d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-8-6a.75.75 0 0 1 .75.75v.316a3.78 3.78 0 0 1 1.653.713c.426.33.744.74.925 1.2a.75.75 0 0 1-1.395.55 1.35 1.35 0 0 0-.447-.563 2.187 2.187 0 0 0-.736-.363V9.3c.698.093 1.383.32 1.959.696.787.514 1.29 1.27 1.29 2.13 0 .86-.504 1.616-1.29 2.13-.576.377-1.261.603-1.96.696v.299a.75.75 0 1 1-1.5 0v-.3c-.697-.092-1.382-.318-1.958-.695-.482-.315-.857-.717-1.078-1.188a.75.75 0 1 1 1.359-.636c.08.173.245.376.54.569.313.205.706.353 1.138.432v-2.748a3.782 3.782 0 0 1-1.653-.713C6.9 9.433 6.5 8.681 6.5 7.875c0-.805.4-1.558 1.097-2.096a3.78 3.78 0 0 1 1.653-.713V4.75A.75.75 0 0 1 10 4Z"
                  clipRule="evenodd"/>
        </svg>
    );
}

const VoteIcon = () => {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path
                d="M3 3.5A1.5 1.5 0 0 1 4.5 2h6.879a1.5 1.5 0 0 1 1.06.44l4.122 4.12A1.5 1.5 0 0 1 17 7.622V16.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 3 16.5v-13Z"/>
        </svg>
    );
}


export default function Battle(props: {
    battleData: TBattle,
}) {
    const {battleData} = props;
    const [timeLeft, setTimeLeft] = useState<{h:number, m:number, s:number}>({h:0, m:0, s:0});
    const {enqueueSnackbar} = useSnackbar();
    const user = useAppSelector(state => state.user.user);

    const [makeVote] = useBattleMakeVoteMutation();
    const account = useAccount();
    const { writeContractAsync } = useWriteContract();
    const { data: userBalance } = useReadContract({
        address: envCfg.mfnContractAddress as `0x${string}`,
        abi: mfnAbi,
        functionName: "balanceOf",
        args: [account.address]
    });
    const { address } = useAccount();

    useEffect(() => {
        if (battleData._id) {
            const tId = setInterval(() => {
                setTimeLeft(getTimeLeft(+new Date(+battleData.willFinishAt) - new Date().getTime()));
            }, 3000);

            return () => {
                clearInterval(tId);
            }
        }
    }, [battleData]);

    const makeBattleVote = (voteCount: number, postNScore: "post1Score" | "post2Score") => {
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

    const makeBattleVoteWithMFNT = (amount: number, type:  "post1Score" | "post2Score") => {
        if (Number(userBalance) < amount) {
            enqueueSnackbar("Not enough MFNT", {autoHideDuration: 4000, variant: 'error'});
            return;
        }
        enqueueSnackbar("Warning, your balance will be lost if you will not follow the flow in the right way! Process will start in 10 seconds.", { autoHideDuration: 10000, variant: 'warning' });

        setTimeout(() => {
            writeContractAsync({
                address: envCfg.mfnContractAddress as `0x${string}`,
                abi: mfnAbi,
                functionName: "vote",
                args: [battleData._id, amount]
            }).then(async hash => {
                await waitForTransactionReceipt(config, {
                    hash,
                    confirmations: 2
                });
                makeBattleVote(amount, type);
            }).catch(_ => {
                enqueueSnackbar("Execution error, pls try again later", {autoHideDuration: 4000, variant: 'error'});
            });
        }, 10000);   
    }

    return (
        <div className="card bg-base-300 w-full glass bg-opacity-50 shadow-2xl">
            <div className="card-body justify-center items-center flex flex-col gap-5 p-4 pt-5">
                <h2 className="card-title">{battleData.post1?.title} vs {battleData.post2?.title}</h2>
                <div className="flex flex-wrap gap-5 justify-center items-center flex-col lg:flex-row">
                    {/* left */}
                    <div className="flex flex-nowrap flex-col">
                        <Post data={battleData.post1 as TPost}/>
                        <div className="py-2 flex flex-col gap-2 mt-3">
                            {
                                !battleData.finished &&
                                <>
                                    <button 
                                        onClick={() => makeBattleVote(1, "post1Score")}
                                        className="btn btn-sm btn-primary text-white glass w-full join-item"><VoteIcon/>Vote for {battleData.post1?.title}</button>
                                    <SelectAmountOfMFNTokens 
                                        type="post1Score"
                                        button={<button className="btn btn-sm btn-primary text-white glass w-full  join-item" disabled={!address}><DollarIcon/>Supervote</button>}
                                        handleClose={makeBattleVoteWithMFNT}
                                    />
                                </>
                            }
                        </div>
                    </div>
                    {/* mid */}
                    <div className="stats stats-vertical shadow-md w-64 glass bg-opacity-50 bg-base-300">
                        <div className="stat place-items-center">
                            <div className="stat-title">Votes</div>
                            <div className="stat-value">{formatNumber(battleData.post1Score)}</div>
                            <div className="stat-desc">For {battleData.post1?.title}</div>
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
                                    <span style={{"--value":timeLeft.h}}></span>h:
                                    {/* @ts-ignore */}
                                    <span style={{"--value":timeLeft.m}}></span>m:
                                    {/* @ts-ignore */}
                                    <span style={{"--value":timeLeft.s}}></span>s
                                </span>
                            }
                        </div>
                        <div className="stat place-items-center">
                            <div className="stat-title">Votes</div>
                            <div className="stat-value">{formatNumber(battleData.post2Score)}</div>
                            <div className="stat-desc">For {battleData.post2?.title}</div>
                        </div>
                    </div>

                    {/* right */}
                    <div className="flex flex-nowrap flex-col">
                        <Post data={battleData.post2 as TPost}/>
                        <div className="py-2 flex flex-col gap-2 mt-3">
                            {
                                !battleData.finished &&
                                <>
                                    <button
                                        onClick={() => makeBattleVote(1, "post2Score")}
                                        className="btn btn-sm btn-primary text-white glass w-full join-item"
                                    >
                                            <VoteIcon/>Vote for {battleData.post2?.title}
                                    </button>
                                    <SelectAmountOfMFNTokens 
                                        type="post2Score"
                                        button={<button className="btn btn-sm btn-primary text-white glass w-full  join-item" disabled={!address}><DollarIcon/>Supervote</button>}
                                        handleClose={makeBattleVoteWithMFNT}
                                    />
                                </>
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}