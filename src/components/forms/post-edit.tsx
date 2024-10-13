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
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{dictionary.forms["post-edit-upload"].title}</span>
                        </label>
                        <div className="join w-full">
                            <input type="text" placeholder={dictionary.forms["post-edit-upload"].title} className="join-item input input-bordered shadow-md glass placeholder:text-gray-200 w-full" {
                                ...registerTitle("title", {
                                    maxLength: { value: 15, message: `${dictionary.forms["post-edit-upload"]["max-length"]} 15` },
                                    required: { value: true, message: `${dictionary.forms["post-edit-upload"].required}` }
                                })
                            }/>
                            <button className="btn btn-primary join-item glass text-white" type="submit">{dictionary.forms["post-edit-upload"].save}</button>
                        </div>
                        {
                            errorTitle.title &&
                            <label className="label">
                                <span className="label-text text-error">{errorTitle.title.message}</span>
                            </label>
                        }
                    </div>
                </form>
                
                <form onSubmit={handleSubmitDescr(onSubmitDescr)} noValidate>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{dictionary.forms["post-edit-upload"].description}</span>
                        </label>
                        <div className="join w-full">
                            <input type="text" placeholder={dictionary.forms["post-edit-upload"].description} className="join-item input input-bordered shadow-md w-full glass placeholder:text-gray-200" {
                                ...registerDescr("description", {
                                    maxLength: { value: 25, message: `${dictionary.forms["post-edit-upload"]["max-length"]} 25` },
                                    required: { value: true, message: dictionary.forms["post-edit-upload"].required }
                                })
                            }/>
                            <button className="btn btn-primary join-item glass text-white" type="submit">{dictionary.forms["post-edit-upload"].save}</button>
                        </div>
                        {
                            errorDescr.description &&
                            <label className="label">
                                <span className="label-text text-error">{errorDescr.description.message}</span>
                            </label>
                        }
                    </div>
                </form>
                
                <form onSubmit={handleSubmitImage(onSubmitImage)} noValidate>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">{dictionary.forms["post-edit-upload"].image}</span>
                            <span className="label-text-alt">.jpg, .png</span>
                        </div>
                        <div className="join join-vertical">
                            <input 
                                type="file" 
                                className="join-item file-input file-input-bordered w-full bg-[#1a1a1a] file:glass file:text-white file: placeholder:text-gray-200" 
                                onInput={e => handlePicture((e.target as HTMLInputElement).files?.[0] || null)}
                                {...registerImage("image", {
                                    required: { value: true, message: dictionary.forms["post-edit-upload"].required }
                                })}
                            />
                            <button className="btn btn-sm btn-primary join-item glass text-white" type="submit">{dictionary.forms["post-edit-upload"].save}</button>
                        </div>
                        {
                            errorImage.image &&
                            <label className="label">
                                <span className="label-text text-error">{errorImage.image.message}</span>
                            </label>
                        }
                    </label>
                </form>
                
                <form onSubmit={handleSubmitAudio(onSubmitAudio)} noValidate>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text">{dictionary.forms["post-edit-upload"].audio}</span>
                            <span className="label-text-alt">.mp3, .wav</span>
                        </div>
                        <div className="join join-vertical">
                            <input type="file" className="join-item file-input file-input-bordered w-full bg-[#1a1a1a] file:text-white file:glass file:" {
                                ...registerAudio("audio", {
                                    required: { value: true, message: dictionary.forms["post-edit-upload"].required }
                                })
                            }/>
                            <button className="btn btn-sm btn-primary join-item glass text-white" type="submit">{dictionary.forms["post-edit-upload"].save}</button>
                        </div>
                        {
                            errorAudio.audio &&
                            <label className="label">
                                <span className="label-text text-error">{errorAudio.audio.message}</span>
                            </label>
                        }
                    </label>
                </form>

                <label className="form-control w-full">
                    <div className="label">
                        <span className="label-text">{dictionary.forms["post-edit-upload"].genre}</span>
                    </div>
                    <select className="btn text-start glass bg-[#3b3b3b]" onChange={onGenreChange}>
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
                        <input type="checkbox" className="checkbox checkbox-primary" onChange={onDownloadsAllowedChange}/>
                    </label>
                </div>
            </div>
        </div>
        </>
    );
}