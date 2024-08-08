"use client"
import {
    Post as TPost,
    usePostSwicthInSavedMutation,
    usePostSwitchLikeMutation,
    User
} from "@/utils/graphql-requests/generated/schema";
import {useAppDispatch, useAppSelector} from "@/lib/redux/store";
import {setIsPlaying, setPost} from "@/lib/redux/slices/player";
import {useEffect, useState} from "react";
import PostSkeleton from "@/components/entities/post/post-skeleton";
import {useSnackbar} from "notistack";
import Link from "next/link";
import envCfg from "@/config/env";


export default function Post(props: {
    fullWidth?: boolean;
    data: TPost;
    handleSelect?: (a: TPost) => void;
    handleRemove?: (a: TPost) => void;
    editable?: boolean
}) {
    const { fullWidth, data, handleSelect, handleRemove, editable } = props;
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
        if (handleRemove) {
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
        if (handleRemove) {
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

    const handleLinkCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/post/${data._id}/${data.owner._id}`);
        enqueueSnackbar("Link copied", {variant: 'success', autoHideDuration: 1500});
    }

    return (
        <div className={`card w-fit md:${fullWidth ? 'w-full ' : 'w-80 max-w-80'} bg-base-300 shadow-xl max-h-[550px] text-white glass`}>
            <div className="m-2 flex flex-row gap-3 cursor-pointer">
                <div className="dropdown w-full dropdown-end text-start">
                    <button 
                        className="
                        rounded-full
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
                                    src={data?.owner?.avatar ? `${envCfg.serverFilesEndpoint}/${data.owner.avatar}` : '/assets/icons/logo_clear.png'}/>
                            </div>
                        </div>
                        <p className="text-primary drop-shadow-lg pr-5 flex-1">{data?.owner?.nick}</p>
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu glass bg-base-300 rounded-box z-[1] w-52 p-2 mt-3 shadow">
                        <li><Link href={data?.owner?._id === user?._id ? "/profile/me/1" : `/profile/${data.owner._id}/1`}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M10 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM3.465 14.493a1.23 1.23 0 0 0 .41 1.412A9.957 9.957 0 0 0 10 18c2.31 0 4.438-.784 6.131-2.1.43-.333.604-.903.408-1.41a7.002 7.002 0 0 0-13.074.003Z" />
                            </svg>
                            Open profile
                        </Link></li>
                        <li><button onClick={handleLinkCopy}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M12.232 4.232a2.5 2.5 0 0 1 3.536 3.536l-1.225 1.224a.75.75 0 0 0 1.061 1.06l1.224-1.224a4 4 0 0 0-5.656-5.656l-3 3a4 4 0 0 0 .225 5.865.75.75 0 0 0 .977-1.138 2.5 2.5 0 0 1-.142-3.667l3-3Z" />
                                <path d="M11.603 7.963a.75.75 0 0 0-.977 1.138 2.5 2.5 0 0 1 .142 3.667l-3 3a2.5 2.5 0 0 1-3.536-3.536l1.225-1.224a.75.75 0 0 0-1.061-1.06l-1.224 1.224a4 4 0 1 0 5.656 5.656l3-3a4 4 0 0 0-.225-5.865Z" />
                            </svg>
                            Copy link
                        </button></li>
                        <li><a>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                                <path d="M3.5 2.75a.75.75 0 0 0-1.5 0v14.5a.75.75 0 0 0 1.5 0v-4.392l1.657-.348a6.449 6.449 0 0 1 4.271.572 7.948 7.948 0 0 0 5.965.524l2.078-.64A.75.75 0 0 0 18 12.25v-8.5a.75.75 0 0 0-.904-.734l-2.38.501a7.25 7.25 0 0 1-4.186-.363l-.502-.2a8.75 8.75 0 0 0-5.053-.439l-1.475.31V2.75Z" />
                            </svg>
                            Report
                        </a></li>
                        {
                            editable
                            &&
                            <li><Link href={`/profile/me/edit/post/${data._id}`}>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                     <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32l8.4-8.4Z" />
                                    <path d="M5.25 5.25a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h10.5a3 3 0 0 0 3-3V13.5a.75.75 0 0 0-1.5 0v5.25a1.5 1.5 0 0 1-1.5 1.5H5.25a1.5 1.5 0 0 1-1.5-1.5V8.25a1.5 1.5 0 0 1 1.5-1.5h5.25a.75.75 0 0 0 0-1.5H5.25Z" />
                                </svg>
                                Edit
                            </Link></li>
                        }
                    </ul>
                </div>
                
            </div>
            <figure><img
                className="max-h-[180px] w-full min-w-80"
                src={data?.image ? `${envCfg.serverFilesEndpoint}/${data?.image}` : '/assets/bgs/profileDefaultBG.png'}
                alt="image"/>
            </figure>

            <div className="card-body text-start p-5">
                <h2 className="card-title text-2xl">
                    {data?.title}
                    <div className="badge badge-secondary glass bg-[#1ba39c] text-white">{data?.category}</div>
                </h2>
                <p className="text-lg">{data?.description}</p>
            </div>

            <div className={`stats bg-base-300 glass mx-2 mt-2 thin-scrollbar ${handleRemove && "opacity-60"}`}>
                <div className="stat text-center">
                    <div 
                        className={`${!handleRemove && 'cursor-pointer'} ${data?.likedBy?.find((i: User) => i._id === user?._id) && "text-red-500"}`} 
                        onClick={handleSwitchLike}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" fill="currentColor" className="inline-block h-8 w-8">
                            <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                        </svg>
                    </div>
                    <div className="stat-title">Total Likes</div>
                    <div className="stat-value text-primary">{data.likedBy?.length}</div>
                </div>

                <div className="stat text-center">
                    <div 
                        className={`${!handleRemove && 'cursor-pointer'} ${data?.savedBy?.find((i: User) => i._id === user?._id) && "text-yellow-500"}`} 
                        onClick={handleSwitchInSaved}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" 
                        viewBox="0 0 24 24" fill="currentColor" className="inline-block h-8 w-8">
                            <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
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
                        <button className="btn btn-primary w-full glass bg-red-500 text-white " onClick={handlePauseCLick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                 className="size-6">
                                <path fillRule="evenodd"
                                      d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z"
                                      clipRule="evenodd"/>
                            </svg>
                            Pause
                        </button>
                        :
                        <button className="btn btn-primary w-full glass text-white " onClick={handlePlayCLick}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                 className="size-5">
                                <path
                                    d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z"/>
                        </svg>
                            Play
                        </button>
                }
            </div>
            <div className="bg-base-300 absolute bottom-[-32px] flex items-center">
                {
                    handleSelect &&
                    <button className="btn btn-sm btn-success w-fit glass text-white bg-green-900" onClick={() => handleSelect(data)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                        Select
                    </button>
                }
                {
                    handleRemove &&
                    <button className="btn btn-sm btn-error w-fit bottom-[-32px] glass bg-red-900 text-white" onClick={() => handleRemove(data)}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm3 10.5a.75.75 0 0 0 0-1.5H9a.75.75 0 0 0 0 1.5h6Z" clipRule="evenodd" />
                        </svg>
                        Delete
                    </button>
                }
            </div>
        </div>
    );
}