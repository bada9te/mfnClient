"use client"
import {TPaginationProps} from "@/types/pagination";
import {usePostsByCategorySuspenseQuery, Post as TPost} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/common/pagination/pagination";
import InfoImage from "@/components/common/info-image/info-image";
import RefreshButtonPerContainer from "@/components/common/refresh-btn-container/refresh-btn-container";

export default function PostsContainerCategory(props: TPaginationProps & {category: string}) {
    const { page, offset, limit, category } = props;

    const { data, refetch } = usePostsByCategorySuspenseQuery({
        variables: {
            offset, limit, category
        }
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit, category})}/>
            {
                data?.postsByCategory.posts?.length
                ?
                <>
                    {
                        data?.postsByCategory.posts?.map((post, key) => {
                            return (<Post key={key} data={post as TPost}/>)
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