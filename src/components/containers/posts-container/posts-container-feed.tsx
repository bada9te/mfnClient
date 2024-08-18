"use client"
import {usePostsSuspenseQuery, Post as TPost} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/common/pagination/pagination";
import InfoImage from "@/components/common/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";
import RefreshButtonPerContainer from "@/components/common/refresh-btn-container/refresh-btn-container";


export default function PostsContainerFeed(props: TPaginationProps) {
    const { offset, limit, page } = props;

    const { data, refetch } = usePostsSuspenseQuery({
        variables: {
            offset, limit
        }
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit})}/>
            {
                data?.posts.posts?.length
                ?
                <>
                    {
                        data?.posts.posts?.map((post, key) => {
                            return (<Post key={key} data={post as TPost}/>)
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.posts.count as number / limit)}/>
                </>
                :
                <InfoImage text={"No tracks yet"} image="/assets/icons/logo_clear.png"/>
            }
        </>
    );
}