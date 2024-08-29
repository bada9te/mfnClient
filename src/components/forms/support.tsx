"use client"
import { formsConstants } from "@/config/forms";
import { getDictionary } from "@/dictionaries/dictionaries";
import { useSupportRequestCreateMutation } from "@/utils/graphql-requests/generated/schema";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
    email: string;
    contactReason: string;
    details: string;
};

export default function SupportForm({
    dictionary
}: {
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { register, reset, formState: {errors}, handleSubmit } = useForm<Inputs>();
    const [ createSupportRequest ] = useSupportRequestCreateMutation();
    const { enqueueSnackbar } = useSnackbar();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        enqueueSnackbar("Submitting...", {autoHideDuration: 1500});
        createSupportRequest({
            variables: {
                input: {
                    contactReason: data.contactReason,
                    message: data.details,
                    email: data.email,
                }
            }
        }).then(_ => {
            reset();
            enqueueSnackbar("Sent", {variant: 'success', autoHideDuration: 2500});
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", {variant: 'error', autoHideDuration: 3000});
        });
    }

    return (
        <div className="card overflow-hidden bg-base-300 shadow-xl glass rounded-2xl">
            <form className="card-body pulsar-shadow m-1 glass bg-base-300 shadow-2xl text-white z-50 rounded-2xl" onSubmit={handleSubmit(onSubmit)} noValidate>
                <div className="divider divider-primary">{dictionary.forms.support["support-details"]}</div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">{dictionary.forms.support.email}</span>
                    </label>
                    <input type="email" placeholder={dictionary.forms.support.email} className="input input-bordered glass placeholder:text-gray-200" 
                        {...register("email", {
                            pattern: { value: formsConstants.emailRegex, message: dictionary.forms.support["email-not-valid"] },
                            required: { value: true, message: dictionary.forms.support.required }
                        })}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-3 top-12">
                        <path d="M1.5 8.67v8.58a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3V8.67l-8.928 5.493a3 3 0 0 1-3.144 0L1.5 8.67Z" />
                        <path d="M22.5 6.908V6.75a3 3 0 0 0-3-3h-15a3 3 0 0 0-3 3v.158l9.714 5.978a1.5 1.5 0 0 0 1.572 0L22.5 6.908Z" />
                    </svg>
                    {
                        errors.email && 
                        <label className="label">
                            <span className="label-text text-error">{errors.email.message}</span>
                        </label>
                    }
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">{dictionary.forms.support.reason}</span>
                    </label>
                    <input type="email" placeholder={dictionary.forms.support.reason} className="input input-bordered glass placeholder:text-gray-200" 
                        {...register("contactReason", {
                            required: {value: true, message: dictionary.forms.support.required}
                        })}
                    />
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-3 top-12">
                        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm11.378-3.917c-.89-.777-2.366-.777-3.255 0a.75.75 0 0 1-.988-1.129c1.454-1.272 3.776-1.272 5.23 0 1.513 1.324 1.513 3.518 0 4.842a3.75 3.75 0 0 1-.837.552c-.676.328-1.028.774-1.028 1.152v.75a.75.75 0 0 1-1.5 0v-.75c0-1.279 1.06-2.107 1.875-2.502.182-.088.351-.199.503-.331.83-.727.83-1.857 0-2.584ZM12 18a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
                    </svg>
                    {
                        errors.contactReason &&
                        <label className="label">
                            <span className="label-text text-error">{errors.contactReason.message}</span>
                        </label>
                    }
                </div>
                <div className="form-control relative">
                    <label className="label">
                        <span className="label-text">{dictionary.forms.support["support-details"]}</span>
                    </label>
                    <textarea className="textarea textarea-bordered resize-none glass placeholder:text-gray-200" rows={4} placeholder="Details" {
                        ...register("details", {
                            minLength: {value: 10, message: `${dictionary.forms.support["min-length"]} 10`},
                            required: {value: true, message: dictionary.forms.support.required},
                        })
                    }></textarea>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-3 top-12">
                        <path fillRule="evenodd" d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625ZM7.5 15a.75.75 0 0 1 .75-.75h7.5a.75.75 0 0 1 0 1.5h-7.5A.75.75 0 0 1 7.5 15Zm.75 2.25a.75.75 0 0 0 0 1.5H12a.75.75 0 0 0 0-1.5H8.25Z" clipRule="evenodd" />
                        <path d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z" />
                    </svg>

                    {
                        errors.details &&
                        <label className="label">
                            <span className="label-text text-error">{errors.details.message}</span>
                        </label>
                    }
                </div>
                <div className="form-control mt-4">
                    <button className="btn btn-primary glass text-white" type="submit">{dictionary.forms.support.submit}</button>
                </div>
                <label className="label flex flex-col gap-3 justify-start items-start">
                    <Link href="/faq" className="label-text-alt link link-hover">{dictionary.forms.support.faq}</Link>
                </label>
            </form>
        </div>
    );
}