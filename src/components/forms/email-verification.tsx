"use client"
import { formsConstants } from "@/config/forms";
import { getDictionary } from "@/dictionaries/dictionaries";
import { useAppSelector } from "@/lib/redux/store";
import { useUserPrepareAccountToRestoreMutation } from "@/utils/graphql-requests/generated/schema";
import { useSnackbar } from "notistack";
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
    const user = useAppSelector(state => state.user.user);
    const {enqueueSnackbar} = useSnackbar();

    const [ prepareToRestore ] = useUserPrepareAccountToRestoreMutation();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
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
        });
    }

    return (
        <div className="card overflow-hidden bg-base-300 shadow-xl glass rounded-2xl">
            <form className="card-body m-1 pulsar-shadow text-white glass bg-base-300 shadow-2xl rounded-2xl w-80 md:w-96" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">{dictionary.forms["email-verification"].verification}</div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">{dictionary.forms["email-verification"]["your-current-email"]}</span>
                    </label>
                    <input type="text" placeholder={dictionary.forms["email-verification"].email} className="input input-bordered shadow-md glass placeholder:text-gray-200" {
                        ...register("email", {
                            required: { value: true, message: dictionary.forms["email-verification"].required },
                            pattern: { value: formsConstants.emailRegex, message: dictionary.forms["email-verification"]["email-not-valid"] }
                        })
                    }/>
                    {
                        errors.email &&
                        <label className="label">
                            <span className="label-text text-error">{errors.email.message}</span>
                        </label>
                    }
                </div>

                <div className="form-control mt-4">
                    <button className="btn btn-primary glass text-white">{dictionary.forms["email-verification"].submit}</button>
                </div>
            </form>
        </div>
    );
}