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
import { Mail, SquareAsterisk, Text } from "lucide-react";

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
        <div className="card bg-base-100rounded-2xl w-fit">
            <div className="flex flex-row">
                <div className="card-body m-1 bg-base-100 text-base-content rounded-2xl rounded-r-2xl xl:rounded-r-none rounded-l-2xl">
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

                                <Mail/>
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
                                <Text/>
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
                                <SquareAsterisk/>
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
                                <SquareAsterisk/>
                            </label>
                            <div className="label">
                                {
                                    errors.repeatPassword &&
                                    <span className="label-text-alt text-error">{dictionary.forms.register["passwords-mismatch"]}</span>
                                }
                            </div>
                        </label>

                        <div className="form-control mt-6">
                            <button disabled={loading} type="submit" className=" group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-base-content text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
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