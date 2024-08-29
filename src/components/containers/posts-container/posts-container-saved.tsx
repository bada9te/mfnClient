"use client"
import {Post as TPost, usePostsSavedByUserSuspenseQuery, usePostsSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/common/pagination/pagination";
import InfoImage from "@/components/common/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";
import RefreshButtonPerContainer from "@/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/dictionaries/dictionaries";


export default function PostsContainerSaved(props: TPaginationProps & { userId: string; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"] }) {
    const { offset, limit, page, userId, dictionary } = props;

    const { data, refetch } = usePostsSavedByUserSuspenseQuery({
        variables: {
            offset, limit, user: userId
        }
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit, user: userId})} dictionary={dictionary}/>
            {
                data?.postsSavedByUser.posts?.length
                ?
                <>
                    {
                        data?.postsSavedByUser.posts?.map((post, key) => {
                            return (<Post key={key} data={post as TPost} dictionary={dictionary}/>)
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.postsSavedByUser.count as number / limit)}/>
                </>
                :
                <InfoImage text={"No tracks yet"} image="/assets/icons/logo_clear.png"/>
            }
        </>
    );
}