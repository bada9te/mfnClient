"use client"

import Post from "@/app/components/entities/post/post";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { Post as TPost, usePostSuspenseQuery } from "@/app/utils/graphql-requests/generated/schema"

export default function PostContainer(props: {postId: string; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]}) {
    const {data} = usePostSuspenseQuery({
        variables: {
            _id: props.postId
        }
    });

    return (
        <Post data={data?.post as TPost} dictionary={props.dictionary}/>
    );
}