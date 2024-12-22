"use client"
import {
    Post as TPost,
    useUserSwitchLikeMutation,
    useUserSwitchSaveMutation
} from "@/app/utils/graphql-requests/generated/schema";
import {useAppDispatch, useAppSelector} from "@/app/lib/redux/store";
import {setIsPlaying, setPost} from "@/app/lib/redux/slices/player";
import {useEffect, useState} from "react";
import PostSkeleton from "@/app/components/entities/post/post-skeleton";
import {useSnackbar} from "notistack";
import Link from "next/link";
import ReportModal from "@/app/components/entities/post/components/report-modal";
import formatNumber from "@/app/utils/common-functions/formatNumber";
import Image from "next/image";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { switchPostInLiked, switchPostInSaved } from "@/app/lib/redux/slices/user";
import { Bookmark, Calendar1, CheckCheck, Clock8, Cog, Flag, Heart, LinkIcon, ListPlus, Pause, PinOff, Play, User as UserIcon } from "lucide-react";
import MainButton from "@/app/components/common/main-button/main-button";
import getTimeSince from "@/app/utils/common-functions/getTimeSince";
import getIpfsUrl from "@/app/utils/common-functions/getIpfsUrl";
import getAudioDuration from "@/app/utils/common-functions/getAudiDuration";
import formatTime from "@/app/utils/common-functions/formatTime";
import AddToPlaylistModal from "./components/add-to-playlist-modal";


export default function Post(props: {
    fullWidth?: boolean;
    data: TPost;
    handleSelect?: (a: TPost) => void;
    handleRemove?: (a: TPost) => void;
    editable?: boolean;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { fullWidth, data, handleSelect, handleRemove, editable, dictionary } = props;
    const dispatch = useAppDispatch();
    const player = useAppSelector(state => state.player);
    const user = useAppSelector(state => state.user.user);
    const [isMounted, setIsMounted] = useState(false);
    const [switchLike] = useUserSwitchLikeMutation();
    const [switchInSaved] = useUserSwitchSaveMutation();
    const { enqueueSnackbar } = useSnackbar();
    const [duration, setDuration] = useState(0);

    const handlePlayCLick = () => {
        dispatch(setPost(data));
    }

    const handlePauseCLick = () => {
        dispatch(setIsPlaying(false));
    }

    useEffect(() => {
        getAudioDuration(getIpfsUrl(data.audio)).then((duration) => {
            setDuration(duration as number);
        })
    }, []);

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
        dispatch(switchPostInLiked({ _id: data._id }));
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
        dispatch(switchPostInSaved({ _id: data._id }))
    }

    const handleLinkCopy = () => {
        navigator.clipboard.writeText(`${window.location.origin}/post/${data._id}/${data.owner?._id}`);
        enqueueSnackbar("Link copied", {variant: 'success', autoHideDuration: 1500});
    }


    return (
        <div className={`card w-fit md:${fullWidth ? 'w-full' : 'w-80 max-w-80'} min-h-[360px] bg-base-100 shadow-xl max-h-[550px] text-base-content rounded-xl relative overflow-hidden`}>
            <div className="h-fit p-2 flex flex-row gap-3 cursor-pointer rounded-t-xl absolute top-0">
                <div className="dropdown w-full dropdown-start text-start">
                    <button 
                        className="
                        relative
                        h-full
                        text-base-content font-bold 
                        flex items-center 
                        justify-start p-1 pr-2
                        rounded-full
                        shadow-lg bg-base-300 border-base-300 w-full"
                        role="button"
                    >
                        <div className="avatar">
                            <div className="w-7 rounded-full shadow-lg">
                                <Image alt="avatar" width={400} height={400}
                                    src={data.owner?.avatar ? getIpfsUrl(data.owner?.avatar) : '/assets/bgs/clear.png'}/>  
                            </div>
                        </div>
                        <p className="text-base-content text-sm drop-shadow-lg pl-1 flex-1 flex flex-row items-center justify-center gap-2">
                            {data?.owner?.nick}
                        </p>
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu  bg-base-300 rounded-box z-[1] w-52 p-2 mt-3 shadow">
                        <li><Link href={data?.owner?._id === user?._id ? "/profile/me/1" : `/profile/${data.owner?._id}/1`}>
                            <UserIcon/>
                            {dictionary.entities.post["open-profile"]}
                        </Link></li>
                        <li><button onClick={handleLinkCopy}>
                            <LinkIcon />
                            {dictionary.entities.post.share}
                        </button></li>
                        <ReportModal
                            dictionary={dictionary}
                            postId={data._id}
                            button={
                                <li><button>
                                    <Flag/>
                                    {dictionary.entities.post.report}
                                </button></li>
                            }
                        />
                        {
                            editable
                            &&
                            <li><Link href={`/profile/me/edit/post/${data._id}`}>
                                <Cog/>
                                {dictionary.entities.post.edit}
                            </Link></li>
                        }
                        {
                            user?._id &&
                            <AddToPlaylistModal
                                dictionary={dictionary}
                                postId={data._id}
                                button={
                                    <li><button>
                                        <ListPlus/>
                                        {dictionary.entities.post["add-to-playlist"]}
                                    </button></li>
                                }
                            />
                        }
                    </ul>
                </div>
                
            </div>
            
            <figure><Image
                width={400} height={400}
                className="max-h-[180px] w-full min-w-80"
                src={getIpfsUrl(data.image)}
                alt="image"/>
            </figure> 

            <div className="card-body text-start p-5 relative">
                {
                    /*
                        <div className="absolute top-3 right-3">
                            <Image src={'/assets/icons/opensea-logo.png'} className="h-7 w-7" width={100} height={100} alt="opensea"/>
                        </div>
                    */
                }
                <h2 className="card-title text-2xl">
                    {data?.title}
                    <div className="badge bg-[#1ba39c] text-base-content">{data?.category}</div>
                </h2>
                <p className="text-lg">{data?.description}</p>
            </div>
            
            <div className={`flex flex-row flex-wrap gap-2 mx-5 mt-2 thin-scrollbar text-[#b2ccd6] relative ${handleRemove && "opacity-60"}`}>

                <div 
                    className={`badge badge-md hover:bg-error hover:text-black ${!handleRemove && 'cursor-pointer'} ${user?.likedPosts.find((i: string) => i === data._id) && "badge-error bg-error"}`} 
                    onClick={handleSwitchLike}
                >
                    <Heart className="inline-block h-6 w-6 border-0" fill={user?.likedPosts.find((i: string) => i === data._id) ? "#ef4444" : "#b2ccd6"}/>
                    <span className="w-full">{dictionary.entities.post["total-likes"]} {formatNumber(data.likes as number)}</span>
                </div>

                <div 
                    className={`badge badge-md hover:bg-warning hover:text-black ${!handleRemove && 'cursor-pointer'} ${user?.savedPosts.find((i: string) => i === data._id) && "badge-warning bg-warning"}`} 
                    onClick={handleSwitchInSaved}
                >
                    <Bookmark className="inline-block h-6 w-6" fill={user?.savedPosts.find((i: string) => i === data._id) ? "#eab308" : "#b2ccd6"}/>
                    <span className="w-full">{dictionary.entities.post["total-saves"]} {formatNumber(data.saves as number)}</span>
                </div>

                <div className="badge badge-md">
                    <Clock8 className="inline-block h-6 w-6"/>
                    <span className="w-full">{formatTime(duration)}</span>
                </div>

                <div className="badge badge-md">
                    <Calendar1 className="inline-block h-5 w-5 mr-1"/>
                    <span className="w-full">{getTimeSince(new Date(+data.createdAt))}</span>
                </div>
                
            </div>
                

            <div className="card-actions justify-center p-2 mt-2 flex flex-row text-[#20252e]">
                {
                    player.isPlaying && player.post?._id === data?._id
                        ?
                        <button className="btn btn-sm w-full btn-error" onClick={handlePauseCLick}>
                            <Pause className="w-5 h-5"/>
                            {dictionary.entities.post.pause}
                        </button>
                        :
                        <button className="btn btn-sm w-full shadow-lg" onClick={handlePlayCLick}>
                            <Play className="w-5 h-5"/>
                            {dictionary.entities.post.play}
                        </button>
                }
            </div>
            <div className="bg-base-300 absolute bottom-[-44px] flex items-center rounded-2xl">
                {
                    handleSelect && 
                    <MainButton
                        handler={() => handleSelect(data)}
                        color="success"
                        height="8"
                        width="fit"
                    >
                        <CheckCheck className="mr-1"/>
                        {dictionary.entities.post.select}
                    </MainButton>
                }
                {
                    handleRemove &&
                    <MainButton
                        handler={() => handleRemove(data)}
                        color="error"
                        height="8"
                        width="fit"
                    >
                        <PinOff className="mr-1"/>
                        {dictionary.entities.post.delete}
                    </MainButton>
                }
            </div>
        </div>
    );
}