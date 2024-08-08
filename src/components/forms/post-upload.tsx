"use client"
import {genres} from "@/config/categories";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {httpSaveFile} from "@/utils/http-requests/files";
import {usePostCreateMutation} from "@/utils/graphql-requests/generated/schema";
import {useAppSelector} from "@/lib/redux/store";
import {useRouter} from "next/navigation";
import { useRef, useState } from "react";
import ImageCropperModal from "../modals/cropper-modal";
import blobToFile, { IBlob } from "@/utils/common-functions/blobToFile";
import { revalidatePathAction } from "@/actions/revalidation";

type Inputs = {
    title: string;
    description: string;
    image: File[];
    audio: File[];
    genre: string;
    downloadsAllowed: boolean;
}

export default function PostUploadForm() {
    const { formState: {errors}, register, handleSubmit, reset, resetField } = useForm<Inputs>()
    const { enqueueSnackbar } = useSnackbar();
    const [ createPost ] = usePostCreateMutation();
    const currentUser = useAppSelector(state => state.user.user);
    const router = useRouter();
    const cropperModalRef = useRef<HTMLDialogElement | null>(null);
    const [ imageURL, setImageURL ] = useState<string>("");
    const [ imageFile, setImageFile ] = useState<File | null>(null);
    const [ croppedBlob, setCroppedBlob ] = useState<IBlob | null>(null);

    const handlePicture = (file: File | null) => {
        if (file !== null) {
            setImageURL(URL.createObjectURL(file));
            setImageFile(file);
            // open cropper
            cropperModalRef.current && cropperModalRef.current.showModal();
        }
    }

    // get cropped (as callback)
    const handleImageCropModalClose = async(image: string | null) => {
        if (!image) {
            resetField("image");
        } else {
            const blob = await fetch(image).then(a => a.blob()) as IBlob;
            setCroppedBlob(blob);
        }
    }

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        enqueueSnackbar("Uploading...", { autoHideDuration: 1500 });
        let uploadedAudioName, uploadedImageName;

        await Promise.all([
            httpSaveFile(data?.audio?.[0] as File).then(({data}) => {
                uploadedAudioName = data.data.filename;
            }).catch(err => {
                enqueueSnackbar(err.response.data.message, { variant: 'error', autoHideDuration: 3000 });
            }),
            httpSaveFile(blobToFile(croppedBlob as IBlob, `${new Date().getTime().toString()}${imageFile?.name || ""}`)).then(({data}) => {
                uploadedImageName = data.data.filename;
            }).catch(err => {
                enqueueSnackbar(err.response.data.message, { variant: 'error', autoHideDuration: 3000 });
            }),
        ]);

        // upload the post itself
        await createPost({
            variables: {
                input: {
                    owner:            currentUser?._id as string,
                    title:            data.title,
                    description:      data.description,
                    audio:            uploadedAudioName as unknown as string,
                    image:            uploadedImageName as unknown as string,
                    downloadsAllowed: data.downloadsAllowed,
                    category:         data.genre,
                },
            },
        }).then(() => {
            reset();
            enqueueSnackbar("Post created", { autoHideDuration: 1500, variant: 'success' });
            revalidatePathAction(`/profile/me/1`, 'page');
            revalidatePathAction('/feed/1', 'page');
            router.replace(`/profile/me/1`)
        }).catch(() => {
            enqueueSnackbar("Post can not be uploaded", { autoHideDuration: 3000, variant: 'error' });
        });
    }

    return (
        <>
        <ImageCropperModal
            image={imageURL}
            imageType="post-image"
            refDialog={cropperModalRef}
            handleImageCropModalClose={handleImageCropModalClose}
        />
        <div className="card overflow-hidden bg-base-300 shadow-xl glass">
            <form className="card-body m-1 pulsar-shadow text-white glass bg-base-300 shadow-2xl rounded-2xl" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">Post setup</div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Track title</span>
                    </label>
                    <input type="text" placeholder="Track title" className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                        ...register("title", {
                            maxLength: { value: 15, message: "Max length must be 15" },
                            required: { value: true, message: "This field is required" }
                        })
                    }/>
                    {
                        errors.title &&
                        <label className="label">
                            <span className="label-text text-error">{errors.title.message}</span>
                        </label>
                    }
                </div>

                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Track description</span>
                    </label>
                    <input type="text" placeholder="Track description" className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                        ...register("description", {
                            maxLength: { value: 25, message: "Max length must be 25" },
                            required: { value: true, message: "This field is required" }
                        })
                    }/>
                    {
                        errors.description &&
                        <label className="label">
                            <span className="label-text text-error">{errors.description.message}</span>
                        </label>
                    }
                </div>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Track image</span>
                        <span className="label-text-alt">.jpg, .png</span>
                    </div>
                    <input 
                        type="file" 
                        className="file-input file-input-bordered w-full file:glass file:text-white file: placeholder:text-gray-200" 
                        onInput={e => handlePicture((e.target as HTMLInputElement).files?.[0] || null)}
                        {...register("image", {
                            required: { value: true, message: "This field is required" }
                        })}
                    />
                    {
                        errors.image &&
                        <label className="label">
                            <span className="label-text text-error">{errors.image.message}</span>
                        </label>
                    }
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Track audio</span>
                        <span className="label-text-alt">.mp3, .wav</span>
                    </div>
                    <input type="file" className="file-input file-input-bordered w-full file:text-white file:glass file:" {
                        ...register("audio", {
                            required: { value: true, message: "This field is required" }
                        })
                    }/>
                    {
                        errors.audio &&
                        <label className="label">
                            <span className="label-text text-error">{errors.audio.message}</span>
                        </label>
                    }
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">Genre</span>
                    </div>
                    <select className="btn text-start glass" {
                        ...register("genre", {
                            required: { value: true, message: "This field is required" }
                        })
                    }>
                        {
                            genres.map((gen, key) => {
                                return <option className="text-lg" key={key} value={gen.title}>{gen.title}</option>
                            })
                        }
                    </select>
                </label>

                <div className="form-control mt-4">
                    <label className="label cursor-pointer">
                        <span className="label-text">Downloads allowed</span>
                        <input type="checkbox" className="checkbox checkbox-primary" {
                            ...register("downloadsAllowed")
                        }/>
                    </label>
                </div>

                <div className="form-control mt-4">
                    <button className="btn btn-primary glass text-white">Upload</button>
                </div>
            </form>
        </div>
        </>
    );
}