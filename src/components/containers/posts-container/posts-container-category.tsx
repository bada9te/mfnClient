"use client"
import {TPaginationProps} from "@/types/pagination";
import {usePostsByCategorySuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/pagination/pagination";
import InfoImage from "@/components/info-image/info-image";

export default function PostsContainerCategory(props: TPaginationProps & {category: string}) {
    const { page, offset, limit, category } = props;

    const { data } = usePostsByCategorySuspenseQuery({
        variables: {
            offset, limit, category
        }
    });

    return (
        <>
            {
                data?.postsByCategory.posts?.length
                ?
                <>
                    {
                        data?.postsByCategory.posts?.map((post, key) => {
                            return (<Post key={key}/>)
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.postsByCategory.count as number / limit)}/>
                </>
                :
                <InfoImage text={"No tracks yet"}/>
            }
        </>
    );
};