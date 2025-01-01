"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {formsConstants} from "@/app/config/forms";
import { useSnackbar } from "notistack";
import { UserQuery, useUserLinkEmailRequestMutation, useUserPrepareAccountToRestoreMutation, useUserSuspenseQuery, useUserUnlinkFacebookMutation, useUserUnlinkGoogleMutation, useUserUnlinkTwitterMutation, useUserUpdateMutation } from "@/app/utils/graphql-requests/generated/schema";
import { useAppDispatch, useAppSelector } from "@/app/lib/redux/store";
import { setUser } from "@/app/lib/redux/slices/user";
import { useEffect, useState } from "react";
import { revalidatePathAction } from "@/app/utils/actions/revalidation";
import { getDictionary } from "@/app/translations/dictionaries";
import Link from "next/link";
import envCfg from "@/app/config/env";
import { setCookie } from "cookies-next";
import { MailCheck, Text } from "lucide-react";


type InputsNickname = {
    nickname: string;
};

type InputsDescription = {
    description: string;
};

type InputsEmail = {
    oldEmail: string;
};

type InputsLinkEmail = {
    newEmail: string;
};

type InputsPassword = {
    oldEmail: string;
};


export default function ProfileEditForm(props: {
    userId: string;
    dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]
}) {
    const { dictionary } = props;
    const {data: userData} = useUserSuspenseQuery({
        variables: {
            _id: props.userId
        }
    });
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();
    const { register: registerNick, handleSubmit: handleSubmitNick, formState: {errors: errorsNick} } = useForm<InputsNickname>();
    const { register: registerDescr, handleSubmit: handleSubmitDescr, formState: {errors: errorDescr} } = useForm<InputsDescription>();
    const { register: registerEmail, handleSubmit: handleSubmitEmail, formState: {errors: errorEmail}, reset: resetEmail } = useForm<InputsEmail>();
    const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: {errors: errorsPassword} } = useForm<InputsPassword>();
    const { register: registerLinkEmail, handleSubmit: handleSubmitLinkEmail, formState: {errors: errorslinkEmail} } = useForm<InputsLinkEmail>();
    const [ isMounted, setIsMounted ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [ updateUser ] = useUserUpdateMutation();
    const [ prepareToRestore ] = useUserPrepareAccountToRestoreMutation();
    const [ prepareLinkEmail ] = useUserLinkEmailRequestMutation();


    // ##################################### GOOGLE HANDLERS #####################################
    const [ unlinkGoogle ] = useUserUnlinkGoogleMutation();
    
    const handleUnlinkGoogle = () => {
        enqueueSnackbar("Processing...", {autoHideDuration: 1500});
        unlinkGoogle({
            variables: {
                _id: user?._id as string
            }
        }).then(_ => {
            revalidatePathAction("/profile/me/edit", "page");
            enqueueSnackbar("Google account unlinked.", {autoHideDuration: 2500, variant: 'success'});
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", { autoHideDuration: 4000, variant: 'error' });
        }); 
    }

    const [ unlinkFacebook ] = useUserUnlinkFacebookMutation();
    const handleUnlinkFacebook = () => {
        enqueueSnackbar("Processing...", {autoHideDuration: 1500});
        unlinkFacebook({
            variables: {
                _id: user?._id as string
            }
        }).then(_ => {
            revalidatePathAction("/profile/me/edit", "page");
            enqueueSnackbar("Facebook account unlinked.", {autoHideDuration: 2500, variant: 'success'});
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", { autoHideDuration: 4000, variant: 'error' });
        }); 
    }

    const [ unlinkeTwitter ] = useUserUnlinkTwitterMutation();
    const handleUnlinkTwitter = () => {
        enqueueSnackbar("Processing...", {autoHideDuration: 1500});
        unlinkeTwitter({
            variables: {
                _id: user?._id as string
            }
        }).then(_ => {
            revalidatePathAction("/profile/me/edit", "page");
            enqueueSnackbar("Twitter account unlinked.", {autoHideDuration: 2500, variant: 'success'});
        }).catch(_ => {
            enqueueSnackbar("Sth went wrong, pls try again later", { autoHideDuration: 4000, variant: 'error' });
        }); 
    }



    const dispatchUser = (what: string, value: string) => {
        // @ts-ignore
        dispatch(setUser({ ...user, [what]: value }));
    }

    // nick
    const onSubmitNick: SubmitHandler<InputsNickname> = async(data) => {
        enqueueSnackbar("Updaing nickname...", {autoHideDuration: 1500});
        await updateUser({
            variables: {
                input: {
                    _id: user?._id as string,
                    what: "nick",
                    value: data.nickname,
                }
            }
        }).then(_ => {
            dispatchUser("nick", data.nickname);
            enqueueSnackbar("Nickname updated", {variant: 'success', autoHideDuration: 2000});
        }).catch(_ => {
            enqueueSnackbar("Nickname can not be updated", {variant: 'error', autoHideDuration: 3000});
        });
    };

    

    // desc
    const onSubmitDescription: SubmitHandler<InputsDescription> = async(data) => {
        enqueueSnackbar("Updating description...", {autoHideDuration: 1500});
        await updateUser({
            variables: {
                input: {
                    _id: user?._id as string,
                    what: "description",
                    value: data.description,
                }
            }
        }).then(_ => {
            dispatchUser("description", data.description);
            enqueueSnackbar("Description updated", {variant: 'success', autoHideDuration: 2000});
        }).catch(_ => {
            enqueueSnackbar("Description can not be updated", {variant: 'error', autoHideDuration: 3000});
        });
    }

    // email
    const onSubmitEmail: SubmitHandler<InputsEmail> = async(data) => {
        enqueueSnackbar("Doing important stuff...", {autoHideDuration: 1500});
        await prepareToRestore({
            variables: {
                input: {
                    email: user?.local?.email as string,
                    type: "email",
                }
            }
        }).then(_ => {
            resetEmail();
            enqueueSnackbar("Restoration email sent", {autoHideDuration: 2000, variant: 'success'});
        }).catch(_ => {
            enqueueSnackbar("Email can not be updated", {autoHideDuration: 3000, variant: 'error'});
        });
    }

    // passwd
    const onSubmitPassword: SubmitHandler<InputsPassword> = async(data) => {
        enqueueSnackbar("Doing important stuff...", {autoHideDuration: 1500});
        await prepareToRestore({
            variables: {
                input: {
                    email: user?.local?.email as string,
                    type: "password"
                }
            }
        }).then(_ => {
            enqueueSnackbar("Restoration email sent", {autoHideDuration: 2000, variant: 'success'});
        }).catch(_ => {
            enqueueSnackbar("Password can not be updated", {autoHideDuration: 3000, variant: 'error'});
        });
    }

    // link email
    const onSubmitLinkEmail: SubmitHandler<InputsLinkEmail> = async(data) => {
        enqueueSnackbar("Doing important stuff...", {autoHideDuration: 1500});
        await prepareLinkEmail({
            variables: {
                input: {
                    userId: userData?.user._id as string,
                    email: data.newEmail,
                }
            }
        }).then(_ => {
            const date = new Date();
            date.setTime(date.getTime() + (10 * 60 * 1000));
            setCookie("link-email-request-value", data.newEmail, {
                expires: date
            });
            enqueueSnackbar("Email sent", {autoHideDuration: 2000, variant: 'success'});
        }).catch(_ => {
            enqueueSnackbar("Email can not be updated", {autoHideDuration: 3000, variant: 'error'});
        });
    }

    const buttonMustBeDisabled = (userData: UserQuery) => {
        const disabledList = {
            twitter: false,
            google: false,
            facebook: false,
        }

        const uData = userData.user;

        // unlink twitter have to be disabled if there are no other methods connected
        if (!uData.google?.email && !uData.facebook?.name && !uData.local?.email) {
            disabledList.twitter = true;
        }

        // unlink google have to be disabled if there are no other methods connected
        if (!uData.twitter?.name && !uData.facebook?.name && !uData.local?.email) {
            disabledList.google = true;
        }

        // unlink facebook have to be disabled if there are no other methods connected
        if (!uData.twitter?.name && !uData.google?.email && !uData.local?.email) {
            disabledList.facebook = true;
        }

        return disabledList;
    }


    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !window) {
        return null;
    }

    return (
        <div className="card overflow-hidden bg-base-100 rounded-2xl md:rounded-2xl mx-2 md:mx-0">
            <div className="bg-base-100 card-body m-1 text-base-content md:rounded-2xl p-4 md:p-6">
                <div className="divider divider-primary">{dictionary.forms["profile-edit"].basics}</div>

                <form role="form" onSubmit={handleSubmitNick(onSubmitNick)} noValidate>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text-alt">{dictionary.forms["profile-edit"].nickname}</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 bg-base-300">
                            <input type="text" placeholder={dictionary.forms["profile-edit"].nickname} className="placeholder:text-gray-200 grow"
                                {...registerNick("nickname", {
                                    minLength: { value: 4, message: `${dictionary.forms["profile-edit"]["min-length"]} 4` },
                                    maxLength: { value: 20, message: `${dictionary.forms["profile-edit"]["max-length"]} 20` },
                                    required: { value: true, message: dictionary.forms["profile-edit"].required },
                                })}
                            />
                            <Text/>
                        </label>
                        <div className="label">
                            {
                                errorsNick.nickname &&
                                <span className="label-text-alt text-error">{errorsNick.nickname.message}</span>
                            }
                        </div>
                    </label>
                    <button type="submit" className="w-full  group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-base-content text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                        {dictionary.forms["profile-edit"].save}
                    </button>
                </form>

                <form role="form" onSubmit={handleSubmitDescr(onSubmitDescription)} noValidate>
                    <label className="form-control w-full">
                        <div className="label">
                            <span className="label-text-alt">{dictionary.forms["profile-edit"].description}</span>
                        </div>
                        <label className="input input-bordered flex items-center gap-2 bg-base-300">
                            <input type="text" placeholder={dictionary.forms["profile-edit"].description} className="placeholder:text-gray-200 grow"
                                {...registerDescr("description", {
                                    minLength: { value: 4, message: `${dictionary.forms["profile-edit"]["min-length"]} 4` },
                                    maxLength: { value: 40, message: `${dictionary.forms["profile-edit"]["max-length"]} 40` },
                                    required: { value: true, message: dictionary.forms["profile-edit"].required },
                                })}
                            />
                            <Text/>
                        </label>
                        <div className="label">
                            {
                                errorDescr.description &&
                                <span className="label-text-alt text-error">{errorDescr.description.message}</span>
                            }
                        </div>
                    </label>
                    <button type="submit" className="w-full  group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-base-content text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                        {dictionary.forms["profile-edit"].save}
                    </button>
                </form>

                <div className="divider divider-primary mt-10">{dictionary.forms["profile-edit"].email}</div>

                <>
                    {
                        (() => {
                            if (!userData?.user.local?.email) {
                                return (
                                    <>
                                        <label className="label">
                                            <span className="label-text text-warning">{dictionary.forms["profile-edit"]["email-link-warning"]}</span>
                                        </label>
                                        <form role="form" onSubmit={handleSubmitLinkEmail(onSubmitLinkEmail)} noValidate>
                                            <label className="form-control w-full">
                                                <div className="label">
                                                    <span className="label-text-alt">{dictionary.forms["profile-edit"]["link-email-new"]}</span>
                                                </div>
                                                <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                                    <input type="text" placeholder={dictionary.forms["profile-edit"]["link-email-new"]} className="placeholder:text-gray-200 grow"
                                                        {...registerLinkEmail("newEmail", {
                                                            pattern: {value: formsConstants.emailRegex, message: dictionary.forms["profile-edit"]["email-not-valid"]},
                                                            required: { value: true, message: dictionary.forms["profile-edit"].required },
                                                        })}
                                                    />
                                                    <MailCheck/>
                                                </label>
                                                <div className="label">
                                                    {
                                                        errorslinkEmail.newEmail &&
                                                        <span className="label-text-alt text-error">{errorslinkEmail.newEmail.message}</span>
                                                    }
                                                </div>
                                            </label>
                        
                                            <button type="submit" className="w-full  group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-base-content text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                                                {dictionary.forms["profile-edit"].request}
                                            </button>
                                        </form>
                                    </>
                                );
                            } else {
                                return (
                                    <form role="form" onSubmit={handleSubmitEmail(onSubmitEmail)} noValidate>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text-alt">{dictionary.forms["profile-edit"]["old-email"]}</span>
                                            </div>
                                            <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                                <input type="email" placeholder={dictionary.forms["profile-edit"]["old-email"]} className="placeholder:text-gray-200 grow"
                                                    {...registerEmail("oldEmail", {
                                                        pattern: {value: formsConstants.emailRegex, message: dictionary.forms["profile-edit"]["email-not-valid"]},
                                                        required: { value: true, message: dictionary.forms["profile-edit"].required },
                                                        validate: (value) => {
                                                            const userEmail = user?.local?.email as string;
                                                            if (userEmail !== value) {
                                                                return dictionary.forms["profile-edit"]["wrong-email"]
                                                            }
                                                        }
                                                    })}
                                                />
                                                <MailCheck/>
                                            </label>
                                            <div className="label">
                                                {
                                                    errorEmail.oldEmail &&
                                                    <span className="label-text-alt text-error">{errorEmail.oldEmail.message}</span>
                                                }
                                            </div>
                                        </label>
                                        <button type="submit" className="w-full  group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-base-content text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                                            {dictionary.forms["profile-edit"].request}
                                        </button>
                                    </form>
                                );
                            }
                        })()
                    }
                </>

                <div className="divider divider-primary mt-10">{dictionary.forms["profile-edit"].password}</div>

                <>
                    {
                        (() => {
                            if (!userData?.user.local?.email) {
                                return (
                                    <>
                                        <label className="label">
                                            <span className="label-text text-error">{dictionary.forms["profile-edit"]["password-lack-email"]}</span>
                                        </label>
                                    </>
                                );
                            } else {
                                return (
                                    <form role="form" onSubmit={handleSubmitPassword(onSubmitPassword)} noValidate>
                                        <label className="form-control w-full">
                                            <div className="label">
                                                <span className="label-text-alt">{dictionary.forms["profile-edit"].password}</span>
                                            </div>
                                            <label className="input input-bordered flex items-center gap-2 bg-base-300">
                                                <input type="text" placeholder={dictionary.forms["profile-edit"]["old-email"]} className="placeholder:text-gray-200 grow"
                                                    {...registerPassword("oldEmail", {
                                                        pattern: {value: formsConstants.emailRegex, message: dictionary.forms["profile-edit"]["email-not-valid"]},
                                                        required: { value: true, message: dictionary.forms["profile-edit"].required },
                                                        validate: (value) => {
                                                            const userEmail = user?.local?.email as string;
                                                            if (userEmail !== value) {
                                                                return dictionary.forms["profile-edit"]["wrong-email"]
                                                            }
                                                        }
                                                    })}
                                                />
                                                <MailCheck/>
                                            </label>
                                            <div className="label">
                                                {
                                                    errorsPassword.oldEmail &&
                                                    <span className="label-text-alt text-error">{errorsPassword.oldEmail.message}</span>
                                                }
                                            </div>
                                        </label>

                                        <button type="submit" className="w-full  group relative inline-flex h-8 items-center justify-center overflow-hidden rounded-md bg-gradient-to-r from-[#29d8cf] to-[#1ba39c] border-[#1ba39c] bg-transparent px-6 font-medium dark:text-base-content text-black transition-all duration-100 [box-shadow:5px_5px_rgb(17_99_95)] active:translate-x-[3px] active:translate-y-[3px] active:[box-shadow:0px_0px_rgb(17_99_95)] disabled:opacity-55">
                                            {dictionary.forms["profile-edit"].request}
                                        </button>
                                    </form>
                                );
                            }
                        })()
                    }
                </>

                <div className="divider divider-primary mt-10">{dictionary.forms["profile-edit"].socials}</div>
                
                <div className="flex w-full flex-wrap gap-4">
                    <div className="join join-horizontal w-full">
                        <Link href={envCfg.twitterAuthURL as string} className={`btn w-[calc(100%-60px)] join-item text-base-content  hover:bg-black ${userData?.user.twitter?.name && 'bg-black'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
                                <path fill="#212121" fillRule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clipRule="evenodd"></path><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"></path><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
                            </svg>
                            {userData?.user.twitter?.name ? userData.user.twitter.name : dictionary.forms["profile-edit"]["connect-twitter"]}
                        </Link>
                        <button disabled={buttonMustBeDisabled(userData as UserQuery).twitter} className="btn btn-error join-item text-base-300 w-[60px]" onClick={handleUnlinkTwitter}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5c-.074.074-.144.15-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428.75.75 0 0 1 .646-1.353 5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5.31 5.31 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304ZM5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0Zm2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354 5.244 5.244 0 0 1-1.449-1.026 5.232 5.232 0 0 1-1.24-1.965.75.75 0 0 1 .46-.957Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                    
                    <div className="join join-horizontal w-full">
                        <Link href={envCfg.googleAuthURL as string} className={`btn w-[calc(100%-60px)] join-item  hover:bg-white hover:text-black ${userData?.user.google?.email ? 'bg-white/80 text-black' : 'text-base-content hover:text-black'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                                <path d="M1 1h22v22H1z" fill="none"/>
                            </svg>
                            {userData?.user.google?.email ? userData.user.google?.email : dictionary.forms["profile-edit"]["connect-google"]}
                        </Link>
                        <button disabled={buttonMustBeDisabled(userData as UserQuery).google} className="btn btn-error join-item text-base-300 w-[60px]" onClick={handleUnlinkGoogle}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5c-.074.074-.144.15-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428.75.75 0 0 1 .646-1.353 5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5.31 5.31 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304ZM5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0Zm2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354 5.244 5.244 0 0 1-1.449-1.026 5.232 5.232 0 0 1-1.24-1.965.75.75 0 0 1 .46-.957Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>

                    <div className="join join-horizontal w-full">
                        <Link tabIndex={undefined} href={envCfg.facebookAuthURL as string} className={`btn w-[calc(100%-60px)] join-item  text-base-content hover:bg-blue-500 ${userData?.user.facebook?.name && 'bg-blue-500'}`}>
                            <svg fill="#0091ff" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 310" stroke="#0091ff">
                            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                            <g id="SVGRepo_iconCarrier"> 
                                <g id="XMLID_834_"> 
                                    <path id="XMLID_835_" d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064 c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996 V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545 C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703 c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z">
                                    </path>
                                </g> 
                                </g>
                            </svg>
                            { userData?.user.facebook?.name ? userData.user.facebook?.name : dictionary.forms["profile-edit"]["connect-facebook"] }
                        </Link>
                        <button disabled={buttonMustBeDisabled(userData as UserQuery).facebook} className="btn btn-error join-item text-base-300 w-[60px]" onClick={handleUnlinkFacebook}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                                <path fillRule="evenodd" d="M19.892 4.09a3.75 3.75 0 0 0-5.303 0l-4.5 4.5c-.074.074-.144.15-.21.229l4.965 4.966a3.75 3.75 0 0 0-1.986-4.428.75.75 0 0 1 .646-1.353 5.253 5.253 0 0 1 2.502 6.944l5.515 5.515a.75.75 0 0 1-1.061 1.06l-18-18.001A.75.75 0 0 1 3.521 2.46l5.294 5.295a5.31 5.31 0 0 1 .213-.227l4.5-4.5a5.25 5.25 0 1 1 7.425 7.425l-1.757 1.757a.75.75 0 1 1-1.06-1.06l1.756-1.757a3.75 3.75 0 0 0 0-5.304ZM5.846 11.773a.75.75 0 0 1 0 1.06l-1.757 1.758a3.75 3.75 0 0 0 5.303 5.304l3.129-3.13a.75.75 0 1 1 1.06 1.061l-3.128 3.13a5.25 5.25 0 1 1-7.425-7.426l1.757-1.757a.75.75 0 0 1 1.061 0Zm2.401.26a.75.75 0 0 1 .957.458c.18.512.474.992.885 1.403.31.311.661.555 1.035.733a.75.75 0 0 1-.647 1.354 5.244 5.244 0 0 1-1.449-1.026 5.232 5.232 0 0 1-1.24-1.965.75.75 0 0 1 .46-.957Z" clipRule="evenodd" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>

    );
}