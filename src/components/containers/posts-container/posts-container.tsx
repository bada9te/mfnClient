"use client"
import {usePostsQuery} from "@/utils/graphql-requests/generated/schema";
import PostsContainerSkeleton from "@/components/containers/posts-container/posts-container-skeleton";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/pagination/pagination";


export default function PostsContainer(props: {
    offset: number;
    limit: number;
    page: number;
    category?: string;
}) {
    const { offset, limit, page, category } = props;

    const { data, loading } = usePostsQuery({
        variables: {
            offset, limit
        }
    });

    return (
        <>
            {
                loading
                ?
                <PostsContainerSkeleton/>
                :
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
                        "No tracks yet"
                    }
                </>
            }
        </>
    );
}