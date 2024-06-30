"use client"
import {usePostsSuspenseQuery, Post as TPost} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/common/pagination/pagination";
import InfoImage from "@/components/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";


export default function PostsContainerFeed(props: TPaginationProps) {
    const { offset, limit, page } = props;

    const { data } = usePostsSuspenseQuery({
        variables: {
            offset, limit
        }
    });

    console.log(data)

    return (
        <>
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
                <InfoImage text={"No tracks yet"}/>
            }
        </>
    );
}