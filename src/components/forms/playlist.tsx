"use client"
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    title: string,
    publiclyAvailable: boolean;
}

export default function PlaylistForm() {
    const { handleSubmit, register, formState: {errors} } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {

    }

    return (
        <form className="card-body text-black" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Playlist title</span>
                </label>
                <input type="text" placeholder="Title" className="input input-bordered shadow-md" {
                    ...register("title", {
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
                <label className="label cursor-pointer">
                <span className="label-text">Publicly available</span>
                    <input type="checkbox" className="checkbox checkbox-primary" {
                        ...register("publiclyAvailable")
                    }/>
                </label>
            </div>

            <div className="form-control mt-4">
                <button className="btn btn-primary">Create playlist</button>
            </div>
        </form>
    );
}