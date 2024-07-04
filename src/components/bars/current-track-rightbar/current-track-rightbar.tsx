"use client"
import CurrentTrackOwner from "@/components/bars/current-track-rightbar/current-track-owner/current-track-owner";
import Post from "@/components/entities/post/post";
import {useAppSelector} from "@/lib/redux/store";
import {
    Post as TPost,
    usePostLazyQuery,
    usePostQuery,
    useUserLazyQuery
} from "@/utils/graphql-requests/generated/schema";
import {useEffect} from "react";

export default function CurrentTrackRightBar() {
    const post = useAppSelector(state => state.player.post);

    return (
        <div className="flex flex-col gap-0 items-center">
            <Post fullWidth data={post as TPost}/>
            <CurrentTrackOwner/>
            <button className="btn btn-neutral w-full">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                    <path fillRule="evenodd"
                          d="M18 10a8 8 0 1 1-16 0 8 8 0 0 1 16 0Zm-5.5-2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM10 12a5.99 5.99 0 0 0-4.793 2.39A6.483 6.483 0 0 0 10 16.5a6.483 6.483 0 0 0 4.793-2.11A5.99 5.99 0 0 0 10 12Z"
                          clipRule="evenodd"/>
                </svg>
                Open profile
            </button>
        </div>
    );
}


/*
useEffect(() => {
        if (post?._id && post?.owner?._id) {
            fetchPost({
                variables: {
                    _id: post._id
                },
            });
            fetchOwner({
                variables: {
                    _id: post.owner._id
                }
            });
        }
    }, [post, fetchPost, fetchOwner]);

    useEffect(() => {
        setIsMounted(true)
    }, []);
*/
