"use client"
import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import {formsConstants} from "@/config/forms";
import {httpLogin} from "@/utils/http-requests/auth";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/lib/redux/store";
import {setUser} from "@/lib/redux/slices/user";
import {setCookie} from "cookies-next";
import nextConfig from "../../../next.config.mjs";


type Inputs = {
    email: string;
    password: string;
};

export default function LoginForm() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>()
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        httpLogin(data.email, data.password)
            .then(({data: response}) => {
                enqueueSnackbar(`Logged in as ${response.nick}`, {variant: 'success', autoHideDuration: 2000});
                reset();
                dispatch(setUser(response));
                setCookie(nextConfig.env?.userIdCookieKey as string, response._id);
                router.replace('/feed/1');
            })
            .catch(err => {
                console.log(err.message);
                enqueueSnackbar("Invalid credentials or maybe account is not verified", {variant: 'error', autoHideDuration: 3000});
            });
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="card-body text-white glass bg-black shadow-2xl" noValidate>
            <div className="divider divider-primary">Sign in</div>
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
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Password" className="input input-bordered shadow-md glass placeholder:text-gray-200"
                    {...register("password", {
                        minLength: { value: 8, message: "Min length must be 8" },
                        maxLength: { value: 20, message: "Max length must be 20" },
                        required: { value: true, message: "This field is required" }
                    })}/>

                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-3 top-12">
                        <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                    </svg>

                {
                    errors.password &&
                    <label className="label">
                        <span className="label-text text-error">{errors.password.message}</span>
                    </label>
                }
            </div>

            <div className="form-control mt-4">
                <button className="btn btn-primary glass text-white">Login</button>
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