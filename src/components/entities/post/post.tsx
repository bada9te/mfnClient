"use client"
import {
    Post as TPost,
    User,
    useUserSwitchLikeMutation,
    useUserSwitchSaveMutation
} from "@/utils/graphql-requests/generated/schema";
import {useAppDispatch, useAppSelector} from "@/lib/redux/store";
import {setIsPlaying, setPost} from "@/lib/redux/slices/player";
import {useEffect, useState} from "react";
import PostSkeleton from "@/components/entities/post/post-skeleton";
import {useSnackbar} from "notistack";
import Link from "next/link";
import envCfg from "@/config/env";
import ReportModal from "@/components/modals/report-modal";
import formatNumber from "@/utils/common-functions/formatNumber";
import Image from "next/image";
import { getDictionary } from "@/dictionaries/dictionaries";
import { switchPostInLiked, switchPostInSaved } from "@/lib/redux/slices/user";
import { Bookmark, CheckCheck, Cog, Flag, Heart, LinkIcon, Pause, PinOff, Play, SquarePlay, User as UserIcon } from "lucide-react";
import MainButton from "@/components/common/main-button/main-button";
import getTimeSince from "@/utils/common-functions/getTimeSince";


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
        <div className={`card w-fit md:${fullWidth ? 'w-full ' : 'w-80 max-w-80'} bg-base-300 shadow-xl max-h-[550px] text-white glass rounded-xl`}>
            <div className="h-16 flex flex-row gap-3 cursor-pointer rounded-t-xl overflow-hidden">
                <div className="dropdown w-full dropdown-end text-start">
                    <button 
                        className="
                        relative
                        rounded-none
                        h-full
                        text-white font-bold 
                        flex items-center 
                        justify-start px-4
                        shadow-lg bg-base-300 border-base-300 w-full bg-opacity-80"
                        role="button"
                    >
                        <div className="avatar p-0">
                            <div className="w-10 rounded-full shadow-lg">
                                <Image alt="avatar" width={400} height={400}
                                    src={data?.owner?.avatar ? `${envCfg.serverFilesEndpoint}/images/${data.owner.avatar}` : '/assets/icons/logo_clear.png'}/>
                            </div>
                        </div>
                        <p className="text-primary drop-shadow-lg pr-5 flex-1">{data?.owner?.nick}</p>
                        <span className="absolute top-2 right-2 text-sm text-gray-400">{getTimeSince(new Date(+data.createdAt))}</span>
                    </button>
                    <ul tabIndex={0} className="dropdown-content menu glass bg-base-300 rounded-box z-[1] w-52 p-2 mt-3 shadow bg-opacity-20">
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
                    </ul>
                </div>
                
            </div>
            <figure><Image
                width={400} height={400}
                className="max-h-[180px] w-full min-w-80 min-h-[180px]"
                src={data?.image ? `${envCfg.serverFilesEndpoint}/images/${data?.image}` : '/assets/bgs/profileDefaultBG.png'}
                alt="image"/>
            </figure>

            <div className="card-body text-start p-5">
                <h2 className="card-title text-2xl">
                    {data?.title}
                    <div className="badge badge-secondary glass bg-[#1ba39c] text-white">{data?.category}</div>
                </h2>
                <p className="text-lg">{data?.description}</p>
            </div>

            <div className={`stats bg-base-300 glass mx-2 mt-2 thin-scrollbar bg-opacity-20 ${handleRemove && "opacity-60"}`}>
                <div className="stat text-center">
                    <div 
                        className={`${!handleRemove && 'cursor-pointer'} ${user?.likedPosts.find((i: string) => i === data._id) && "text-red-500"}`} 
                        onClick={handleSwitchLike}
                    >
                        <Heart className="inline-block h-8 w-8" fill={user?.likedPosts.find((i: string) => i === data._id) ? "#ef4444" : "#b2ccd6"}/>
                    </div>
                    <div className="stat-title">{dictionary.entities.post["total-likes"]}</div>
                    <div className="stat-value text-primary">{formatNumber(data.likes as number)}</div>
                </div>

                <div className="stat text-center">
                    <div 
                        className={`${!handleRemove && 'cursor-pointer'} ${user?.savedPosts.find((i: string) => i === data._id) && "text-yellow-500"}`} 
                        onClick={handleSwitchInSaved}
                    >
                        <Bookmark className="inline-block h-8 w-8" fill={user?.savedPosts.find((i: string) => i === data._id) ? "#eab308" : "#b2ccd6"}/>
                    </div>
                    <div className="stat-title">{dictionary.entities.post["total-saves"]}</div>
                    <div className="stat-value text-primary">{formatNumber(data.saves as number)}</div>
                </div>
            </div>

            <div className="card-actions justify-center pt-2 flex flex-row overflow-hidden rounded-xl">
                {
                    player.isPlaying && player.post?._id === data?._id
                        ?
                        <MainButton
                            color="error"
                            handler={handlePauseCLick}
                        >
                            <Pause fill="white"/>
                            {dictionary.entities.post.pause}
                        </MainButton>
                        :
                        <MainButton
                            color="primary"
                            handler={handlePlayCLick}
                        >
                            <Play fill="white"/>
                            {dictionary.entities.post.play}
                        </MainButton>
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