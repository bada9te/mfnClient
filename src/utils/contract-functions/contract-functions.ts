import { config } from "@/config/wagmi"
import { writeContract, readContract } from "@wagmi/core"
import mfnAbi from "@/config/MusicFromNothingAbi.json";
import envCfg from "@/config/env";


export const contractMakeBattleVote = async(battleId: string, amount: number) => {
    const data = await writeContract(config, {
        address: envCfg.mfnContractAddress as `0x${string}`,
        abi: mfnAbi,
        functionName: "vote",
        args: [battleId, amount]
    });

    return data;
}
