"use client"
import {usePostsSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/pagination/pagination";
import InfoImage from "@/components/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";


export default function PostsContainerFeed(props: TPaginationProps) {
    const { offset, limit, page } = props;

    const { data } = usePostsSuspenseQuery({
        variables: {
            offset, limit
        }
    });

    return (
        <>
            {
                data?.posts.posts?.length
                ?
                <>
                    {
                        data?.posts.posts?.map((post, key) => {
                            return (<Post key={key}/>)
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.posts.count as number / limit)}/>
                </>
                :
                <InfoImage text={"No tracks yet"}/>
            }
        </>
    );
}