"use client"
import {usePostsSuspenseQuery, Post as TPost} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/common/pagination/pagination";
import InfoImage from "@/components/common/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";
import RefreshButtonPerContainer from "@/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/dictionaries/dictionaries";


export default function PostsContainerFeed(props: TPaginationProps & { dictionary: Awaited<ReturnType<typeof getDictionary>>["components"] }) {
    const { offset, limit, page, dictionary } = props;

    const { data, refetch } = usePostsSuspenseQuery({
        variables: {
            offset, limit
        }
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit})} dictionary={dictionary}/>
            {
                data?.posts.posts?.length
                ?
                <>
                    {
                        data?.posts.posts?.map((post, key) => {
                            return (<Post key={key} data={post as TPost} dictionary={dictionary}/>)
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