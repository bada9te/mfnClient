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
import CategoryLeftBar from "../category-leftbar/category-leftbar";

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

                <div className="stats stats-vertical p-0 m-0 shadow-2xl">
                    <div className="stat glass">
                        <div className="stat-figure text-primary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"></path>
                        </svg>
                        </div>
                        <div className="stat-title">Total Likes</div>
                        <div className="stat-value text-primary">25.6K</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>

                    <div className="stat glass">
                        <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="inline-block h-8 w-8 stroke-current">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 10V3L4 14h7v7l9-11h-7z"></path>
                        </svg>
                        </div>
                        <div className="stat-title">Page Views</div>
                        <div className="stat-value text-secondary">2.6M</div>
                        <div className="stat-desc">21% more than last month</div>
                    </div>
                </div>
           
            <div className="divider"><p className="text text-xl font-bold text-start w-fit px-4">By</p></div>

            <div className="stats stats-vertical shadow-2xl">
                <div className="stat glass">
                    <div className="stat-figure text-secondary">
                    <div className="avatar">
                        <div className="w-16 rounded-full">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                        </div>
                    </div>
                    </div>
                    <div className="stat-value">86%</div>
                    <div className="stat-title">Tasks done</div>
                    <div className="stat-desc text-secondary">31 tasks remaining</div>
                </div>
            </div>
            
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
