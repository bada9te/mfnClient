"use client"
import MainButton from "@/app/[lang]/components/common/main-button/main-button";
import { formsConstants } from "@/app/config/forms";
import { getDictionary } from "@/app/translations/dictionaries";
import { useModerationActionDeleteMutation, useUserRestoreAccountMutation } from "@/app/utils/graphql-requests/generated/schema";
import { getCookie, deleteCookie } from "cookies-next";
import { AsteriskSquare, RectangleEllipsis, Text, X } from "lucide-react";
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
    const [ isLoading, setIsLoading ] = useState(false);

    const [ restoreAccount ] = useUserRestoreAccountMutation();
    const [ deleteModeration ] = useModerationActionDeleteMutation();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        setIsLoading(true);
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
        }).finally(() => {
            setIsLoading(false);
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
        <div className="card overflow-hidden bg-base-300 rounded-2xl">
            <form role="form" className="card-body m-1 text-base-content bg-base-100 rounded-2xl w-80 md:w-96" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">{dictionary.forms["account-restore"].restoration}</div>
                {
                    (() => {
                        if (type === "email") {
                            return (
                                <>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">{dictionary.forms["account-restore"]["new-email"]}</span>
                                        </div>
                                    
                                        <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                            <input type="email" placeholder={dictionary.forms["account-restore"]["new-email"]} className="placeholder:text-gray-200 grow"
                                                {...register("newValue", {
                                                    required: { value: true, message: dictionary.forms["account-restore"].required },
                                                    pattern: { value: formsConstants.emailRegex, message: dictionary.forms["account-restore"]["email-not-valid"] }
                                                })}
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                            </svg>
                                        </label>

                                        {
                                            errors.newValue &&
                                            <label className="label">
                                                <span className="label-text text-error">{errors.newValue.message}</span>
                                            </label>
                                        }
                                    </label>

                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">{dictionary.forms["account-restore"]["confirm-email"]}</span>
                                        </div>
                                    
                                        <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                            <input type="text" placeholder={dictionary.forms["account-restore"]["confirm-email"]} className="placeholder:text-gray-200 grow"
                                                {...register("email", {
                                                    required: { value: true, message: dictionary.forms["account-restore"].required },
                                                    pattern: { value: formsConstants.emailRegex, message: dictionary.forms["account-restore"]["email-not-valid"] },
                                                    validate: (value) => {
                                                        const { newValue } = getValues();
                                                        return newValue == value;
                                                    }
                                                })}
                                            />
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                                                <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                                                <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                                            </svg>
                                        </label>

                                        {
                                            errors.email &&
                                            <label className="label">
                                                <span className="label-text text-error">{dictionary.forms["account-restore"]["emails-did-not-match"]}</span>
                                            </label>
                                        }
                                    </label>
                                </>
                            );
                        } else if (type === "password") {
                            return (
                                <>
                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">{dictionary.forms["account-restore"]["new-password"]}</span>
                                        </div>
                                    
                                        <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                            <input type="password" placeholder={dictionary.forms["account-restore"]["new-password"]} className="placeholder:text-gray-200 grow"
                                                {...register("newValue", {
                                                    minLength: { value: 8, message: `${dictionary.forms["account-restore"]["min-length"]} 8` },
                                                    maxLength: { value: 20, message: `${dictionary.forms["account-restore"]["max-length"]} 20` },
                                                    required: { value: true, message: dictionary.forms["account-restore"].required }
                                                })}
                                            />
                                            <AsteriskSquare/>
                                        </label>

                                        {
                                            errors.newValue &&
                                            <label className="label">
                                                <span className="label-text text-error">{errors.newValue.message}</span>
                                            </label>
                                        }
                                    </label>

                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">{dictionary.forms["account-restore"]["confirm-password"]}</span>
                                        </div>
                                    
                                        <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                            <input type="password" placeholder={dictionary.forms["account-restore"]["confirm-password"]} className="placeholder:text-gray-200 grow"
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
                                                })}
                                            />
                                            <RectangleEllipsis/>
                                        </label>

                                        {
                                            errors.confirmPassword &&
                                            <label className="label">
                                                <span className="label-text text-error">{errors.confirmPassword.message}</span>
                                            </label>
                                        }
                                    </label>
                                </>
                            );
                        } else if (type === "link-email") {
                            return (
                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">{dictionary.forms["account-restore"]["new-email"]}</span>
                                    </div>
                                
                                    <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                        <input type="text" placeholder={dictionary.forms["account-restore"]["new-email"]} className="placeholder:text-gray-200 grow"
                                            {...register("newValue", {
                                                required: { value: true, message: dictionary.forms["account-restore"].required },
                                                pattern: { value: formsConstants.emailRegex, message: dictionary.forms["account-restore"]["email-not-valid"] },
                                                validate: (value) => {
                                                    return getCookie("link-email-request-value") == value
                                                }
                                            })}
                                        />
                                        <Text/>
                                    </label>

                                    {
                                        errors.newValue &&
                                        <label className="label">
                                            <span className="label-text text-error">{errors.newValue.message || dictionary.forms["account-restore"]["email-not-valid"]}</span>
                                        </label>
                                    }
                                </label>
                            );
                        }
                    })()
                }
                

                <div className="form-control mt-4">
                    <MainButton disabled={isLoading} type="submit" color="primary">
                        {
                            isLoading && <span className="loading loading-dots loading-sm mx-2"></span>
                        }
                        {dictionary.forms["account-restore"].submit}
                    </MainButton>
                </div>

                <label className="label flex flex-col gap-3 justify-start items-start mt-5">
                    <button className="btn btn-error btn-sm  w-full bg-red-600 text-base-content hover:bg-red-400" onClick={handleModerationCancel}>
                        <X/>
                        {dictionary.forms["account-restore"].cancel}
                    </button>
                </label>
            </form>
        </div>
    );
}