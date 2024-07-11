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


            <div className="card-body text-start pb-2">
                <h2 className="card-title">
                    {data?.title}
                    <div className="badge badge-secondary glass bg-purple-500">{data?.category}</div>
                </h2>
                <p>{data?.description}</p>
            </div>

            <div className="stats glass mx-2 rounded-lg">
                <div className="stat">
                    <div className="stat-title">
                        <button
                            className={`join-item ${data?.likedBy?.find((i: User) => i._id === user?._id) && "text-green-500"}`}
                            onClick={handleSwitchLike}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                            </svg>
                        </button>
                    </div>
                    <div className="stat-value text-primary text-2xl">{data?.likedBy?.length}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">
                        <button
                            className={`join-item ${data?.savedBy?.find((i: User) => i._id === user?._id) && "text-yellow-500"}`}
                            onClick={handleSwitchInSaved}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className="size-5">
                                <path fillRule="evenodd"
                                    d="M10 2c-1.716 0-3.408.106-5.07.31C3.806 2.45 3 3.414 3 4.517V17.25a.75.75 0 0 0 1.075.676L10 15.082l5.925 2.844A.75.75 0 0 0 17 17.25V4.517c0-1.103-.806-2.068-1.93-2.207A41.403 41.403 0 0 0 10 2Z"
                                    clipRule="evenodd"/>
                            </svg>
                        </button>
                    </div>
                    <div className="stat-value text-primary text-2xl">{data?.savedBy?.length}</div>
                </div>

                <div className="stat">
                    <div className="stat-title">
                        <CommentsModal postData={data as TPost} button={
                            <button className="join-item">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                    className="size-5">
                                    <path fillRule="evenodd"
                                        d="M3.43 2.524A41.29 41.29 0 0 1 10 2c2.236 0 4.43.18 6.57.524 1.437.231 2.43 1.49 2.43 2.902v5.148c0 1.413-.993 2.67-2.43 2.902a41.102 41.102 0 0 1-3.55.414c-.28.02-.521.18-.643.413l-1.712 3.293a.75.75 0 0 1-1.33 0l-1.713-3.293a.783.783 0 0 0-.642-.413 41.108 41.108 0 0 1-3.55-.414C1.993 13.245 1 11.986 1 10.574V5.426c0-1.413.993-2.67 2.43-2.902Z"
                                        clipRule="evenodd"/>
                                </svg>
                            </button>
                        }/>
                    </div>
                    <div className="stat-value text-primary text-2xl">{data?.comments?.length}</div>
                </div>
            </div>

            <div className="card-actions justify-end p-2 flex flex-row">
                {
                    player.isPlaying && player.post?._id === data?._id
                        ?
                        <button className="btn btn-primary w-full glass bg-pink-500 rounded-lg" onClick={handlePauseCLick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6">
                                <path fillRule="evenodd"
                                      d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                                      clipRule="evenodd"/>
                            </svg>
                            Pause
                        </button>
                        :
                        <button className="btn btn-primary w-full glass bg-pink-500 rounded-lg" onClick={handlePlayCLick}>
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