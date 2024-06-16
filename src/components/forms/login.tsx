"use client"
import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import {formsConstants} from "@/config/forms";

type Inputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors } } = useForm<Inputs>()

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-body" noValidate>
            <div className="divider divider-primary">Sign in</div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered shadow-md" {
                    ...register("email", {
                        pattern: formsConstants.emailRegex,
                        required: true
                    })
                }/>
                {
                    errors.email &&
                    <label className="label">
                        <span className="label-text text-error">Email address is not valid</span>
                    </label>
                }
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered shadow-md"
                    {...register("password", {
                        minLength: { value: 8, message: "Min length must be 8" },
                        maxLength: { value: 20, message: "Max length must be 20" },
                        required: { value: true, message: "This field is required" }
                    })}/>
                {
                    errors.password &&
                    <label className="label">
                        <span className="label-text text-error">{errors.password.message}</span>
                    </label>
                }
            </div>

            <div className="form-control mt-4">
                <button className="btn btn-primary">Login</button>
            </div>
            <label className="label flex flex-col gap-3 justify-start items-start">
                <Link href="/register" className="label-text-alt link link-hover">Not registered
                    yet?</Link>
                <Link href="/register" className="label-text-alt link link-hover">Forgot
                    password?</Link>
            </label>
        </form>
    );
}