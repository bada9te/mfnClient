"use client"

import { getDictionary } from "@/app/translations/dictionaries";
import { useAppSelector } from "@/app/lib/redux/store";
import getIpfsUrl from "@/app/utils/common-functions/getIpfsUrl";
import { usePostLazyQuery, Post, useUserSwitchLikeMutation, useUserSwitchSaveMutation } from "@/app/utils/graphql-requests/generated/schema";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";


export default function PlayerTrackInfo({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"],
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
            <div className="flex flex-col md:flex-row mb-3 gap-3">
                
                <Image alt="track-bg" width={400} height={400}
                    src={data?.post.image ? getIpfsUrl(data.post.image) : '/assets/bgs/clear.png'}
                    className="shadow-2xl max-h-[180px] h-[136px] max-w-full md:max-w-80 rounded-2xl" 
                />
                
                <div className="flex flex-col gap-1 w-full"> 
                    <p className="text-base-content text-2xl font-bold">{data?.post?.title}</p>
                    <p className="text-base-content text-md font-bold">{data?.post?.description}</p>
                    <Link className="mt-3 btn   btn-sm text-base-content" href={`/post/${data?.post._id}/${data?.post.owner?._id}`}>
                        {dictionary.common.player["track-info"]["track-details"]}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>

            <div className="flex flex-col relative">
                <div className="join flex-row absolute justify-end items-end w-full hidden">
                    <button className="join-item btn  btn-sm  flex justify-center items-center text-base-content">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="m9.653 16.915-.005-.003-.019-.01a20.759 20.759 0 0 1-1.162-.682 22.045 22.045 0 0 1-2.582-1.9C4.045 12.733 2 10.352 2 7.5a4.5 4.5 0 0 1 8-2.828A4.5 4.5 0 0 1 18 7.5c0 2.852-2.044 5.233-3.885 6.82a22.049 22.049 0 0 1-3.744 2.582l-.019.01-.005.003h-.002a.739.739 0 0 1-.69.001l-.002-.001Z" />
                        </svg>
                    </button>
                    <button className="join-item btn  btn-sm  flex justify-center items-center text-base-content">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z" clipRule="evenodd" />
                        </svg>
                    </button>
                    <Link className="join-item btn  btn-sm  flex justify-center items-center text-base-content" href={`/post/${data?.post._id}/${data?.post.owner?._id}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M15.28 9.47a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 1 1-1.06-1.06L13.69 10 9.97 6.28a.75.75 0 0 1 1.06-1.06l4.25 4.25ZM6.03 5.22l4.25 4.25a.75.75 0 0 1 0 1.06l-4.25 4.25a.75.75 0 0 1-1.06-1.06L8.69 10 4.97 6.28a.75.75 0 0 1 1.06-1.06Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}