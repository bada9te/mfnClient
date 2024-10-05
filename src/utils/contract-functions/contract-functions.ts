import { config, MFNAddresses } from "@/config/wagmi"
import { writeContract, readContract, readContracts, getConnectorClient } from "@wagmi/core"
import mfnAbi from "@/config/abis/MusicFromNothingAbi.json";
import envCfg from "@/config/env";

export const generateDEFAULT_MFN_CONTRACT_CFG = (chainId: number) => {
    return {
        // @ts-ignore
        address: MFNAddresses[chainId],
        abi: mfnAbi,
    }
}

export const contractCreateBattle = async(
    battleId: string, 
    post1Id: string,
    post2Id: string,
    hoursBeforeFinish: number,
    chainId: number,
) => {
    console.log({
        ...generateDEFAULT_MFN_CONTRACT_CFG(chainId),
        functionName: "createBattle",
        args: [battleId, post1Id, post2Id, hoursBeforeFinish]
    });
    console.log({config})
    const data = await writeContract(config, {
        ...generateDEFAULT_MFN_CONTRACT_CFG(chainId),
        functionName: "createBattle",
        args: [battleId, post1Id, post2Id, hoursBeforeFinish]
    });

    return data;
}

export const contractMakeBattleVote = async(
    battleId: string, 
    postId: string, 
    amount: number,
    chainId: number,
) => {
    const data = await writeContract(config, {
        ...generateDEFAULT_MFN_CONTRACT_CFG(chainId),
        functionName: "vote",
        args: [battleId, postId, amount]
    });

    return data;
}

export const contractGetTokenTransfersPerPost = async(
    user: string,
    battleId: string, 
    postId: string,
    chainId: number,
) => {
    const data = await readContract(config, {
        ...generateDEFAULT_MFN_CONTRACT_CFG(chainId),
        functionName: "battleTokensTransfers",
        args: [user, battleId, postId]
    });

    return data;
}

export const contractGetTotalVotingsPerPost = async(
    battleId: string, 
    postId: string,
    chainId: number,
) => {
    const data = await readContract(config, {
        ...generateDEFAULT_MFN_CONTRACT_CFG(chainId),
        functionName: "totalTokensPerPost",
        args: [battleId, postId]
    });

    return data;
}

export const contractGetAllImportantDataForBattle = async(
    battleId: string,
    post1Id: string,
    post2Id: string,
    user: string,
    chainId: number,
) => {
    const data = await readContracts(config, {
        contracts: [
            // @ts-ignore
            {
                ...generateDEFAULT_MFN_CONTRACT_CFG(chainId),
                functionName: "totalTokensPerPost",
                args: [battleId, post1Id]
            },
            // @ts-ignore
            {
                ...generateDEFAULT_MFN_CONTRACT_CFG(chainId),
                functionName: "totalTokensPerPost",
                args: [battleId, post2Id]
            },
            // @ts-ignore
            {
                ...generateDEFAULT_MFN_CONTRACT_CFG(chainId),
                functionName: "battleTokensTransfers",
                args: [user, battleId, post1Id]
            },
            // @ts-ignore
            {
                ...generateDEFAULT_MFN_CONTRACT_CFG(chainId),
                functionName: "battleTokensTransfers",
                args: [user, battleId, post2Id]
            }
        ],
    });

    return data;
}

export const contractGetPossibleWithdrawal = async(
    battleId: string,
    user: string,
    chainId: number,
) => {
    const data = await readContract(config, {
        ...generateDEFAULT_MFN_CONTRACT_CFG(chainId),
        functionName: "calculateWithdrawalTokensFromBattle",
        args: [battleId, user]
    });

    return data;
}


