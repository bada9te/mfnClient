"use client"
import { formsConstants } from "@/config/forms";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    email: string;
    contactReason: string;
    details: string;
};

export default function SupportForm() {
    const { register, reset, formState: {errors}, handleSubmit } = useForm<Inputs>();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        console.log(data);
    }

    return (
        <form className="card-body text-black" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" 
                    {...register("email", {
                        pattern: { value: formsConstants.emailRegex, message: "Email address is not valid" },
                        required: { value: true, message: "Email address is required" }
                    })}
                />
                {
                    errors.email && 
                    <label className="label">
                        <span className="label-text text-error">{errors.email.message}</span>
                    </label>
                }
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Contact reason</span>
                </label>
                <select className="select select-bordered w-full" {
                    ...register("contactReason", {
                        required: {value: true, message: "This field is required"}
                    })
                }>
                    <option>Who shot first?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
                {
                    errors.contactReason &&
                    <label className="label">
                        <span className="label-text text-error">{errors.contactReason.message}</span>
                    </label>
                }
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Details</span>
                </label>
                <textarea className="textarea textarea-bordered resize-none" rows={4} placeholder="Details" {
                    ...register("details", {
                        minLength: {value: 10, message: "Min length must be 10"},
                        required: {value: true, message: "This field is required"},
                    })
                }></textarea>
                {
                    errors.details &&
                    <label className="label">
                        <span className="label-text text-error">{errors.details.message}</span>
                    </label>
                }
            </div>
            <div className="form-control mt-4">
                <button className="btn btn-primary glass bg-pink-500" type="submit">Send support request</button>
            </div>
            <label className="label flex flex-col gap-3 justify-start items-start">
                <Link href="/faq" className="label-text-alt link link-hover">FAQ</Link>
            </label>
        </form>
    );
}