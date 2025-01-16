"use client"
import Battle from "../../entities/battle/battle";
import {Battle as TBattle, useBattlesUserParticipatedInSuspenseQuery} from "@/app/utils/graphql-requests/generated/schema";
import InfoImage from "@/app/[lang]/components/common/info-image/info-image";
import Pagination from "@/app/[lang]/components/common/pagination/pagination";
import {TPaginationProps} from "@/app/types/pagination";
import RefreshButtonPerContainer from "@/app/[lang]/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/app/translations/dictionaries";


export default function BattlesContainerUser(props: TPaginationProps & { userId: string; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"] }) {
    const {offset, limit, userId, page, dictionary} = props;

    const { data, refetch } = useBattlesUserParticipatedInSuspenseQuery({
        variables: {
            offset, limit, userId
        },
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit, userId})} dictionary={dictionary} addWithdrawAllBtn/>
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