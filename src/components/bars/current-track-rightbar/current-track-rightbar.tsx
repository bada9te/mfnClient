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
import {genres} from "@/config/categories";
import CategoryLeftBar from "@/components/bars/category-leftbar/category-leftbar";

export default function CurrentTrackRightBar() {
    const post = useAppSelector(state => state.player.post);
    const [fetchUser, {data}] = useUserLazyQuery();
    const category = genres.find(i => i.title.toLowerCase().split(' ').join() === post?.category.toLowerCase().split(' ').join())

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
        <div className="flex flex-col gap-4 items-center text-white">

            <div className="divider"><p className="text text-xl font-bold text-start w-full px-4">Composition</p></div>
            <Post fullWidth data={post as TPost}/>
            <div className="divider"><p className="text text-xl font-bold text-start w-fit px-4">By</p></div>
            <CurrentTrackOwner user={data?.user as User}/>
            <div className="divider"><p className="text text-xl font-bold text-start w-full px-4">In category:</p></div>
            <CategoryLeftBar title={category?.title as string} bgImage={category?.bg as string}/>
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
