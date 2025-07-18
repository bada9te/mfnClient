"use client"
import ImageCropperModal from "@/app/[lang]/components/modals/cropper-modal";
import { setUserAvatar, setUserBackground } from "@/app/lib/redux/slices/user";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/store";
import blobToFile, { IBlob } from "@/app/utils/common-functions/blobToFile";
import {useAchievemenmtsCountSuspenseQuery, UserAchievementsData, useUserAchievementsDataSuspenseQuery, useUserSuspenseQuery, useUserSwitchSubscriptionMutation, useUserUpdateMutation} from "@/app/utils/graphql-requests/generated/schema";
import { useCallback, useEffect, useRef, useState } from "react";

import { useSnackbar } from "notistack";
import ProfileProgress from "./components/profile-progress";
import Image from "next/image";
import { getDictionary } from "@/app/translations/dictionaries";
import getIpfsUrl from "@/app/utils/common-functions/getIpfsUrl";
import validateFile from "@/app/utils/common-functions/fileValidator";
import { UserMinus, UserPlus } from "lucide-react";


const ShareBtn = (props: {
    handleClick: () => void;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) => {
    return (
        <button className="btn btn-sm w-full  text-base-content" onClick={props.handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
            </svg>
            {props.dictionary.common["profile-card"].share}
        </button>
    );
}


export default function ProfileCard(props: {
    isEditable?: boolean;
    userId: string;
    disableMargins?: boolean;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { isEditable, userId, disableMargins, dictionary } = props;
    const [ isMounted, setIsMounted ] = useState(false);
    const [ imageURL, setImageURL ] = useState<string>("");
    const [ imageType, setImageType ] = useState<"avatar" | "background">("avatar");
    const [ file, setFile ] = useState<File | null>(null);
    const cropperModalRef = useRef<HTMLDialogElement | null>(null);
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();
    const { enqueueSnackbar } = useSnackbar();
    const refAvatar = useRef<HTMLInputElement | null>(null);
    const refBackground = useRef<HTMLInputElement | null>(null);

    const [ updateUser ] = useUserUpdateMutation();
    const [ switchSubscription ] = useUserSwitchSubscriptionMutation({
        variables: {
            input: {
                subscriberId: user?._id as string,
                userId,
            }
        }
    });

    const { data } = useUserSuspenseQuery({
        variables: {
            _id: userId,
        }
    });

    const { data: achievementsData, refetch: refetchAchievementsQuery } = useUserAchievementsDataSuspenseQuery({
        variables: {
            _id: userId,
        }
    });
    
    const { data: achievementsCountData } = useAchievemenmtsCountSuspenseQuery();

    const handlePicture = (file: File | null, imageType: "avatar" | "background") => {
        if (file !== null) {
            setImageURL(URL.createObjectURL(file));
            setImageType(imageType);
            setFile(file);
            // open cropper
            cropperModalRef.current && cropperModalRef.current.showModal();
        }
    }

    const handleSubscriptionChange = () => {
        enqueueSnackbar("Processing...", {autoHideDuration: 1500});
        switchSubscription().then(data => {
            //console.log(data);
            enqueueSnackbar("Done", {autoHideDuration: 2000, variant: 'success'});
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {autoHideDuration: 3000, variant: 'error'});
        });
    }

    // get cropped (as callback)
    const handleImageCropModalClose = useCallback(async(image: string | null) => {
        if (image) {
            enqueueSnackbar("Updating profile...", { autoHideDuration: 1500 });
            
            const blob = await fetch(image).then(a => a.blob()) as IBlob;
            const imageFile = blobToFile(blob, new Date().getTime().toString());

            // validate image
            if (imageFile) {
                const imageValidationFailedMessage = validateFile(imageFile as File, 5);
                if (imageValidationFailedMessage) {
                    enqueueSnackbar(imageValidationFailedMessage, { variant: 'error', autoHideDuration: 4000 });
                    return;
                }
            } else {
                enqueueSnackbar("Image file was not applied", { variant: 'error', autoHideDuration: 3000 });
                return;
            }
            
            if ((imageType == "avatar" && data?.user.avatar) || (imageType == "background" && data?.user.background))  {
                await fetch(`/api/files?file=${imageType == "avatar" ? data.user.avatar.split('_')[0] : data.user.background.split('_')[0]}`, { method: "DELETE" })
                    .catch(console.log);
            }
            

            const dataImage = new FormData();
            dataImage.set("file", imageFile);
            //dataImage.set("groupId", "images");
            
            try {
                const res = await fetch("/api/files", {
                    method: "POST",
                    body: dataImage,
                });

                const jsondata = await res.json();
                const fileCID = jsondata.url;

                switch (imageType) {
                    case "avatar":
                        refAvatar.current && (refAvatar.current.value = "")
                        console.log({fileCID})
                        dispatch(setUserAvatar(fileCID));
                        updateUser({
                            variables: {
                                input: {
                                    _id: user?._id as string,
                                    what: "avatar",
                                    value: fileCID
                                }
                            }
                        });
                        break;
                    case "background": 
                        refBackground.current && (refBackground.current.value = "");
                        dispatch(setUserBackground(fileCID));
                        updateUser({
                            variables: {
                                input: {
                                    _id: user?._id as string,
                                    what: "background",
                                    value: fileCID
                                }
                            }
                        });
                        break;
                    default:
                        break;

                }
                enqueueSnackbar("Updated", { autoHideDuration: 2000, variant: 'success' });
            } catch (error) {
                enqueueSnackbar("Pls try again later", { autoHideDuration: 2000, variant: 'error' });
            }

            
        }
    }, [imageType, file, dispatch, enqueueSnackbar, updateUser, user?._id]);

    const handleShareClick = () => {
        navigator.clipboard.writeText(`${window.location.origin}/profile/${userId}/1`);
        enqueueSnackbar("Link copied", { autoHideDuration: 1500, variant: 'success' });
    }


    useEffect(() => {
        setIsMounted(true);
    }, []);
 

    return (
        <>
            <ImageCropperModal
                dictionary={dictionary}
                image={imageURL}
                imageType={imageType}
                refDialog={cropperModalRef}
                handleImageCropModalClose={handleImageCropModalClose}
            />
            <div className={`m-2 mt-6 md:m-4 mb-0 card w-full text-base-content rounded-2xl md:rounded-2xl shadow-2xl bg-base-300`}>
                <figure className="max-h-48">
                    <Image width={1000} height={400} className="w-full" src={data?.user.background ? getIpfsUrl(data.user.background) : '/assets/bgs/clear.png'} alt="background"/>
                </figure>
                   
                <div className="card-body flex flex-col  gap-5">
                    <div className="avatar flex justify-center">
                        <div className="w-32 h-32 mask mask-hexagon">
                            
                            <Image width={400} height={400} src={data?.user.avatar ? getIpfsUrl(data.user.avatar) : '/assets/bgs/clear.png'} alt="avatar" />
                               
                        </div>
                    </div>
                    <div>
                        <h2 className="card-title flex flex-col md:flex-row justify-center items-center mb-2">
                            {data?.user.nick}
                            <div className="badge  bg-[#1ba39c] text-base-content">{data?.user.subscribers?.length} {dictionary.common["profile-card"].followers}</div>
                            <div className="badge ">{data?.user.subscribedOn?.length} {dictionary.common["profile-card"].following}</div>
                        </h2>
                        <p className="mt-3 md:mt-0 text-center">{data?.user.description}</p>
                        <div className="card-actions justify-start mt-3">
                            {
                                !isEditable
                                ?
                                <>
                                    {
                                        isMounted &&
                                        (() => {
                                            if (data?.user._id == user?._id) {
                                                return;
                                            } else {
                                                if (user?._id && data?.user.subscribers?.map(i => i._id)?.includes(user._id)) {
                                                    return (
                                                        <button className="btn btn-sm w-full bg-red-400/20  text-base-content" onClick={handleSubscriptionChange}>
                                                            <UserMinus/>
                                                            {dictionary.common["profile-card"].unfollow}
                                                        </button>
                                                    );
                                                } else if (user?._id) {
                                                    return (
                                                        <button className="btn btn-sm w-full bg-green-400/20 text-base-content" onClick={handleSubscriptionChange}>
                                                            <UserPlus/>
                                                            {dictionary.common["profile-card"].follow} ({data?.user.subscribers?.length})
                                                        </button>
                                                        
                                                    );
                                                }
                                            }
                                        })()
                                    }
                                    <ShareBtn handleClick={handleShareClick} dictionary={dictionary}/>
                                </>
                                :
                                <>
                                    <label className="form-control w-full md:w-fit rounded-2xl">
                                        <div className="label">
                                            <span className="label-text">{dictionary.common["profile-card"].avatar}</span>
                                            <span className="label-text-alt">.jpg, .png</span>
                                        </div>
                                        <input 
                                            ref={refAvatar}
                                            type="file" 
                                            className="rounded-2xl file-input file-input-bordered w-full file:text-base-content placeholder:text-gray-200" 
                                            onInput={e => handlePicture((e.target as HTMLInputElement).files?.[0] || null, "avatar")}
                                        />
                                    </label>
                                    
                                    <label className="form-control w-full md:w-fit">
                                        <div className="label">
                                            <span className="label-text">{dictionary.common["profile-card"].background}</span>
                                            <span className="label-text-alt">.jpg, .png</span>
                                        </div>
                                        <input 
                                            ref={refBackground}
                                            type="file" 
                                            className="rounded-2xl file-input file-input-bordered w-full file:text-base-content file:placeholder:text-gray-200" 
                                            onInput={e => handlePicture((e.target as HTMLInputElement).files?.[0] || null, "background")}
                                        />
                                    </label>
                                </>
                            }
                        </div>
                    </div>
                    <ProfileProgress 
                        userId={userId} 
                        totalRP={achievementsData?.userAchievementsData?.totalRP || 0}
                        data={achievementsData?.userAchievementsData as UserAchievementsData}
                        achievementsTotal={achievementsCountData?.achievemenmtsCount as number}
                        // @ts-ignore
                        refreshStatistics={() => refetchAchievementsQuery({ _id: userId })}
                        dictionary={dictionary}
                    />
                </div>
            </div>
        </>
    );
}