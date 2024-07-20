"use client"
import Post from "@/components/entities/post/post";
import InfoImage from "../common/info-image/info-image";
import { SubmitHandler, useForm } from "react-hook-form";

const PostPlaceholder = () => {
    return (
        <div className="border-2 border-dashed border-white w-64 md:w-80 h-96 flex flex-col justify-center items-center glass relative">
            <div className="flex flex-col h-full justify-center items-center">
                <InfoImage text="Select yout track" />
            </div>
            <button type="button" className="mt-5 btn btn-sm btn-primary glass  absolute bottom-0 w-full text-white">Select</button>
        </div>
    );
}

type Inputs = {
    title: string;
}

export default function BattleForm() {
    const {register, reset, handleSubmit, formState: {errors}} = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        //
    }

    return (
        <div className="card overflow-hidden bg-black shadow-xl glass">
            <form className="card-body m-1 pulsar-shadow w-full text-white glass bg-black shadow-2xl" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">New battle setup</div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Battle title</span>
                    </label>
                    <input 
                        type="text" 
                        placeholder="Title" 
                        className="input input-bordered shadow-md glass placeholder:text-gray-200" 
                        required
                        {...register("title", {
                            required: {value: true, message: "Title is required"},
                            minLength: {value: 5, message: "Min length must be 5"},
                            maxLength: {value: 20, message: "Max length must be 20"}
                        })}
                    />
                    {
                        errors.title &&
                        <label className="label">
                            <span className="text-error">{errors.title.message}</span>
                        </label>
                    }
                </div>

                <div className="flex flex-wrap gap-5 mt-5 w-full justify-around">
                    <div className="flex flex-col gap-3">
                        <p className='font-bold text-lg'>Your track</p>
                        <PostPlaceholder/>
                    </div>

                    <div className="flex flex-col gap-3">
                        <p className='font-bold text-lg'>{"Oponnent's track"}</p>
                        <PostPlaceholder/>
                    </div>
                </div>


                <div className="form-control mt-5">
                    <button type="submit" className="btn btn-primary glass text-white">Create battle</button>
                </div>
            </form>
        </div>
    );
}