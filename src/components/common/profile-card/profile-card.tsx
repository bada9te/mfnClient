"use client"
import ImageCropperModal from "@/components/modals/cropper-modal";
import { setUser, setUserAvatar, setUserBackground } from "@/lib/redux/slices/user";
import { useAppDispatch } from "@/lib/redux/store";
import blobToFile, { IBlob } from "@/utils/common-functions/blobToFile";
import {useUserSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import { httpSaveFile } from "@/utils/http-requests/files";
import { useCallback, useRef, useState } from "react";
import config from "@/../next.config.mjs";


export default function ProfileCard(props: {
    isEditable?: boolean;
    userId: string;
}) {
    const { isEditable, userId } = props;
    const [ croppedBlob, setCroppedBlob ] = useState<IBlob | null>(null);
    const [ imageURL, setImageURL ] = useState<string>("");
    const [ imageType, setImageType ] = useState<"avatar" | "background">("avatar");
    const [ file, setFile ] = useState<File | null>(null);
    const cropperModalRef = useRef<HTMLDialogElement | null>(null);
    const dispatch = useAppDispatch();

    const { data } = useUserSuspenseQuery({
        variables: {
            _id: userId
        }
    });

    const handlePicture = (file: File | null, imageType: "avatar" | "background") => {
        if (file !== null) {
            setImageURL(URL.createObjectURL(file));
            setImageType(imageType);
            setFile(file)
            // open cropper
            cropperModalRef.current && cropperModalRef.current.showModal();
        }
    }

    // get cropped (as callback)
    const handleImageCropModalClose = useCallback(async(image: string | null) => {
        if (image) {
            const blob = await fetch(image).then(a => a.blob()) as IBlob;
            const {data} = await httpSaveFile(blobToFile(blob, `${new Date().getTime().toString()}${file?.name || ""}`));

            switch (imageType) {
                case "avatar":
                    dispatch(setUserAvatar(data.data.filename))
                    break;
                case "background": 
                    dispatch(setUserBackground(data.data.filename))
                    break;
                default:
                    break;
            }

        }
    }, [imageType, file])

    return (
        <>
            <ImageCropperModal
                image={imageURL}
                imageType={imageType}
                refDialog={cropperModalRef}
                handleImageCropModalClose={handleImageCropModalClose}
            />
            <div className="m-0 md:mx-8 md:mt-8 card w-full max-h-screen bg-black text-white rounded-none shadow-2xl glass">
                <figure className="max-h-48">
                    <img className="w-full" src={data.user.background.length ? `${config.env?.serverBase}/files/${data.user.avatar}` : "/assets/bgs/profileDefaultBG.png"} alt="background"/>
                </figure>
                <div className="card-body flex flex-col md:flex-row gap-5">
                    <div className="avatar flex justify-center">
                        <div className="w-32 h-32 mask mask-hexagon">
                            <img src={data.user.avatar.length ? data.user.avatar : "/assets/icons/logo_clear.png"} alt="avatar" />
                        </div>
                    </div>
                    <div>
                        <h2 className="card-title flex flex-col md:flex-row">
                            {data.user.nick}
                            <div className="badge glass bg-[#1ba39c] text-white">{data.user.subscribers?.length} followers</div>
                            <div className="badge glass">{data.user.subscribedOn?.length} following</div>
                        </h2>
                        <p className="mt-3 md:mt-0">{data.user.description}</p>
                        <div className="card-actions justify-start mt-3">
                            {
                                !isEditable
                                ?
                                <>
                                    <button className="btn btn-primary w-full md:w-96 glass text-white">Subscribe</button>
                                </>
                                :
                                <>
                                    <label className="form-control w-full md:w-fit">
                                        <div className="label">
                                            <span className="label-text">Avatar</span>
                                            <span className="label-text-alt">.jpg, .png</span>
                                        </div>
                                        <input 
                                            type="file" 
                                            className="file-input file-input-bordered w-full bg-[#1a1a1a] file:glass file:text-white file: placeholder:text-gray-200" 
                                            onInput={e => handlePicture((e.target as HTMLInputElement).files?.[0] || null, "avatar")}
                                        />
                                    </label>
                                    
                                    <label className="form-control w-full md:w-fit">
                                        <div className="label">
                                            <span className="label-text">Background</span>
                                            <span className="label-text-alt">.jpg, .png</span>
                                        </div>
                                        <input 
                                            type="file" 
                                            className="file-input file-input-bordered w-full bg-[#1a1a1a] file:glass file:text-white file: placeholder:text-gray-200" 
                                            onInput={e => handlePicture((e.target as HTMLInputElement).files?.[0] || null, "background")}
                                        />
                                    </label>
                                </>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}