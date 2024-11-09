"use client"
import { getDictionary } from "@/dictionaries/dictionaries";
import { useUserConfirmAccountMutation } from "@/utils/graphql-requests/generated/schema";
import { useRouter } from "next/navigation";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    code: string,
}

export default function AccountConfirminationForm(props: {
    userId: string;
    actionId: string;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const {userId, actionId, dictionary} = props;
    const { handleSubmit, register, formState: {errors}, reset } = useForm<Inputs>();
    const {enqueueSnackbar} = useSnackbar();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ confirmAccount ] = useUserConfirmAccountMutation();
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        setIsLoading(true);
        enqueueSnackbar("Processing...", {autoHideDuration: 1500});
        await confirmAccount({
            variables: {
                input: {
                    userId,
                    actionId,
                    verifyToken: data.code,
                }
            }
        }).then(_ => {
            reset();
            enqueueSnackbar("Account confirmed", { autoHideDuration: 3000, variant: 'success' });
            router.replace('/feed/1');
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", { autoHideDuration: 3000, variant: 'error' });
            setIsLoading(false);
        });
    }

    return (
        <div className="card overflow-hidden bg-base-300 shadow-xl glass rounded-2xl">
            <form role="form" className="card-body m-1 pulsar-shadow text-white glass bg-base-300 shadow-2xl rounded-2xl w-80 md:w-96" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">{dictionary.forms["account-confirmination"].confirmination}</div>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text-alt">{dictionary.forms["account-confirmination"].code}</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2 bg-base-300">
                        <input type="text" placeholder={dictionary.forms["account-confirmination"].code} className="placeholder:text-gray-200 grow" {
                            ...register("code", {
                                required: { value: true, message: dictionary.forms["account-confirmination"].required },
                            })
                        }/>

                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-5">
                            <path fillRule="evenodd" d="M3 6a3 3 0 0 1 3-3h12a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6Zm14.25 6a.75.75 0 0 1-.22.53l-2.25 2.25a.75.75 0 1 1-1.06-1.06L15.44 12l-1.72-1.72a.75.75 0 1 1 1.06-1.06l2.25 2.25c.141.14.22.331.22.53Zm-10.28-.53a.75.75 0 0 0 0 1.06l2.25 2.25a.75.75 0 1 0 1.06-1.06L8.56 12l1.72-1.72a.75.75 0 1 0-1.06-1.06l-2.25 2.25Z" clipRule="evenodd" />
                        </svg>
                    </label>
                    <div className="label">
                        {
                            errors.code &&
                            <span className="label-text-alt text-error">{errors.code.message}</span>
                        }
                    </div>
                </label>

                <div className="form-control mt-4">
                    <button disabled={isLoading} type="submit" className="glass group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-white text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                        {
                            isLoading && <span className="loading loading-dots loading-sm mx-2"></span>
                        }
                        {dictionary.forms["account-confirmination"].confirm}
                    </button>
                </div>
            </form>
        </div>
    );
}