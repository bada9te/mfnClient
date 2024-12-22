"use client"
import { formsConstants } from "@/app/config/forms";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { useUserPrepareAccountToRestoreMutation } from "@/app/utils/graphql-requests/generated/schema";
import { MailCheck } from "lucide-react";
import { useSnackbar } from "notistack";
import { useState } from "react";
import {SubmitHandler, useForm} from "react-hook-form";

type Inputs = {
    email: string,
}

export default function EmailVerificationForm({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { handleSubmit, register, formState: {errors}, reset } = useForm<Inputs>();
    const {enqueueSnackbar} = useSnackbar();
    const [ isLoading, setIsLoading ] = useState(false);
    const [ prepareToRestore ] = useUserPrepareAccountToRestoreMutation();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        setIsLoading(true);
        enqueueSnackbar("Requesting...", {autoHideDuration: 1500});
        await prepareToRestore({
            variables: {
                input: {
                    email: data.email,
                    type: "password",
                },
            },
        }).then(_ => {
            reset();
            enqueueSnackbar("Success, check your email for next steps", { autoHideDuration: 4000, variant: 'info' });
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", { autoHideDuration: 3000, variant: 'error' });
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="card overflow-hidden bg-base-100  rounded-2xl">
            <form role="form" className="card-body m-1 text-base-content bg-base-100 rounded-2xl w-80 md:w-96" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">{dictionary.forms["email-verification"].verification}</div>

                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text-alt">{dictionary.forms["email-verification"]["your-current-email"]}</span>
                    </div>
                    <label className="input input-bordered flex items-center gap-2 bg-base-300">
                        <input type="email" placeholder={dictionary.forms["email-verification"].email} className="placeholder:text-gray-200 grow" {
                            ...register("email", {
                                required: { value: true, message: dictionary.forms["email-verification"].required },
                                pattern: { value: formsConstants.emailRegex, message: dictionary.forms["email-verification"]["email-not-valid"] }
                            })
                        }/>

                        <MailCheck/>
                    </label>
                    <div className="label">
                        {
                            errors.email &&
                            <span className="label-text-alt text-error">{errors.email.message}</span>
                        }
                    </div>
                </label>

                <div className="form-control mt-4">
                    <button disabled={isLoading} type="submit" className=" group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-base-content text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                        {
                            isLoading && <span className="loading loading-dots loading-sm mx-2"></span>
                        }
                        {dictionary.forms["email-verification"].submit}
                    </button>
                </div>
            </form>
        </div>
    );
}