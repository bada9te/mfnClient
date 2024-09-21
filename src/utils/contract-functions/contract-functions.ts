import { config } from "@/config/wagmi"
import { writeContract, readContract, readContracts } from "@wagmi/core"
import mfnAbi from "@/config/abis/MusicFromNothingAbi.json";
import envCfg from "@/config/env";

export const DEFAULT_MFN_CONTRACT_CFG = {
    address: envCfg.mfnContractAddress as `0x${string}`,
    abi: mfnAbi,
}

export const contractMakeBattleVote = async(
    battleId: string, 
    postId: string, 
    amount: number
) => {
    const data = await writeContract(config, {
        ...DEFAULT_MFN_CONTRACT_CFG,
        functionName: "vote",
        args: [battleId, postId, amount]
    });

    return data;
}

export const contractGetTokenTransfersPerPost = async(
    user: string,
    battleId: string, 
    postId: string
) => {
    const data = await readContract(config, {
        ...DEFAULT_MFN_CONTRACT_CFG,
        functionName: "battleTokensTransfers",
        args: [user, battleId, postId]
    });

    return data;
}

export const contractGetTotalVotingsPerPost = async(
    battleId: string, 
    postId: string
) => {
    const data = await readContract(config, {
        ...DEFAULT_MFN_CONTRACT_CFG,
        functionName: "totalTokensPerPost",
        args: [battleId, postId]
    });

    return data;
}

export const contractGetAllImportantDataForBattle = async(
    battleId: string,
    post1Id: string,
    post2Id: string,
    user: string
) => {
    const data = await readContracts(config, {
        contracts: [
            // @ts-ignore
            {
                ...DEFAULT_MFN_CONTRACT_CFG,
                functionName: "totalTokensPerPost",
                args: [battleId, post1Id]
            },
            // @ts-ignore
            {
                ...DEFAULT_MFN_CONTRACT_CFG,
                functionName: "totalTokensPerPost",
                args: [battleId, post2Id]
            },
            // @ts-ignore
            {
                ...DEFAULT_MFN_CONTRACT_CFG,
                functionName: "battleTokensTransfers",
                args: [user, battleId, post1Id]
            },
            // @ts-ignore
            {
                ...DEFAULT_MFN_CONTRACT_CFG,
                functionName: "battleTokensTransfers",
                args: [user, battleId, post2Id]
            }
        ],
    });

    return data;
}

export const contractGetPossibleWithdrawal = async(
    battleId: string,
    postId: string,
) => {
    const data = await readContract(config, {
        ...DEFAULT_MFN_CONTRACT_CFG,
        functionName: "calculateWithdrawalTokensFromBattle",
        args: [battleId, postId]
    });

    return data;
}


