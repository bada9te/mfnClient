"use client"
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    text: string;
}

export default function AddCommentForm() {
    const {handleSubmit, formState: {errors}, register, reset} = useForm<Inputs>();


    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        console.log(data);
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} noValidate className="w-full">
            <label className="form-control w-full relative">                
                <div className="join w-full">
                    <input 
                        type="text" 
                        placeholder="Type here" 
                        className="input input-sm input-bordered w-full rounded-l-md" 
                        {...register("text", {
                            required: {value: true, message: "Comment text is required"}
                        })}
                    />
                    <button 
                        className={`btn ${errors.text ? "btn-error" : "btn-secondary"} btn-sm join-item rounded-r-md`}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                            <path d="M3.105 2.288a.75.75 0 0 0-.826.95l1.414 4.926A1.5 1.5 0 0 0 5.135 9.25h6.115a.75.75 0 0 1 0 1.5H5.135a1.5 1.5 0 0 0-1.442 1.086l-1.414 4.926a.75.75 0 0 0 .826.95 28.897 28.897 0 0 0 15.293-7.155.75.75 0 0 0 0-1.114A28.897 28.897 0 0 0 3.105 2.288Z" />
                        </svg>
                    </button>
                </div>
            </label>
        </form>
    );
}