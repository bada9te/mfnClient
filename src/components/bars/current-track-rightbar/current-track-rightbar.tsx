"use client"
import CurrentTrackOwner from "@/components/bars/current-track-rightbar/current-track-owner/current-track-owner";
import Post from "@/components/entities/post/post";
import {useAppSelector} from "@/lib/redux/store";
import {
    Post as TPost,
    usePostLazyQuery,
    usePostQuery, User,
    useUserLazyQuery
} from "@/utils/graphql-requests/generated/schema";
import {useEffect} from "react";

export default function CurrentTrackRightBar() {
    const post = useAppSelector(state => state.player.post);
    const [fetchUser, {data}] = useUserLazyQuery();

    useEffect(() => {
        if (post?.owner._id) {
            fetchUser({
                variables: {
                    _id: post.owner._id,
                }
            });
        }
    }, [post?.owner?._id, fetchUser]);

    return (
        <div className="flex flex-col gap-0 items-center">
            <CurrentTrackOwner user={data?.user as User}/>
            <Post fullWidth data={post as TPost}/>
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
