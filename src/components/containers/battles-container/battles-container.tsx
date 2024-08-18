"use client"
import Battle from "@/components/entities/battle/battle";
import {Battle as TBattle, Post as TPost, useBattlesByStatusSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import InfoImage from "@/components/common/info-image/info-image";
import Pagination from "@/components/common/pagination/pagination";
import {TPaginationProps} from "@/types/pagination";
import RefreshButtonPerContainer from "@/components/common/refresh-btn-container/refresh-btn-container";


export default function BattlesContainer(props: TPaginationProps & { finished: boolean; }) {
    const {offset, limit, finished, page} = props;

    const { data, refetch } = useBattlesByStatusSuspenseQuery({
        variables: {
            offset, limit, finished
        },
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit, finished})}/>
            {
                data?.battlesByStatus.battles?.length
                ?
                <>
                    {
                        data?.battlesByStatus.battles?.map((battle, key) => {
                            return (<Battle key={key} battleData={battle as TBattle}/>)
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