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
import { getDictionary } from "@/dictionaries/dictionaries";

type Inputs = {
    title: string;
    description: string;
    image: File[];
    audio: File[];
    genre: string;
    downloadsAllowed: boolean;
}

export default function PostUploadForm({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { formState: {errors}, register, handleSubmit, reset, resetField } = useForm<Inputs>()
    const { enqueueSnackbar } = useSnackbar();
    const [ createPost ] = usePostCreateMutation();
    const currentUser = useAppSelector(state => state.user.user);
    const router = useRouter();
    const cropperModalRef = useRef<HTMLDialogElement | null>(null);
    const [ imageURL, setImageURL ] = useState<string>("");
    const [ imageFile, setImageFile ] = useState<File | null>(null);
    const [ croppedBlob, setCroppedBlob ] = useState<IBlob | null>(null);
    const [ isLoading, setIsLoading ] = useState(false);

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
        setIsLoading(true);
        enqueueSnackbar("Uploading...", { autoHideDuration: 1500 });
        let uploadedAudioName, uploadedImageName;

        await Promise.all([
            httpSaveFile(data?.audio?.[0] as File, "audio").then(({data}) => {
                uploadedAudioName = data.data.filename;
            }).catch(err => {
                enqueueSnackbar(err.response.data.message, { variant: 'error', autoHideDuration: 3000 });
                setIsLoading(false);
            }),
            httpSaveFile(blobToFile(croppedBlob as IBlob, `${new Date().getTime().toString()}${imageFile?.name || ""}`), "image").then(({data}) => {
                uploadedImageName = data.data.filename;
            }).catch(err => {
                enqueueSnackbar(err.response.data.message, { variant: 'error', autoHideDuration: 3000 });
                setIsLoading(false);
            }),
        ]);

        // upload the post itself
        if (uploadedAudioName && uploadedImageName) {
            await createPost({
                variables: {
                    input: {
                        owner:            currentUser?._id as string,
                        title:            data.title,
                        description:      data.description,
                        audio:            uploadedAudioName as unknown as string,
                        image:            uploadedImageName as unknown as string,
                        downloadsAllowed: data.downloadsAllowed,
                        category:         data.genre.toLowerCase(),
                    },
                },
            }).then(() => {
                reset();
                enqueueSnackbar("Post created", { autoHideDuration: 1500, variant: 'success' });
                revalidatePathAction(`/profile/me/1`, 'page');
                revalidatePathAction('/feed/1', 'page');
                router.replace(`/profile/me/1`)
            }).catch(() => {
                setIsLoading(false);
                enqueueSnackbar("Post can not be uploaded", { autoHideDuration: 3000, variant: 'error' });
            });
        }
    }

    return (
        <>
        <ImageCropperModal
            dictionary={dictionary}
            image={imageURL}
            imageType="post-image"
            refDialog={cropperModalRef}
            handleImageCropModalClose={handleImageCropModalClose}
        />
        <div className="card overflow-hidden bg-base-300 shadow-xl glass rounded-2xl">
            <form role="form" className="card-body m-1 pulsar-shadow text-white glass bg-base-300 shadow-2xl rounded-2xl w-80 md:w-96" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">{dictionary.forms["post-edit-upload"].setup}</div>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text-alt">{dictionary.forms["post-edit-upload"].title}</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2 bg-base-300">
                        <input type="text" placeholder={dictionary.forms["post-edit-upload"].title} className="placeholder:text-gray-200 grow"
                            {...register("title", {
                                maxLength: { value: 15, message: `${dictionary.forms["post-edit-upload"]["max-length"]} 15` },
                                required: { value: true, message: dictionary.forms["post-edit-upload"].required }
                            })}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                        </svg>
                    </label>
                    <div className="label">
                        {
                            errors.title &&
                            <span className="label-text-alt text-error">{errors.title.message}</span>
                        }
                    </div>
                </label>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text-alt">{dictionary.forms["post-edit-upload"].description}</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2 bg-base-300">
                        <input type="text" placeholder={dictionary.forms["post-edit-upload"].description} className="placeholder:text-gray-200 grow"
                            {...register("description", {
                                maxLength: { value: 25, message: `${dictionary.forms["post-edit-upload"]["max-length"]} 25` },
                                required: { value: true, message: dictionary.forms["post-edit-upload"].required }
                            })}
                        />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
                            <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                        </svg>
                    </label>
                    <div className="label">
                        {
                            errors.description &&
                            <span className="label-text-alt text-error">{errors.description.message}</span>
                        }
                    </div>
                </label>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">{dictionary.forms["post-edit-upload"].image}</span>
                        <span className="label-text-alt">.jpg, .png</span>
                    </div>
                    <input 
                        type="file" 
                        className="file-input file-input-bordered w-full file:text-white file:placeholder:text-gray-200 bg-base-300" 
                        onInput={e => handlePicture((e.target as HTMLInputElement).files?.[0] || null)}
                        {...register("image", {
                            required: { value: true, message: dictionary.forms["post-edit-upload"].required }
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
                        <span className="label-text">{dictionary.forms["post-edit-upload"].audio}</span>
                        <span className="label-text-alt">.mp3, .wav</span>
                    </div>
                    <input type="file" className="file-input file-input-bordered w-full file:text-white bg-base-300" {
                        ...register("audio", {
                            required: { value: true, message: dictionary.forms["post-edit-upload"].required }
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
                        <span className="label-text">{dictionary.forms["post-edit-upload"].genre}</span>
                    </div>
                    <select className="btn text-start bg-base-300" {
                        ...register("genre", {
                            required: { value: true, message: dictionary.forms["post-edit-upload"].required }
                        })
                    }>
                        {
                            genres.map((gen, key) => {
                                return <option className="text-lg" key={key} value={gen.id}>{gen.id}</option>
                            })
                        }
                    </select>
                </label>

                <div className="form-control mt-4">
                    <label className="label cursor-pointer">
                        <span className="label-text">{dictionary.forms["post-edit-upload"]["downloads-allowed"]}</span>
                        <input type="checkbox" className="checkbox" {
                            ...register("downloadsAllowed")
                        }/>
                    </label>
                </div>

                <div className="form-control mt-4">
                    <button disabled={isLoading} type="submit" className="glass group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                        {
                            isLoading && <span className="loading loading-dots loading-sm mx-2"></span>
                        }
                        {dictionary.forms["post-edit-upload"].submit}
                    </button>
                </div>
            </form>
        </div>
        </>
    );
}