"use client"
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { useUserConfirmAccountMutation } from "@/app/utils/graphql-requests/generated/schema";
import { RectangleEllipsis } from "lucide-react";
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
        <div className="card overflow-hidden bg-base-300 rounded-2xl">
            <form role="form" className="card-body m-1 text-base-content bg-base-100 rounded-2xl w-80 md:w-96" onSubmit={handleSubmit(onSubmit)} noValidate>
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

                        <RectangleEllipsis/>
                    </label>
                    <div className="label">
                        {
                            errors.code &&
                            <span className="label-text-alt text-error">{errors.code.message}</span>
                        }
                    </div>
                </label>

                <div className="form-control mt-4">
                    <button disabled={isLoading} type="submit" className=" group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-base-content text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
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