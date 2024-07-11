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
import {useEffect, useState} from "react";
import PostSkeleton from "@/components/entities/post/post-skeleton";
import {useSnackbar} from "notistack";


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
    }

    return (
        <div className={`card w-fit md:${fullWidth ? 'w-full rounded-none' : 'w-80 max-w-80'} bg-base-300 shadow-xl text-white glass`}>
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

            <div className="stats glass mx-2 mt-2 rounded-lg thin-scrollbar">
                <div className="stat">
                    <div className={`cursor-pointer ${data?.likedBy?.find((i: User) => i._id === user?._id) && "text-green-500"}`} onClick={handleSwitchLike}>
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
                    <div className="stat-value text-primary">{data.likedBy?.length}</div>
                </div>

                <div className="stat">
                    <div className={`cursor-pointer ${data?.savedBy?.find((i: User) => i._id === user?._id) && "text-yellow-500"}`} onClick={handleSwitchInSaved}>
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
                    <div className="stat-title">Total Saves</div>
                    <div className="stat-value text-primary">{data.savedBy?.length}</div>
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