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
        <form onSubmit={handleSubmit(onSubmit)} className="card-body text-white" noValidate>
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