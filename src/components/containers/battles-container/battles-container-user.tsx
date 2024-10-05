"use client"
import Battle from "@/components/entities/battle/battle";
import {Battle as TBattle, useBattlesUserParticipatedInSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import InfoImage from "@/components/common/info-image/info-image";
import Pagination from "@/components/common/pagination/pagination";
import {TPaginationProps} from "@/types/pagination";
import RefreshButtonPerContainer from "@/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/dictionaries/dictionaries";


export default function BattlesContainerUser(props: TPaginationProps & { userId: string; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"] }) {
    const {offset, limit, userId, page, dictionary} = props;

    const { data, refetch } = useBattlesUserParticipatedInSuspenseQuery({
        variables: {
            offset, limit, userId
        },
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit, userId})} dictionary={dictionary}/>
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