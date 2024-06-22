"use client"
import Battle from "@/components/entities/battle/battle";
import Post from "@/components/entities/post/post";
import {useBattlesByStatusQuery} from "@/utils/graphql-requests/generated/schema";
import BattlesContainerSkeleton from "@/components/containers/battles-container/battles-container-skeleton";
import InfoImage from "@/components/info-image/info-image";
import Pagination from "@/components/pagination/pagination";

export default function BattlesContainer(props: {
    offset: number;
    limit: number;
    finished: boolean;
    page: number;
}) {
    const {offset, limit, finished, page} = props;

    const {data, loading} = useBattlesByStatusQuery({
        variables: {
            offset, limit, finished
        }
    });

    return (
        <>
            {
                loading ?
                <BattlesContainerSkeleton/>
                :
                <>
                    {
                        data?.battlesByStatus.battles?.length
                        ?
                        <>
                            {
                                data?.battlesByStatus.battles?.map((battle, key) => {
                                    return (<Battle key={key} post1={<Post/>} post2={<Post/>}/>)
                                })
                            }
                            <Pagination page={page} maxPage={Number(data?.battlesByStatus.count as number / limit)}/>
                        </>
                        :
                        <InfoImage text={`No ${finished ? "finished" : "active"} battles yet`}/>
                    }
                </>
            }
        </>
    );
}