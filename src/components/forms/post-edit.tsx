"use client"
import {genres} from "@/config/categories";
import {SubmitHandler, useForm} from "react-hook-form";
import {useSnackbar} from "notistack";
import {httpSaveFile} from "@/utils/http-requests/files";
import {usePostUpdateMutation} from "@/utils/graphql-requests/generated/schema";
import { useRef, useState } from "react";
import ImageCropperModal from "../modals/cropper-modal";
import blobToFile, { IBlob } from "@/utils/common-functions/blobToFile";
import { getDictionary } from "@/dictionaries/dictionaries";

type InputsTitle = {
    title: string;
}

type InputsDescr = {
    description: string;
}

type InputsImage = {
    image: File[];
}

type InputsAudio = {
    audio: File[];
}

export default function PostEditForm(props: {
    posId: string;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { posId, dictionary } = props;
    const { 
        formState: {errors: errorTitle}, 
        register: registerTitle, 
        handleSubmit: handleSubmitTitle, 
        reset: resetTitle 
    } = useForm<InputsTitle>();
    const { 
        formState: {errors: errorDescr}, 
        register: registerDescr, 
        handleSubmit: handleSubmitDescr, 
        reset: resetDescr
    } = useForm<InputsDescr>();
    const { 
        formState: {errors: errorImage}, 
        register: registerImage, 
        handleSubmit: handleSubmitImage, 
        reset: resetImage,
        resetField: resetFieldImage
    } = useForm<InputsImage>();
    const { 
        formState: {errors: errorAudio}, 
        register: registerAudio, 
        handleSubmit: handleSubmitAudio, 
        reset: resetAudio
    } = useForm<InputsAudio>();
    const [updatePostMutation] = usePostUpdateMutation();

    const { enqueueSnackbar } = useSnackbar();
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
            resetFieldImage("image");
        } else {
            const blob = await fetch(image).then(a => a.blob()) as IBlob;
            setCroppedBlob(blob);
        }
    }

    // TITLE
    const onSubmitTitle: SubmitHandler<InputsTitle> = async(data) => {
        updatePost("title", data.title);
    }

    // DESCR
    const onSubmitDescr: SubmitHandler<InputsDescr> = async(data) => {
        updatePost("description", data.description);
    }

    // AUDIO
    const onSubmitAudio: SubmitHandler<InputsAudio> = async(data) => {
        enqueueSnackbar("Uploading...", {autoHideDuration: 1500});
        let uploadedAudioName;
        await httpSaveFile(data.audio[0], "audio").then(data => {
            uploadedAudioName = data.data.filename;
        })
        updatePost("audio", String(uploadedAudioName));
    }

    // IMAGE
    const onSubmitImage: SubmitHandler<InputsImage> = async(data) => {
        enqueueSnackbar("Uploading...", { autoHideDuration: 1500 });
        let uploadedImageName;
        await httpSaveFile(blobToFile(croppedBlob as IBlob, `${new Date().getTime().toString()}${imageFile?.name || ""}`), "image").then(({data}) => {
            uploadedImageName = data.data.filename;
        }).catch(err => {
            enqueueSnackbar(err.response.data.message, { variant: 'error', autoHideDuration: 3000 });
        }),
        updatePost("image", String(uploadedImageName));
    }
    
    // DOWNLOADS ALLOWED
    const onDownloadsAllowedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        updatePost("downloadsAllowed", String(e.target.value));
    }

    // GENRE
    const onGenreChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        updatePost("genre", String(e.target.value.toLowerCase()));
    }

    const updatePost = async(what: string, value: string) => {
        enqueueSnackbar("Updating...", {autoHideDuration: 1500})
        updatePostMutation({
            variables: {
                input: {
                    post: posId,
                    what,
                    value
                }
            }
        }).then(_ => {
            enqueueSnackbar("Updated", {autoHideDuration: 1500, variant: 'success'});
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {autoHideDuration: 2000, variant: 'error'});
        });
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
            <div className="card-body m-1 pulsar-shadow text-white glass bg-base-300 shadow-2xl rounded-2xl">
                <div className="divider divider-primary">{dictionary.forms["post-edit-upload"].edit}</div>

                <form role="form" onSubmit={handleSubmitTitle(onSubmitTitle)} noValidate>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text-alt">{dictionary.forms["post-edit-upload"].title}</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 bg-base-300">
                            <input type="text" placeholder={dictionary.forms["post-edit-upload"].title} className="placeholder:text-gray-200 grow"
                                {...registerTitle("title", {
                                    maxLength: { value: 15, message: `${dictionary.forms["post-edit-upload"]["max-length"]} 15` },
                                    required: { value: true, message: `${dictionary.forms["post-edit-upload"].required}` }
                                })}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                        </label>
                        <div className="label">
                            {
                                errorTitle.title &&
                                <span className="label-text-alt text-error">{errorTitle.title.message}</span>
                            }
                        </div>
                    </label>

                    <button type="submit" className="w-full glass group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                        {dictionary.forms["post-edit-upload"].save}
                    </button>
                </form>
                
                <form onSubmit={handleSubmitDescr(onSubmitDescr)} noValidate>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text-alt">{dictionary.forms["post-edit-upload"].description}</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 bg-base-300">
                            <input type="text" placeholder={dictionary.forms["post-edit-upload"].description} className="placeholder:text-gray-200 grow"
                                {...registerDescr("description", {
                                    maxLength: { value: 25, message: `${dictionary.forms["post-edit-upload"]["max-length"]} 25` },
                                    required: { value: true, message: dictionary.forms["post-edit-upload"].required }
                                })}
                            />
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                            </svg>
                        </label>
                        <div className="label">
                            {
                                errorDescr.description &&
                                <span className="label-text-alt text-error">{errorDescr.description.message}</span>
                            }
                        </div>
                    </label>


                    <button type="submit" className="w-full glass group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                        {dictionary.forms["post-edit-upload"].save}
                    </button>
                </form>
                
                <form onSubmit={handleSubmitImage(onSubmitImage)} noValidate>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">{dictionary.forms["post-edit-upload"].image}</span>
                            <span className="label-text-alt">.jpg, .png</span>
                        </div>
                        <input 
                            type="file" 
                            className="join-item file-input file-input-bordered w-full bg-base-300 file:text-white placeholder:text-gray-200" 
                            onInput={e => handlePicture((e.target as HTMLInputElement).files?.[0] || null)}
                            {...registerImage("image", {
                                required: { value: true, message: dictionary.forms["post-edit-upload"].required }
                            })}
                        />
                        {
                            errorImage.image &&
                            <label className="label">
                                <span className="label-text text-error">{errorImage.image.message}</span>
                            </label>
                        }
                    </label>

                    <button type="submit" className="w-full glass group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                        {dictionary.forms["post-edit-upload"].save}
                    </button>
                </form>
                
                <form onSubmit={handleSubmitAudio(onSubmitAudio)} noValidate>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">{dictionary.forms["post-edit-upload"].audio}</span>
                            <span className="label-text-alt">.mp3, .wav</span>
                        </div>
                      
                        <input type="file" className="join-item file-input file-input-bordered w-full bg-base-300 file:text-white" {
                            ...registerAudio("audio", {
                                required: { value: true, message: dictionary.forms["post-edit-upload"].required }
                            })
                        }/>

                        {
                            errorAudio.audio &&
                            <label className="label">
                                <span className="label-text text-error">{errorAudio.audio.message}</span>
                            </label>
                        }
                    </label>
                    <button type="submit" className="w-full glass group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                        {dictionary.forms["post-edit-upload"].save}
                    </button>
                </form>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">{dictionary.forms["post-edit-upload"].genre}</span>
                    </div>
                    <select className="btn text-start bg-base-300" onChange={onGenreChange}>
                        {
                            genres.map((gen, key) => {
                                return <option className="bg-[#272727] text-lg" key={key} value={gen.id}>{gen.id}</option>
                            })
                        }
                    </select>
                </label>

                <div className="form-control mt-4">
                    <label className="label cursor-pointer">
                        <span className="label-text">{dictionary.forms["post-edit-upload"]["downloads-allowed"]}</span>
                        <input type="checkbox" className="checkbox" onChange={onDownloadsAllowedChange}/>
                    </label>
                </div>
            </div>
        </div>
        </>
    );
}