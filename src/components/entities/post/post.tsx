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
        <div className={`card w-fit md:${fullWidth ? 'w-full rounded-none' : 'w-80 max-w-80'} bg-black shadow-xl text-white glass`}>
            <div className="m-2 flex flex-row gap-3 cursor-pointer">
                <div className="dropdown w-full dropdown-end text-start">
                    <button 
                        className="
                        btn btn-primary
                        text-white font-bold 
                        flex items-center 
                        justify-start p-1
                        shadow-lg glass w-full"
                        role="button"
                    >
                        <div className="avatar p-0">
                            <div className="w-10 rounded-full shadow-lg">
                                <img
                                    src={data?.owner?.avatar ? `${nextConfig.env?.serverFilesEndpoint}/${data.owner.avatar}` : '/assets/icons/logo_clear.png'}/>
                            </div>
                        </div>
                        <p className="text-primary drop-shadow-lg pr-5 flex-1">{data?.owner?.nick}</p>
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu glass bg-black rounded-box z-[1] w-52 p-2 mt-3 shadow">
                        <li><a>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                            </svg>
                            Open profile
                        </a></li>
                        <li><a>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                                <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                            </svg>
                            Copy link
                        </a></li>
                        <li><a>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z" />
                            </svg>
                            Report
                        </a></li>
                    </ul>
                </div>
                
            </div>
            <figure><img
                className="max-h-[180px] w-full min-w-80"
                src={data?.image ? `${nextConfig.env?.serverFilesEndpoint}/${data?.image}` : '/assets/bgs/profileDefaultBG.png'}
                alt="Shoes"/>
            </figure>

            <div className="card-body text-start p-5">
                <h2 className="card-title text-2xl">
                    {data?.title}
                    <div className="badge badge-secondary glass bg-[#1ba39c] text-white">{data?.category}</div>
                </h2>
                <p className="text-lg">{data?.description}</p>
            </div>

            <div className="stats glass mx-2 mt-2 thin-scrollbar">
                <div className="stat text-center">
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

                <div className="stat text-center">
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

            <div className="card-actions justify-end pt-2 flex flex-row">
                {
                    player.isPlaying && player.post?._id === data?._id
                        ?
                        <button className="btn btn-primary w-full glass bg-red-500 text-white rounded-none" onClick={handlePauseCLick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6">
                                <path fillRule="evenodd"
                                      d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                                      clipRule="evenodd"/>
                            </svg>
                            Pause
                        </button>
                        :
                        <button className="btn btn-primary w-full glass text-white rounded-none" onClick={handlePlayCLick}>
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