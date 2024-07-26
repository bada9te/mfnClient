"use client"

import Post from "@/components/entities/post/post";
import { Post as TPost, usePostSuspenseQuery } from "@/utils/graphql-requests/generated/schema"

export default function PostContainer(props: {postId: string}) {
    const {data} = usePostSuspenseQuery({
        variables: {
            _id: props.postId
        }
    });

    return (
        <Post data={data.post as TPost}/>
    );
}