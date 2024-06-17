"use client"
import {genres} from "@/config/categories";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    title: string;
    description: string;
    image: File;
    audio: File;
    genre: string;
    commentsAllowed: boolean;
    downloadsAllowed: boolean;
}

export default function PostUploadForm() {
    const { formState: {errors}, register, handleSubmit } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        console.log(data);
    }

    return (
        <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Track title</span>
                </label>
                <input type="text" placeholder="Track title" className="input input-bordered shadow-md" {
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
                <input type="text" placeholder="Track description" className="input input-bordered shadow-md" {
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
                <input type="file" className="file-input file-input-bordered w-full" {
                    ...register("image", {
                        required: { value: true, message: "This field is required" }
                    })
                }/>
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
                <input type="file" className="file-input file-input-bordered w-full" {
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
                <select className="select select-bordered" {
                    ...register("genre", {
                        required: { value: true, message: "This field is required" }
                    })
                }>
                    {
                        genres.map((gen, key) => {
                            return <option key={key} value={key}>{gen.title}</option>
                        })
                    }
                </select>
            </label>

            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Comments allowed</span>
                    <input type="checkbox" defaultChecked className="checkbox checkbox-primary" {
                        ...register("commentsAllowed")
                    }/>
                </label>
            </div>

            <div className="form-control">
                <label className="label cursor-pointer">
                    <span className="label-text">Downloads allowed</span>
                    <input type="checkbox" className="checkbox checkbox-primary" {
                        ...register("downloadsAllowed")
                    }/>
                </label>
            </div>

            <div className="form-control mt-4">
                <button className="btn btn-primary">Upload</button>
            </div>
        </form>
    );
}