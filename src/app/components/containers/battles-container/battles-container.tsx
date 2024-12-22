"use client"
import Battle from "@/app/components/entities/battle/battle";
import {Battle as TBattle, useBattlesByStatusSuspenseQuery} from "@/app/utils/graphql-requests/generated/schema";
import InfoImage from "@/app/components/common/info-image/info-image";
import Pagination from "@/app/components/common/pagination/pagination";
import {TPaginationProps} from "@/types/pagination";
import RefreshButtonPerContainer from "@/app/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import BattleSkeleton from "@/app/components/entities/battle/battles-skeleton";


export default function BattlesContainer(props: TPaginationProps & { finished: boolean; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"] }) {
    const {offset, limit, finished, page, dictionary} = props;

    const { data, refetch } = useBattlesByStatusSuspenseQuery({
        variables: {
            offset, limit, finished
        },
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit, finished})} dictionary={dictionary}/>
            {
                data?.battlesByStatus.battles?.length
                ?
                <>
                    {
                        data?.battlesByStatus.battles?.map((battle, key) => {
                            return (<Battle key={key} battleData={battle as TBattle} dictionary={dictionary}/>)
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.battlesByStatus.count as number / limit)}/>
                </>
                :
                <InfoImage text={`No ${finished ? "finished" : "active"} battles yet`} image="/assets/icons/battle-disk.png"/>
            }
        </>
    );
}