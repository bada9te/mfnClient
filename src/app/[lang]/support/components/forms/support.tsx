"use client"
import MainButton from "@/app/components/common/main-button/main-button";
import { formsConstants } from "@/app/config/forms";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { useSupportRequestCreateMutation } from "@/app/utils/graphql-requests/generated/schema";
import { CircleHelp, Mail, Text } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useSnackbar } from "notistack";
import { useState } from "react";
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
    const [loading, setIsLoading] = useState(false);

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        setIsLoading(true);
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
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className="card bg-base-100 rounded-2xl">
            <div className="flex flex-row md:min-h-[400px] lg:min-h-[600px]">
                <form role="form" className="card-body m-1 bg-base-100 text-base-content z-50 rounded-2xl rounded-r-2xl xl:rounded-r-none rounded-l-2xl w-80 md:w-96" onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className="divider divider-primary">{dictionary.forms.support["support-details"]}</div>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text-alt">{dictionary.forms.support.email}</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 bg-base-300">
                            <input type="email" placeholder={dictionary.forms.support.email} className="placeholder:text-gray-200 grow" {
                                ...register("email", {
                                    pattern: { value: formsConstants.emailRegex, message: dictionary.forms.support["email-not-valid"] },
                                    required: { value: true, message: dictionary.forms.support.required }
                                })
                            }/>

                            <Mail/>
                        </label>
                        <div className="label">
                            {
                                errors.email &&
                                <span className="label-text-alt text-error">{errors.email.message}</span>
                            }
                        </div>
                    </label>

                    <label className="form-control w-full max-w-xs">
                        <div className="label">
                            <span className="label-text-alt">{dictionary.forms.support.reason}</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 bg-base-300">
                            <input type="text" placeholder={dictionary.forms.support.reason} className="placeholder:text-gray-200 grow" 
                                {...register("contactReason", {
                                    required: {value: true, message: dictionary.forms.support.required}
                                })}
                            />

                            <CircleHelp />
                        </label>
                        <div className="label">
                            {
                                errors.contactReason &&
                                <span className="label-text-alt text-error">{errors.contactReason.message}</span>
                            }
                        </div>
                    </label>


                    <div className="form-control relative">
                        <label className="label">
                            <span className="label-text">{dictionary.forms.support["support-details"]}</span>
                        </label>
                        <textarea className="textarea textarea-bordered resize-none bg-base-300 placeholder:text-gray-200" rows={4} placeholder={dictionary.forms.support["support-details"]} {
                            ...register("details", {
                                minLength: {value: 10, message: `${dictionary.forms.support["min-length"]} 10`},
                                required: {value: true, message: dictionary.forms.support.required},
                            })
                        }></textarea>

                        <Text className="absolute right-3 top-12"/>

                        {
                            errors.details &&
                            <label className="label">
                                <span className="label-text text-error">{errors.details.message}</span>
                            </label>
                        }
                    </div>
                    <div className="form-control mt-4">
                        <MainButton disabled={loading} color="primary" type="submit">
                            {
                                loading && <span className="loading loading-dots loading-sm mx-2"></span>
                            }
                            {dictionary.forms.support.submit}
                        </MainButton>
                    </div>
                    {
                        /*
                            <label className="label flex flex-col gap-3 justify-start items-start">
                                <Link href="/faq" className="label-text-alt link link-hover">{dictionary.forms.support.faq}</Link>
                            </label>
                        */
                    }
                </form>
                <Image src={"/assets/bgs/support-bg.jpg"} className="hidden xl:block rounded-r-2xl object-cover" alt="login-img" width={600} height={500}/>
            </div>
        </div>
    );
}