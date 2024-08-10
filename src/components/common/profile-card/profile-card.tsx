"use client"
import ImageCropperModal from "@/components/modals/cropper-modal";
import { setUser, setUserAvatar, setUserBackground } from "@/lib/redux/slices/user";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import blobToFile, { IBlob } from "@/utils/common-functions/blobToFile";
import {useAchievemenmtsCountQuery, useAchievemenmtsCountSuspenseQuery, UserAchievementsData, useUserAchievementsDataSuspenseQuery, useUserSuspenseQuery, useUserSwitchSubscriptionMutation, useUserUpdateMutation} from "@/utils/graphql-requests/generated/schema";
import { httpSaveFile } from "@/utils/http-requests/files";
import { useCallback, useRef, useState } from "react";

import { useSnackbar } from "notistack";
import ProfileProgress from "./profile-progress/profile-progress";
import envCfg from "@/config/env";

const ShareBtn = (props: {
    handleClick: () => void;
}) => {
    return (
        <button className="btn btn-primary w-full glass text-white" onClick={props.handleClick}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                <path fillRule="evenodd" d="M19.902 4.098a3.75 3.75 0 0 0-5.304 0l-4.5 4.5a3.75 3.75 0 0 0 1.035 6.037.75.75 0 0 1-.646 1.353 5.25 5.25 0 0 1-1.449-8.45l4.5-4.5a5.25 5.25 0 1 1 7.424 7.424l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.757-1.757a3.75 3.75 0 0 0 0-5.304Zm-7.389 4.267a.75.75 0 0 1 1-.353 5.25 5.25 0 0 1 1.449 8.45l-4.5 4.5a5.25 5.25 0 1 1-7.424-7.424l1.757-1.757a.75.75 0 1 1 1.06 1.06l-1.757 1.757a3.75 3.75 0 1 0 5.304 5.304l4.5-4.5a3.75 3.75 0 0 0-1.035-6.037.75.75 0 0 1-.354-1Z" clipRule="evenodd" />
            </svg>
            Share
        </button>
    );
}


export default function ProfileCard(props: {
    isEditable?: boolean;
    userId: string;
    disableMargins?: boolean;
}) {
    const { isEditable, userId, disableMargins } = props;
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

    const { data: achievementsData } = useUserAchievementsDataSuspenseQuery({
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
            console.log(data);
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
            const {data} = await httpSaveFile(blobToFile(blob, `${new Date().getTime().toString()}${file?.name || ""}`));

            switch (imageType) {
                case "avatar":
                    refAvatar.current && (refAvatar.current.value = "")
                    dispatch(setUserAvatar(data.data.filename));
                    updateUser({
                        variables: {
                            input: {
                                _id: user?._id as string,
                                what: "avatar",
                                value: data.data.filename
                            }
                        }
                    });
                    break;
                case "background": 
                    refBackground.current && (refBackground.current.value = "");
                    dispatch(setUserBackground(data.data.filename));
                    updateUser({
                        variables: {
                            input: {
                                _id: user?._id as string,
                                what: "background",
                                value: data.data.filename
                            }
                        }
                    });
                    break;
                default:
                    break;
            }

            enqueueSnackbar("Updated", { autoHideDuration: 2000, variant: 'success' });
        }
    }, [imageType, file]);

    const handleShareClick = () => {
        navigator.clipboard.writeText(`${window.location.origin}/profile/${userId}/1`);
        enqueueSnackbar("Link copied", { autoHideDuration: 1500, variant: 'success' });
    }

    return (
        <>
            <ImageCropperModal
                image={imageURL}
                imageType={imageType}
                refDialog={cropperModalRef}
                handleImageCropModalClose={handleImageCropModalClose}
            />
            <div className={`${!disableMargins && 'm-0 md:mx-4 md:mt-4'} card w-full text-white rounded-none md:rounded-2xl shadow-2xl bg-base-300`}>
                <figure className="max-h-48">
                    <img className="w-full" src={data.user.background.length ? `${envCfg.serverBase}/files/${data.user.background}` : "/assets/bgs/profileDefaultBG.png"} alt="background"/>
                </figure>
                <div className="card-body flex flex-col  gap-5">
                    <div className="avatar flex justify-center">
                        <div className="w-32 h-32 mask mask-hexagon">
                            <img src={data.user.avatar.length ? `${envCfg.serverBase}/files/${data.user.avatar}` : "/assets/icons/logo_clear.png"} alt="avatar" />
                        </div>
                    </div>
                    <div>
                        <h2 className="card-title flex flex-col md:flex-row justify-center items-center mb-2">
                            {data.user.nick}
                            <div className="badge glass bg-[#1ba39c] text-white">{data.user.subscribers?.length} followers</div>
                            <div className="badge glass">{data.user.subscribedOn?.length} following</div>
                        </h2>
                        <p className="mt-3 md:mt-0 text-center">{data.user.description}</p>
                        <div className="card-actions justify-start mt-3">
                            {
                                !isEditable
                                ?
                                <>
                                    {
                                        (() => {
                                            if (data.user._id == userId) {
                                                return;
                                            } else {
                                                if (user?._id && data.user.subscribers?.map(i => i._id)?.includes(user._id)) {
                                                    return (
                                                        <button className="btn btn-primary w-full md:w-96 glass text-white" onClick={handleSubscriptionChange}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                                <path d="M3.375 3C2.339 3 1.5 3.84 1.5 4.875v.75c0 1.036.84 1.875 1.875 1.875h17.25c1.035 0 1.875-.84 1.875-1.875v-.75C22.5 3.839 21.66 3 20.625 3H3.375Z" />
                                                                <path fillRule="evenodd" d="m3.087 9 .54 9.176A3 3 0 0 0 6.62 21h10.757a3 3 0 0 0 2.995-2.824L20.913 9H3.087Zm6.133 2.845a.75.75 0 0 1 1.06 0l1.72 1.72 1.72-1.72a.75.75 0 1 1 1.06 1.06l-1.72 1.72 1.72 1.72a.75.75 0 1 1-1.06 1.06L12 15.685l-1.72 1.72a.75.75 0 1 1-1.06-1.06l1.72-1.72-1.72-1.72a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                                                            </svg>
                                                            Unfollow
                                                        </button>
                                                    );
                                                } else {
                                                    return (
                                                        <button className="btn btn-primary w-full md:w-96 glass text-white" onClick={handleSubscriptionChange}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                                                <path fillRule="evenodd" d="M1.5 6.375c0-1.036.84-1.875 1.875-1.875h17.25c1.035 0 1.875.84 1.875 1.875v3.026a.75.75 0 0 1-.375.65 2.249 2.249 0 0 0 0 3.898.75.75 0 0 1 .375.65v3.026c0 1.035-.84 1.875-1.875 1.875H3.375A1.875 1.875 0 0 1 1.5 17.625v-3.026a.75.75 0 0 1 .374-.65 2.249 2.249 0 0 0 0-3.898.75.75 0 0 1-.374-.65V6.375Zm15-1.125a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0V6a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0v.75a.75.75 0 0 0 1.5 0v-.75Zm-.75 3a.75.75 0 0 1 .75.75v.75a.75.75 0 0 1-1.5 0v-.75a.75.75 0 0 1 .75-.75Zm.75 4.5a.75.75 0 0 0-1.5 0V18a.75.75 0 0 0 1.5 0v-.75ZM6 12a.75.75 0 0 1 .75-.75H12a.75.75 0 0 1 0 1.5H6.75A.75.75 0 0 1 6 12Zm.75 2.25a.75.75 0 0 0 0 1.5h3a.75.75 0 0 0 0-1.5h-3Z" clipRule="evenodd" />
                                                            </svg>
                                                            Follow ({data.user.subscribers?.length})
                                                        </button>
                                                        
                                                    );
                                                }
                                            }
                                        })()
                                    }
                                    <ShareBtn handleClick={handleShareClick}/>
                                </>
                                :
                                <>
                                    <label className="form-control w-full md:w-fit rounded-2xl">
                                        <div className="label">
                                            <span className="label-text">Avatar</span>
                                            <span className="label-text-alt">.jpg, .png</span>
                                        </div>
                                        <input 
                                            ref={refAvatar}
                                            type="file" 
                                            className="rounded-xl file-input file-input-bordered w-full file:glass file:text-white file: placeholder:text-gray-200" 
                                            onInput={e => handlePicture((e.target as HTMLInputElement).files?.[0] || null, "avatar")}
                                        />
                                    </label>
                                    
                                    <label className="form-control w-full md:w-fit">
                                        <div className="label">
                                            <span className="label-text">Background</span>
                                            <span className="label-text-alt">.jpg, .png</span>
                                        </div>
                                        <input 
                                            ref={refBackground}
                                            type="file" 
                                            className="rounded-xl file-input file-input-bordered w-full file:glass file:text-white file: placeholder:text-gray-200" 
                                            onInput={e => handlePicture((e.target as HTMLInputElement).files?.[0] || null, "background")}
                                        />
                                    </label>
                                </>
                            }
                        </div>
                    </div>
                    <ProfileProgress 
                        userId={userId} 
                        data={achievementsData.userAchievementsData as UserAchievementsData}
                        achievementsTotal={achievementsCountData.achievemenmtsCount as number}
                    />
                </div>
            </div>
        </>
    );
}