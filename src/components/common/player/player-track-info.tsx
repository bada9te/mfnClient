"use client"

import envCfg from "@/config/env";
import { getDictionary } from "@/dictionaries/dictionaries";
import { useAppSelector } from "@/lib/redux/store";
import { usePostLazyQuery, Post, useUserSwitchLikeMutation, useUserSwitchSaveMutation } from "@/utils/graphql-requests/generated/schema";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";


export default function PlayerTrackInfo({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const post = useAppSelector(state => state.player.post);
    const user = useAppSelector(state => state.user.user);
    const { enqueueSnackbar } = useSnackbar();
    const [fetchPostData, {data, loading}] = usePostLazyQuery();
    const [isMounted, setIsMounted] = useState(false);

    const [switchLike] = useUserSwitchLikeMutation({
        variables: {
            input: {
                userId: user?._id as string,
                postId: post?._id as string,
            }
        }
    });
    const [switchInSaved] = useUserSwitchSaveMutation({
        variables: {
            input: {
                userId: user?._id as string,
                postId: post?._id as string,
            }
        }
    })

    // on like click
    const handleSwitchLike = async() => {
        if (!user?._id) {
            enqueueSnackbar("Not authenticated", {autoHideDuration: 1000});
            return;
        }
        await switchLike();
    }

    // on save click
    const handleSwitchInSaved = async() => {
        if (!user?._id) {
            enqueueSnackbar("Not authenticated", {autoHideDuration: 1000});
            return;
        }
        await switchInSaved();
    }

    useEffect(() => {
        if (post && post?._id) {
            fetchPostData({
                variables: {
                    _id: post._id
                }
            });
        }
    }, [post, fetchPostData]);


    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return;
    }
    
    return (
        <div className="flex h-auto flex-col flex-1 gap-1">
            <div className="flex flex-row mb-3 gap-3">
                <Image alt="track-bg" width={400} height={400}
                    src={data?.post?.image ? `${envCfg.serverFilesEndpoint}/images/${data.post.image}` : '/assets/bgs/profileDefaultBG.png'}
                    className="shadow-2xl max-h-[180px] h-[180px] max-w-80 rounded-2xl" 
                />
                <div className="flex flex-col gap-1">
                    <div className="stats glass thin-scrollbar h-36">
                        <div className="stat text-center p-3 px-5">
                            <div className={`cursor-pointer ${user?.likedPosts.find((i: string) => i === data?.post._id as string) && "text-red-500"}`} onClick={handleSwitchLike}>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" fill="currentColor" className="inline-block h-8 w-8">
                                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                                </svg>
                            </div>
                            <div className="stat-title">{dictionary.common.player["track-info"]["total-likes"]}</div>
                            <div className="stat-value text-primary">{data?.post?.likes || 0}</div>
                        </div>

                        <div className="stat text-center p-3">
                            <div className={`cursor-pointer ${user?.savedPosts.find((i: string) => i === data?.post._id as string) && "text-yellow-500"}`} onClick={handleSwitchInSaved}>
                                <svg xmlns="http://www.w3.org/2000/svg" 
                                viewBox="0 0 24 24" fill="currentColor" className="inline-block h-8 w-8">
                                    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="stat-title">{dictionary.common.player["track-info"]["total-saves"]}</div>
                            <div className="stat-value text-primary">{data?.post?.saves || 0}</div>
                        </div>
                    </div>

                    <Link className="btn btn-primary glass btn-sm text-white" href={`/post/${data?.post._id}/${data?.post.owner._id}`}>
                        {dictionary.common.player["track-info"]["track-details"]}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col relative">
                <div className="join flex flex-row absolute justify-end items-end w-full md:hidden">
                    <button className="join-item btn btn-primary btn-sm glass flex justify-center items-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                        </svg>
                    </button>
                    <button className="join-item btn btn-primary btn-sm glass flex justify-center items-center text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <Link className="join-item btn btn-primary btn-sm glass flex justify-center items-center text-white" href={`/post/${data?.post._id}/${data?.post.owner._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
                <p className="text-white text-2xl font-bold">{data?.post?.title}</p>
                <p className="text-white text-md font-bold">{data?.post?.description}</p>
            </div>
        </div>
    );
}