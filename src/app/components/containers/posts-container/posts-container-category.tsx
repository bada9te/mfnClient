"use client"
import {TPaginationProps} from "@/types/pagination";
import {usePostsByCategorySuspenseQuery, Post as TPost} from "@/app/utils/graphql-requests/generated/schema";
import Post from "@/app/components/entities/post/post";
import Pagination from "@/app/components/common/pagination/pagination";
import InfoImage from "@/app/components/common/info-image/info-image";
import RefreshButtonPerContainer from "@/app/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/app/dictionaries/dictionaries";

export default function PostsContainerCategory(props: TPaginationProps & {category: string; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]}) {
    const { page, offset, limit, category, dictionary } = props;

    const { data, refetch } = usePostsByCategorySuspenseQuery({
        variables: {
            offset, limit, category
        }
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit, category})} dictionary={dictionary}/>
            {
                data?.postsByCategory.posts?.length
                ?
                <>
                    {
                        data?.postsByCategory.posts?.map((post, key) => {
                            return (<Post key={key} data={post as TPost} dictionary={dictionary}/>)
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.postsByCategory.count as number / limit)}/>
                </>
                :
                <InfoImage text={"No tracks yet"} image="/assets/icons/logo_clear.png"/>
            }
        </>
    );
};