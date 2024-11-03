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
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{dictionary.forms["account-confirmination"].code}</span>
                    </label>
                    <input type="text" placeholder={dictionary.forms["account-confirmination"].code} className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                        ...register("code", {
                            required: { value: true, message: dictionary.forms["account-confirmination"].required },
                        })
                    }/>
                    {
                        errors.code &&
                        <label className="label">
                            <span className="label-text text-error">{errors.code.message}</span>
                        </label>
                    }
                </div>

                <div className="form-control mt-4">
                    <button className="btn btn-primary glass text-white" disabled={isLoading}>
                        {
                            isLoading && <span className="loading loading-dots loading-sm"></span>
                        }
                        {dictionary.forms["account-confirmination"].confirm}
                    </button>
                </div>
            </form>
        </div>
    );
}