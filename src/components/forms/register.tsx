"use client"
import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import {formsConstants} from "@/config/forms";
import {useSnackbar} from "notistack";
import {useUserCreateMutation} from "@/utils/graphql-requests/generated/schema";
import {useRouter} from 'next/navigation';
import FormsSocials from "../common/forms-socials/forms-socials";

type Inputs = {
    email: string;
    nickname: string;
    password: string;
    repeatPassword: string;
};

export default function RegisterForm() {
    const { getValues, register, handleSubmit, formState: {errors}, reset } = useForm<Inputs>();
    const { enqueueSnackbar } = useSnackbar();
    const [ createUser ] = useUserCreateMutation();
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        createUser({
            variables: {
                input: {
                    email: data.email,
                    password: data.password,
                    nick: data.nickname,
                }
            }
        }).then(({data: result}) => {
            enqueueSnackbar(`Account ${data.email} was successfully created`, {variant: "success", autoHideDuration: 2000});
            reset();
            router.replace('/login');
        }).catch(err => {
            console.log(err.message)
            enqueueSnackbar(`Account with this email already exists`, {variant: 'error', autoHideDuration: 3000});
        });
    }

    return (
        <form className="card-body glass bg-black shadow-2xl text-white" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="divider divider-primary">Register</div>
            <div className="form-control relative">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email" className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                    ...register("email", {
                        pattern: formsConstants.emailRegex,
                        required: true
                    })
                }/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-3 top-12">
                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                </svg>
                {
                    errors.email &&
                    <label className="label">
                        <span className="label-text text-error">Email address is not valid</span>
                    </label>
                }
            </div>
            <div className="form-control relative">
                <label className="label">
                <span className="label-text">Nickname</span>
                </label>
                <input type="text" placeholder="Nickname" className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                    ...register("nickname", {
                        minLength: { value: 4, message: "Min length must be 4" },
                        maxLength: { value: 20, message: "Max length must be 20" },
                        required: { value: true, message: "This field is required" }
                    })
                }/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute top-12 right-3">
                    <path fillRule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clipRule="evenodd" />
                </svg>
                {
                    errors.nickname &&
                    <label className="label">
                        <span className="label-text text-error">{errors.nickname.message}</span>
                    </label>
                }

            </div>
            <div className="form-control relative">
                <label className="label">
                <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Password" className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                    ...register("password", {
                        minLength: { value: 8, message: "Min length must be 8" },
                        maxLength: { value: 20, message: "Max length must be 20" },
                        required: { value: true, message: "This field is required" }
                    })}
                />
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute top-12 right-3">
                    <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                </svg>
                {
                    errors.password &&
                    <label className="label">
                        <span className="label-text text-error">{errors.password.message}</span>
                    </label>
                }
            </div>
            <div className="form-control relative">
                <label className="label">
                    <span className="label-text">Repeat Password</span>
                </label>
                <input type="password" placeholder="Repeat password" className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                    ...register("repeatPassword", {
                        validate: (value) => {
                            const { password } = getValues();
                            if (!password) return false;
                            return password == value;
                        }
                    })
                }/>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute top-12 right-3">
                    <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                </svg>
                {
                    errors.repeatPassword &&
                    <label className="label">
                        <span className="label-text text-error">Password mismatch</span>
                    </label>
                }
            </div>
            <div className="form-control mt-4">
                <button className="btn btn-primary glass text-white">Register</button>
            </div>

            <FormsSocials/>

            <label className="label flex flex-col gap-3 justify-start items-start">
                <Link href="/login" className="label-text-alt link link-hover">Already have an account?</Link>
            </label>
        </form>
    );
}