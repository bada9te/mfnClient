"use client"
import Battle from "@/components/entities/battle/battle";
import Post from "@/components/entities/post/post";
import {Post as TPost, useBattlesByStatusSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import InfoImage from "@/components/common/info-image/info-image";
import Pagination from "@/components/common/pagination/pagination";
import {TPaginationProps} from "@/types/pagination";

export default function BattlesContainer(props: TPaginationProps & { finished: boolean; }) {
    const {offset, limit, finished, page} = props;

    const { data } = useBattlesByStatusSuspenseQuery({
        variables: {
            offset, limit, finished
        }
    });

    return (
        <>
            {
                data?.battlesByStatus.battles?.length
                ?
                <>
                    {
                        data?.battlesByStatus.battles?.map((battle, key) => {
                            return (<Battle key={key} post1={<Post data={battle.post1 as TPost}/>} post2={<Post data={battle.post2 as TPost}/>}/>)
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