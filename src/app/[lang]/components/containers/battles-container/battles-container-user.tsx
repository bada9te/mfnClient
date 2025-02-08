"use client"
import Battle from "../../entities/battle/battle";
import {Battle as TBattle, useBattlesUserParticipatedInSuspenseQuery} from "@/app/utils/graphql-requests/generated/schema";
import InfoImage from "@/app/[lang]/components/common/info-image/info-image";
import Pagination from "@/app/[lang]/components/common/pagination/pagination";
import {TPaginationProps} from "@/app/types/pagination";
import RefreshButtonPerContainer from "@/app/[lang]/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/app/translations/dictionaries";
import { useAccount, useWriteContract } from "wagmi";
import { config, MFNAddresses } from "@/app/lib/rainbowkit/config";
import MfnAbi from "@/app/lib/rainbowkit/abis/MusicFromNothingAbi.json";
import { useSnackbar } from "notistack";
import { waitForTransactionReceipt } from "@wagmi/core";


export default function BattlesContainerUser(props: TPaginationProps & { userId: string; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"] }) {
    const {offset, limit, userId, page, dictionary} = props;

    const { data, refetch } = useBattlesUserParticipatedInSuspenseQuery({
        variables: {
            offset, limit, userId
        },
    });

    const { chainId } = useAccount();
    const { writeContractAsync } = useWriteContract();
    const { enqueueSnackbar } = useSnackbar();

    const handleWithdrawAllClick = () => {
        enqueueSnackbar("Withdrawing...", { autoHideDuration: 1500 });
        writeContractAsync({
            // @ts-ignore
            address: MFNAddresses[chainId],
            abi: MfnAbi,
            functionName: "withdrawTokensFromAllBattles"
        }).then(async (hash) => {
            enqueueSnackbar("TX sent, waiting for confirminations...", { autoHideDuration: 4000 });
            await waitForTransactionReceipt(config, {
                hash,
                confirmations: 2
            });
            enqueueSnackbar("Done", { variant: 'success', autoHideDuration: 2000 });
        }).catch(err => {
            console.log(err);
            enqueueSnackbar("Sth went wrong, pls try again later", { variant: 'error', autoHideDuration: 3000 });
        });
    }

    return (
        <>
            <RefreshButtonPerContainer 
                handleClick={() => refetch({offset, limit, userId})} 
                dictionary={dictionary} 
                addWithdrawAllBtn 
                handleWithdrawClick={handleWithdrawAllClick}
            />
            {
                data?.battlesUserParticipatedIn.battles?.length
                ?
                <>
                    {
                        data?.battlesUserParticipatedIn.battles?.map((battle, key) => {
                            return (<Battle key={key} battleData={battle as TBattle} dictionary={dictionary}/>)
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.battlesUserParticipatedIn.count as number / limit)}/>
                </>
                :
                <InfoImage text={`No battles yet`} image="/assets/icons/battle-disk.png"/>
            }
        </>
    );
}