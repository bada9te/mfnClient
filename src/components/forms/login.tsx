"use client"
import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import {formsConstants} from "@/config/forms";
import {httpLogin} from "@/utils/http-requests/auth";
import {useSnackbar} from "notistack";
import {useRouter} from "next/navigation";
import {useAppDispatch} from "@/lib/redux/store";
import {setUnreadNotificationsCount, setUser} from "@/lib/redux/slices/user";
import {setCookie} from "cookies-next";
import FormsSocials from "../common/forms-socials/forms-socials";
import envCfg from "@/config/env";
import { getDictionary } from "@/dictionaries/dictionaries";
import Image from "next/image";
import { useState } from "react";
import { Mail, SquareAsterisk } from "lucide-react";


type Inputs = {
    email: string;
    password: string;
};

export default function LoginForm({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { register, handleSubmit, formState: { errors }, reset } = useForm<Inputs>()
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [loading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        setIsLoading(true);
        httpLogin(data.email, data.password)
            .then(({data: response}) => {
                console.log("LOGIN:", response);
                enqueueSnackbar(`Logged in as ${response.user.nick}`, {variant: 'success', autoHideDuration: 2000});
                reset();
                dispatch(setUser(response.user));
                dispatch(setUnreadNotificationsCount(response.unreadNotifications));
                setCookie(envCfg.userIdCookieKey as string, response.user._id);
                router.replace('/feed/1');
            })
            .catch(err => {
                console.log(err.message);
                setIsLoading(false);
                enqueueSnackbar("Invalid credentials or maybe account is not verified", {variant: 'error', autoHideDuration: 3000});
            });
    }

    return (
        <div className="card bg-base-300 shadow-xl glass rounded-2xl flex flex-row w-fit">
            <div className="flex flex-row">
                <div className="card-body m-1 text-white glass bg-base-300 shadow-2xl rounded-r-2xl xl:rounded-r-none rounded-l-2xl pulsar-shadow">
                    <form role="form" onSubmit={handleSubmit(onSubmit)} noValidate className="w-64 md:w-80">
                        <div className="divider divider-primary">{dictionary.forms.login["sign-in"]}</div>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text-alt">{dictionary.forms.login.email}</span>
                            </div>
                            <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                <input type="email" placeholder={dictionary.forms.login.email} className="placeholder:text-gray-200 grow" {
                                    ...register("email", {
                                        pattern: formsConstants.emailRegex,
                                        required: true
                                    })
                                }/>

                            <Mail />
                            </label>
                            <div className="label">
                                {
                                    errors.email &&
                                    <span className="label-text-alt text-error">{dictionary.forms.login["email-not-valid"]}</span>
                                }
                            </div>
                        </label>


                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text-alt">{dictionary.forms.login.password}</span>
                            </div>
                            <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                <input type="password" placeholder={dictionary.forms.login.password} className="placeholder:text-gray-200 grow"
                                    {...register("password", {
                                        minLength: { value: 8, message: `${dictionary.forms.login["min-length"]} 8` },
                                        maxLength: { value: 20, message: `${dictionary.forms.login["max-length"]} 20` },
                                        required: { value: true, message: `${dictionary.forms.login.required}` }
                                    })}
                                />
                                <SquareAsterisk/>
                            </label>
                            <div className="label">
                                {
                                    errors.password &&
                                    <span className="label-text-alt text-error">{errors.password.message}</span>
                                }
                            </div>
                        </label>


                        <div className="form-control mt-6">
                            <button disabled={loading} type="submit" className="glass group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                                {
                                    loading && <span className="loading loading-dots loading-sm mx-2"></span>
                                }
                                {dictionary.forms.login.login}
                            </button>
                        </div>

                        <label className="label flex flex-col gap-3 justify-start items-start mt-5">
                            <Link href={"/register"} className="label-text-alt link link-hover">{dictionary.forms.login["not-registered-yet"]}</Link>
                            <Link href={"/account-restore/email-verification"} className="label-text-alt link link-hover">{dictionary.forms.login["forgot-password"]}</Link>
                        </label>
                    </form>
                    <FormsSocials dictionary={dictionary}/>
                </div>
                <Image src={"/assets/bgs/login-bg.jpg"} className="hidden xl:block rounded-r-2xl object-cover" alt="login-img" width={500} height={500}/>
            </div>
        </div>
    );
}