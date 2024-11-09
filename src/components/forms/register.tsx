"use client"
import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import {formsConstants} from "@/config/forms";
import {useSnackbar} from "notistack";
import {useUserCreateMutation} from "@/utils/graphql-requests/generated/schema";
import {useRouter} from 'next/navigation';
import FormsSocials from "../common/forms-socials/forms-socials";
import { getDictionary } from "@/dictionaries/dictionaries";
import Image from "next/image";
import { useState } from "react";

type Inputs = {
    email: string;
    nickname: string;
    password: string;
    repeatPassword: string;
};

export default function RegisterForm({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { getValues, register, handleSubmit, formState: {errors}, reset } = useForm<Inputs>();
    const { enqueueSnackbar } = useSnackbar();
    const [ createUser ] = useUserCreateMutation();
    const router = useRouter();
    const [loading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        setIsLoading(true);
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
            console.log(err.message);
            setIsLoading(false);
            enqueueSnackbar(`Account with this email already exists`, {variant: 'error', autoHideDuration: 3000});
        });
    }

    return (
        <div className="card bg-base-300 shadow-xl glass rounded-2xl w-fit">
            <div className="flex flex-row">
                <div className="card-body pulsar-shadow m-1 glass bg-base-300 shadow-2xl text-white rounded-2xl rounded-r-2xl xl:rounded-r-none rounded-l-2xl">
                <form role="form" onSubmit={handleSubmit(onSubmit)} noValidate className="w-64 md:w-80">
                    <div className="divider divider-primary">{dictionary.forms.register.register}</div>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text-alt">{dictionary.forms.register.email}</span>
                            </div>
                            <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                <input type="email" placeholder={dictionary.forms.register.email} className="placeholder:text-gray-200 grow" {
                                    ...register("email", {
                                        pattern: formsConstants.emailRegex,
                                        required: true
                                    })
                                }/>

                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                    <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                </svg>
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
                                <span className="label-text-alt">{dictionary.forms.register.nick}</span>
                            </div>
                            <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                <input type="text" placeholder={dictionary.forms.register.nick} className="placeholder:text-gray-200 grow" {
                                    ...register("nickname", {
                                        minLength: { value: 4, message: `${dictionary.forms.register["min-length"]} 4` },
                                        maxLength: { value: 20, message: `${dictionary.forms.register["max-length"]} 20` },
                                        required: { value: true, message: dictionary.forms.register.required }
                                    })
                                }/>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M4.5 3.75a3 3 0 0 0-3 3v10.5a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V6.75a3 3 0 0 0-3-3h-15Zm4.125 3a2.25 2.25 0 1 0 0 4.5 2.25 2.25 0 0 0 0-4.5Zm-3.873 8.703a4.126 4.126 0 0 1 7.746 0 .75.75 0 0 1-.351.92 7.47 7.47 0 0 1-3.522.877 7.47 7.47 0 0 1-3.522-.877.75.75 0 0 1-.351-.92ZM15 8.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15ZM14.25 12a.75.75 0 0 1 .75-.75h3.75a.75.75 0 0 1 0 1.5H15a.75.75 0 0 1-.75-.75Zm.75 2.25a.75.75 0 0 0 0 1.5h3.75a.75.75 0 0 0 0-1.5H15Z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <div className="label">
                                {
                                    errors.nickname &&
                                    <span className="label-text-alt text-error">{errors.nickname.message}</span>
                                }
                            </div>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text-alt">{dictionary.forms.register.password}</span>
                            </div>
                            <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                <input type="password" placeholder={dictionary.forms.register.password} className="placeholder:text-gray-200 grow" {
                                    ...register("password", {
                                        minLength: { value: 8, message: `${dictionary.forms.register["min-length"]} 8` },
                                        maxLength: { value: 20, message: `${dictionary.forms.register["max-length"]} 20` },
                                        required: { value: true, message: dictionary.forms.register.required }
                                    })
                                }/>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <div className="label">
                                {
                                    errors.password &&
                                    <span className="label-text-alt text-error">{errors.password.message}</span>
                                }
                            </div>
                        </label>

                        <label className="form-control w-full max-w-xs">
                            <div className="label">
                                <span className="label-text-alt">{dictionary.forms.register.password}</span>
                            </div>
                            <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                <input type="password" placeholder={dictionary.forms.register.password} className="placeholder:text-gray-200 grow" {
                                    ...register("repeatPassword", {
                                        validate: (value) => {
                                            const { password } = getValues();
                                            if (!password) return false;
                                            return password == value;
                                        }
                                    })
                                }/>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                    <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                                </svg>
                            </label>
                            <div className="label">
                                {
                                    errors.repeatPassword &&
                                    <span className="label-text-alt text-error">{dictionary.forms.register["passwords-mismatch"]}</span>
                                }
                            </div>
                        </label>

                        <div className="form-control mt-6">
                            <button disabled={loading} type="submit" className="glass group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                                {
                                    loading && <span className="loading loading-dots loading-sm mx-2"></span>
                                }
                                {dictionary.forms.register.register}
                            </button>
                        </div>

                        <label className="label flex flex-col gap-3 justify-start items-start mt-5">
                            <Link href={"/login"} className="label-text-alt link link-hover">{dictionary.forms.register["have-an-account"]}</Link>
                        </label>
                    </form>
                    <FormsSocials dictionary={dictionary}/>
                </div>
                <Image src={"/assets/bgs/register-bg.jpg"} className="hidden xl:block rounded-r-2xl object-cover" alt="login-img" width={600} height={500}/>
            </div>
        </div>
    );
}