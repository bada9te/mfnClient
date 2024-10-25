"use client"
import { formsConstants } from "@/config/forms";
import { getDictionary } from "@/dictionaries/dictionaries";
import { useModerationActionDeleteMutation, useUserRestoreAccountMutation } from "@/utils/graphql-requests/generated/schema";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useEffect, useState } from "react";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    newValue: string;
    confirmPassword: string;
    email: string;
}

export default function AccountRestoreForm(props: {
    userId: string;
    actionId: string;
    verifyToken: string;
    type: string;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { userId, actionId, verifyToken, type, dictionary } = props;
    const { handleSubmit, register, formState: {errors}, reset, getValues } = useForm<Inputs>();
    const {enqueueSnackbar} = useSnackbar();
    const router = useRouter();
    const [isMounted, setIsMounted] = useState(false);

    const [ restoreAccount ] = useUserRestoreAccountMutation();
    const [ deleteModeration ] = useModerationActionDeleteMutation();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        enqueueSnackbar("Requesting...", {autoHideDuration: 1500});
        await restoreAccount({
            variables: {
                input: {
                    userId,
                    actionId,
                    verifyToken,
                    type,
                    newValue: data.newValue
                },
            },
        }).then(_ => {
            type == "link-email" && deleteCookie("link-email-request-value");
            reset();
            router.replace('/login');
            enqueueSnackbar("Done", { autoHideDuration: 4000, variant: 'success' });
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", { autoHideDuration: 3000, variant: 'error' });
        });
    }


    const handleModerationCancel = () => {
        deleteModeration({
            variables: {
                input: {
                    userId,
                    actionId,
                    type,
                    verifyToken,
                }
            }
        }).then(_ => {
            reset();
            router.replace('/login');
            enqueueSnackbar("Done", { autoHideDuration: 4000, variant: 'warning' });
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", { autoHideDuration: 3000, variant: 'error' });
        });
    }

    useEffect(() => {
        setIsMounted(true);
    }, [])

    if (!isMounted) {
        return
    }

   
    return (
        <div className="card overflow-hidden bg-base-300 shadow-xl glass rounded-2xl">
            <form role="form" className="card-body m-1 pulsar-shadow text-white glass bg-base-300 shadow-2xl rounded-2xl w-80 md:w-96" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">{dictionary.forms["account-restore"].restoration}</div>
                {
                    (() => {
                        if (type === "email") {
                            return (
                                <>
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text">{dictionary.forms["account-restore"]["new-email"]}</span>
                                        </label>
                                        <input type="text" placeholder={dictionary.forms["account-restore"]["new-email"]} className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                                            ...register("newValue", {
                                                required: { value: true, message: dictionary.forms["account-restore"].required },
                                                pattern: { value: formsConstants.emailRegex, message: dictionary.forms["account-restore"]["email-not-valid"] }
                                            })
                                        }/>
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-3 top-12">
                                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                            </svg>

                                        {
                                            errors.newValue &&
                                            <label className="label">
                                                <span className="label-text text-error">{errors.newValue.message}</span>
                                            </label>
                                        }
                                    </div>

                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text">{dictionary.forms["account-restore"]["confirm-email"]}</span>
                                        </label>
                                            <input type="text" placeholder={dictionary.forms["account-restore"]["confirm-email"]} className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                                                ...register("email", {
                                                    required: { value: true, message: dictionary.forms["account-restore"].required },
                                                    pattern: { value: formsConstants.emailRegex, message: dictionary.forms["account-restore"]["email-not-valid"] },
                                                    validate: (value) => {
                                                        const { newValue } = getValues();
                                                        return newValue == value;
                                                    }
                                                })
                                            }/>

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-3 top-12">
                                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                            </svg>

                                        {
                                            errors.email &&
                                            <label className="label">
                                                <span className="label-text text-error">{dictionary.forms["account-restore"]["emails-did-not-match"]}</span>
                                            </label>
                                        }
                                    </div>
                                </>
                            );
                        } else if (type === "password") {
                            return (
                                <>
                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text">{dictionary.forms["account-restore"]["new-password"]}</span>
                                        </label>
                                        <input type="password" placeholder={dictionary.forms["account-restore"]["new-password"]} className="input input-bordered shadow-md glass placeholder:text-gray-200"
                                            {...register("newValue", {
                                                minLength: { value: 8, message: `${dictionary.forms["account-restore"]["min-length"]} 8` },
                                                maxLength: { value: 20, message: `${dictionary.forms["account-restore"]["max-length"]} 20` },
                                                required: { value: true, message: dictionary.forms["account-restore"].required }
                                            })}
                                        />
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-3 top-12">
                                                <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                                            </svg>
                                        {
                                            errors.newValue &&
                                            <label className="label">
                                                <span className="label-text text-error">{errors.newValue.message}</span>
                                            </label>
                                        }
                                    </div>

                                    <div className="form-control relative">
                                        <label className="label">
                                            <span className="label-text">{dictionary.forms["account-restore"]["confirm-password"]}</span>
                                        </label>
                                        <input type="password" placeholder={dictionary.forms["account-restore"]["confirm-password"]} className="input input-bordered shadow-md glass placeholder:text-gray-200"
                                            {...register("confirmPassword", {
                                                minLength: { value: 8, message: `${dictionary.forms["account-restore"]["min-length"]} 8` },
                                                maxLength: { value: 20, message: `${dictionary.forms["account-restore"]["max-length"]} 20` },
                                                required: { value: true, message: dictionary.forms["account-restore"].required },
                                                validate: (value) => {
                                                    const { newValue } = getValues();
                                                    if (newValue !== value) {
                                                        return dictionary.forms["account-restore"]["passwords-did-not-match"]
                                                    }
                                                    return true;
                                                }
                                            })}/>

                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-3 top-12">
                                                <path fillRule="evenodd" d="M15.75 1.5a6.75 6.75 0 0 0-6.651 7.906c.067.39-.032.717-.221.906l-6.5 6.499a3 3 0 0 0-.878 2.121v2.818c0 .414.336.75.75.75H6a.75.75 0 0 0 .75-.75v-1.5h1.5A.75.75 0 0 0 9 19.5V18h1.5a.75.75 0 0 0 .53-.22l2.658-2.658c.19-.189.517-.288.906-.22A6.75 6.75 0 1 0 15.75 1.5Zm0 3a.75.75 0 0 0 0 1.5A2.25 2.25 0 0 1 18 8.25a.75.75 0 0 0 1.5 0 3.75 3.75 0 0 0-3.75-3.75Z" clipRule="evenodd" />
                                            </svg>

                                        {
                                            errors.confirmPassword &&
                                            <label className="label">
                                                <span className="label-text text-error">{errors.confirmPassword.message}</span>
                                            </label>
                                        }
                                    </div>
                                </>
                            );
                        } else if (type === "link-email") {
                            return (
                                <div className="form-control relative">
                                    <label className="label">
                                        <span className="label-text">{dictionary.forms["account-restore"]["new-email"]}</span>
                                    </label>
                                    <input type="email" placeholder={dictionary.forms["account-restore"]["new-email"]} className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                                        ...register("newValue", {
                                            required: { value: true, message: dictionary.forms["account-restore"].required },
                                            pattern: { value: formsConstants.emailRegex, message: dictionary.forms["account-restore"]["email-not-valid"] },
                                            validate: (value => {
                                                return getCookie("link-email-request-value") == value;
                                            })
                                        })
                                    }/>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-3 top-12">
                                            <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                            <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                        </svg>
                                    {
                                        errors.newValue &&
                                        <label className="label">
                                            <span className="label-text text-error">{errors.newValue.message}</span>
                                        </label>
                                    }
                                </div>
                            );
                        }
                    })()
                }
                

                <div className="form-control mt-4">
                    <button type="submit" className="btn btn-primary glass text-white">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clipRule="evenodd" />
                        </svg>
                        {dictionary.forms["account-restore"].submit}
                    </button>
                </div>

                <label className="label flex flex-col gap-3 justify-start items-start mt-5">
                    <button className="btn btn-error btn-sm glass w-full bg-red-600 text-white hover:bg-red-400" onClick={handleModerationCancel}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                        </svg>
                        {dictionary.forms["account-restore"].cancel}
                    </button>
                </label>
            </form>
        </div>
    );
}