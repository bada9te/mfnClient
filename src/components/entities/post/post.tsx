"use client"
import {
    Post as TPost,
    usePostSwicthInSavedMutation,
    usePostSwitchLikeMutation,
    User
} from "@/utils/graphql-requests/generated/schema";
import nextConfig from "@/../next.config.mjs";
import {useAppDispatch, useAppSelector} from "@/lib/redux/store";
import {setIsPlaying, setPost} from "@/lib/redux/slices/player";
import {cache, useEffect, useState} from "react";
import PostSkeleton from "@/components/entities/post/post-skeleton";
import user from "@/lib/redux/slices/user";
import {revalidatePath} from "next/cache";
import {revalidatePathAction} from "@/actions/revalidation";
import {useSnackbar} from "notistack";
import { POSTS_QUERY } from "@/utils/graphql-requests/posts";
import { useParams } from "next/navigation";
import CommentsModal from "@/components/modals/comments-modal";

export default function Post(props: {
    fullWidth?: boolean;
    data: TPost
}) {
    const { fullWidth, data } = props;
    const dispatch = useAppDispatch();
    const player = useAppSelector(state => state.player);
    const user = useAppSelector(state => state.user.user);
    const [isMounted, setIsMounted] = useState(false);
    const [switchLike] = usePostSwitchLikeMutation();
    const [switchInSaved] = usePostSwicthInSavedMutation();
    const { enqueueSnackbar } = useSnackbar();
    const params = useParams();

    const handlePlayCLick = () => {
        dispatch(setPost(data));
    }

    const handlePauseCLick = () => {
        dispatch(setIsPlaying(false));
    }

    useEffect(() => {
        setIsMounted(true);
    }, []);
    if (!isMounted) {
        return (<PostSkeleton/>);
    }


    // on like click
    const handleSwitchLike = async() => {
        if (!user?._id) {
            enqueueSnackbar("Not authenticated", {autoHideDuration: 1000});
            return;
        }
        await switchLike({
            variables: {
                input: {
                    userId: user?._id as string,
                    postId: data._id
                }
            },
        });
        //revalidatePathAction("/feed/[page]", "page");
    }

    // on save click
    const handleSwitchInSaved = async() => {
        if (!user?._id) {
            enqueueSnackbar("Not authenticated", {autoHideDuration: 1000});
            return;
        }
        await switchInSaved({
            variables: {
                input: {
                    userId: user?._id as string,
                    postId: data._id,
                }
            }
        });
        //revalidatePathAction("/feed/[page]", "page");
    }

    return (
        <div className={`card w-fit md:${fullWidth ? 'w-full rounded-none' : 'w-80 max-w-80'} bg-base-100 shadow-xl text-white`}>
            <figure><img
                className="max-h-[180px] w-full"
                src={data?.image ? `${nextConfig.env?.serverFilesEndpoint}/${data?.image}` : '/assets/bgs/profileDefaultBG.png'}
                alt="Shoes"/>
            </figure>

            <div className="absolute m-5 flex flex-row gap-3 cursor-pointer">
                <div className="avatar">
                    <div className="w-10 rounded-full shadow-lg">
                        <img
                            src={data?.owner?.avatar ? `${nextConfig.env?.serverFilesEndpoint}/${data.owner.avatar}` : '/assets/icons/logo_clear.png'}/>
                    </div>
                </div>
                <div className="text-white w-fit font-bold px-4 flex items-center justify-center rounded-full shadow-lg glass">
                    <p className="text-primary drop-shadow-lg">{data?.owner?.nick}</p>
                </div>
            </div>


            <div className="card-body text-start">
                <h2 className="card-title">
                    {data?.title}
                    <div className="badge badge-secondary">{data?.category}</div>
                </h2>
                <p>{data?.description}</p>
                <div className="card-actions justify-start">
                    <div className="badge badge-outline flex flex-row gap-1">
                        {data?.likedBy?.length} 
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                            <path d="M2.09 15a1 1 0 0 0 1-1V8a1 1 0 1 0-2 0v6a1 1 0 0 0 1 1ZM5.765 13H4.09V8c.663 0 1.218-.466 1.556-1.037a4.02 4.02 0 0 1 1.358-1.377c.478-.292.907-.706.989-1.26V4.32a9.03 9.03 0 0 0 0-2.642c-.028-.194.048-.394.224-.479A2 2 0 0 1 11.09 3c0 .812-.08 1.605-.235 2.371a.521.521 0 0 0 .502.629h1.733c1.104 0 2.01.898 1.901 1.997a19.831 19.831 0 0 1-1.081 4.788c-.27.747-.998 1.215-1.793 1.215H9.414c-.215 0-.428-.035-.632-.103l-2.384-.794A2.002 2.002 0 0 0 5.765 13Z" />
                        </svg>
                    </div>
                    <div className="badge badge-outline flex flex-row gap-1">
                        {data?.savedBy?.length}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                            <path d="M3.75 2a.75.75 0 0 0-.75.75v10.5a.75.75 0 0 0 1.28.53L8 10.06l3.72 3.72a.75.75 0 0 0 1.28-.53V2.75a.75.75 0 0 0-.75-.75h-8.5Z" />
                        </svg>
                    </div>
                    <div className="badge badge-outline flex flex-row gap-1">
                        {data?.comments?.length}
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                            <path d="M1 8.74c0 .983.713 1.825 1.69 1.943.904.108 1.817.19 2.737.243.363.02.688.231.85.556l1.052 2.103a.75.75 0 0 0 1.342 0l1.052-2.103c.162-.325.487-.535.85-.556.92-.053 1.833-.134 2.738-.243.976-.118 1.689-.96 1.689-1.942V4.259c0-.982-.713-1.824-1.69-1.942a44.45 44.45 0 0 0-10.62 0C1.712 2.435 1 3.277 1 4.26v4.482Z" />
                        </svg>
                    </div>
                </div>
            </div>
            <div className="card-actions justify-end p-2 flex flex-row">
                <div className="join">
                    <button
                        className={`btn btn-sm join-item ${data?.likedBy?.find((i: User) => i._id === user?._id) && "text-green-500"}`}
                        onClick={handleSwitchLike}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                             className="size-6">
                            <path
                                d="M7.493 18.5c-.425 0-.82-.236-.975-.632A7.48 7.48 0 0 1 6 15.125c0-1.75.599-3.358 1.602-4.634.151-.192.373-.309.6-.397.473-.183.89-.514 1.212-.924a9.042 9.042 0 0 1 2.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 0 0 .322-1.672V2.75A.75.75 0 0 1 15 2a2.25 2.25 0 0 1 2.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 0 1-2.649 7.521c-.388.482-.987.729-1.605.729H14.23c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 0 0-1.423-.23h-.777ZM2.331 10.727a11.969 11.969 0 0 0-.831 4.398 12 12 0 0 0 .52 3.507C2.28 19.482 3.105 20 3.994 20H4.9c.445 0 .72-.498.523-.898a8.963 8.963 0 0 1-.924-3.977c0-1.708.476-3.305 1.302-4.666.245-.403-.028-.959-.5-.959H4.25c-.832 0-1.612.453-1.918 1.227Z"/>
                        </svg>
                    </button>
                    <button
                        className={`btn btn-sm join-item ${data?.savedBy?.find((i: User) => i._id === user?._id) && "text-yellow-500"}`}
                        onClick={handleSwitchInSaved}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="size-5">
                            <path fillRule="evenodd"
                                  d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                                  clipRule="evenodd"/>
                        </svg>
                    </button>
                    <CommentsModal postData={data as TPost} button={
                        <button className="btn btn-sm join-item">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="size-5">
                                <path fillRule="evenodd"
                                    d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.102 41.102 0 0 1-3.55.414c-.28.02-.521.18-.643.413l-1.712 3.293a.75.75 0 0 1-1.33 0l-1.713-3.293a.783.783 0 0 0-.642-.413 41.108 41.108 0 0 1-3.55-.414C1.993 13.245 1 11.986 1 10.574V5.426c0-1.413.993-2.67 2.43-2.902Z"
                                    clipRule="evenodd"/>
                            </svg>
                        </button>
                    }/>
                   
                    <button className="btn btn-sm join-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="size-5">
                            <path
                                d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z"/>
                        </svg>
                    </button>
                    <button className="btn btn-sm join-item">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="size-5">
                            <path
                                d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z"/>
                            <path
                                d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z"/>
                        </svg>
                    </button>
                </div>

                {
                    player.isPlaying && player.post?._id === data?._id
                        ?
                        <button className="btn btn-primary w-full" onClick={handlePauseCLick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6">
                                <path fillRule="evenodd"
                                      d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                                      clipRule="evenodd"/>
                            </svg>
                            Pause
                        </button>
                        :
                        <button className="btn btn-primary w-full" onClick={handlePlayCLick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="size-5">
                                <path
                                    d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"/>
                        </svg>
                        Play
                    </button>
                }
            </div>
        </div>
    );
}