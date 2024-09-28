"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {formsConstants} from "@/config/forms";
import { useSnackbar } from "notistack";
import { useUserLinkGoogleMutation, useUserPrepareAccountToRestoreMutation, useUserSuspenseQuery, useUserUnlinkGoogleMutation, useUserUpdateMutation } from "@/utils/graphql-requests/generated/schema";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { setUser } from "@/lib/redux/slices/user";
import { httpGetGoogleInfo } from "@/utils/http-requests/auth";
import { useGoogleLogin } from '@react-oauth/google';
import { useEffect, useState } from "react";
import { revalidatePathAction } from "@/actions/revalidation";
import { getDictionary } from "@/dictionaries/dictionaries";


type InputsNickname = {
    nickname: string;
};

type InputsDescription = {
    description: string;
};

type InputsEmail = {
    oldEmail: string;
};

type InputsPassword = {
    oldPassword: string;
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
    const { register: registerEmail, handleSubmit: handleSubmitEmail, formState: {errors: errorEmail} } = useForm<InputsEmail>();
    const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: {errors: errorsPassword} } = useForm<InputsPassword>();
    const [ isMounted, setIsMounted ] = useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [ updateUser ] = useUserUpdateMutation();
    const [ prepareToRestore ] = useUserPrepareAccountToRestoreMutation();


    // ##################################### GOOGLE HANDLERS #####################################
    const [ linkGoogle ] = useUserLinkGoogleMutation();
    const [ unlinkGoogle ] = useUserUnlinkGoogleMutation();
    
    const handleGoogle = useGoogleLogin({
        scope: "email",
        onSuccess: tokenResponse => {
            httpGetGoogleInfo(tokenResponse.access_token).then(data => {
                console.log({data, tokenResponse})
                enqueueSnackbar("Processing...", {autoHideDuration: 1500});
                linkGoogle({
                    variables: {
                        input: {
                            userId: user?._id as string,
                            id: data.sub,
                            token: tokenResponse.access_token,
                            email: data.email,
                            name: data.name,
                        }
                    }
                }).then(_ => {
                    revalidatePathAction("/profile/me/edit", "page");
                    enqueueSnackbar("Google account linked.", {autoHideDuration: 2500, variant: 'success'});
                }).catch(_ => {
                    enqueueSnackbar("Sth went wrong, pls try again later", { autoHideDuration: 4000, variant: 'error' })
                });   
            });
        },
    });

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


    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted || !window) {
        return null;
    }

    return (
        <div className="card overflow-hidden bg-base-300 shadow-xl glass rounded-2xl md:rounded-2xl">
            <div className="bg-base-300 card-body m-1 pulsar-shadow text-white sm: md:rounded-2xl shadow-2xl glass">
                <div className="divider divider-primary">{dictionary.forms["profile-edit"].basics}</div>

                <form onSubmit={handleSubmitNick(onSubmitNick)} noValidate>
                    <div className="form-control pt-0">
                        <label className="label">
                            <span className="label-text">{dictionary.forms["profile-edit"].nickname}</span>
                        </label>
                        <div className="join w-full">
                            <input type="text" placeholder={dictionary.forms["profile-edit"].nickname} className="input input-bordered shadow-md w-full glass placeholder:text-gray-200 rounded-l-xl" {
                                ...registerNick("nickname", {
                                    minLength: { value: 4, message: `${dictionary.forms["profile-edit"]["min-length"]} 4` },
                                    maxLength: { value: 20, message: `${dictionary.forms["profile-edit"]["max-length"]} 20` },
                                    required: { value: true, message: dictionary.forms["profile-edit"].required },
                                })
                            }/>
                            <button className="btn btn-primary join-item glass text-white rounded-r-xl" type="submit">{dictionary.forms["profile-edit"].save}</button>
                        </div>
                        {
                            errorsNick.nickname &&
                            <label className="label">
                                <span className="label-text text-error">{errorsNick.nickname.message}</span>
                            </label>
                        }
                    </div>
                </form>

                <form onSubmit={handleSubmitDescr(onSubmitDescription)} noValidate>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{dictionary.forms["profile-edit"].description}</span>
                        </label>
                        <div className="join w-full rounded-2xl">
                            <input type="text" placeholder="Description" className="input input-bordered shadow-md w-full glass placeholder:text-gray-200 rounded-l-xl" {
                                ...registerDescr("description", {
                                    minLength: { value: 4, message: `${dictionary.forms["profile-edit"]["min-length"]} 4` },
                                    maxLength: { value: 40, message: `${dictionary.forms["profile-edit"]["max-length"]} 40` },
                                    required: { value: true, message: dictionary.forms["profile-edit"].required },
                                })
                            }/>
                            <button className="btn btn-primary join-item glass text-white rounded-r-xl" type="submit">{dictionary.forms["profile-edit"].save}</button>
                        </div>
                        {
                            errorDescr.description &&
                            <label className="label">
                                <span className="label-text text-error">{errorDescr.description.message}</span>
                            </label>
                        }
                    </div>
                </form>

                <div className="divider divider-primary mt-10">{dictionary.forms["profile-edit"].email}</div>

                <form onSubmit={handleSubmitEmail(onSubmitEmail)} noValidate>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{dictionary.forms["profile-edit"].email}</span>
                        </label>
                        <div className="join w-full">
                            <input type="text" placeholder={dictionary.forms["profile-edit"]["old-email"]} className="input input-bordered shadow-md w-full glass placeholder:text-gray-200 rounded-l-xl" {
                                ...registerEmail("oldEmail", {
                                    pattern: {value: formsConstants.emailRegex, message: dictionary.forms["profile-edit"]["email-not-valid"]},
                                    required: { value: true, message: dictionary.forms["profile-edit"].required },
                                    validate: (value) => {
                                        const userEmail = user?.local?.email as string;
                                        if (userEmail !== value) {
                                            return dictionary.forms["profile-edit"]["wrong-email"]
                                        }
                                    }
                                })
                            }/>
                            <button className="btn btn-primary join-item glass text-white rounded-r-xl" type="submit">{dictionary.forms["profile-edit"].request}</button>
                        </div>
                        {
                            errorEmail.oldEmail &&
                            <label className="label">
                                <span className="label-text text-error">{errorEmail.oldEmail.message}</span>
                            </label>
                        }
                    </div>
                </form>

                <div className="divider divider-primary mt-10">{dictionary.forms["profile-edit"].password}</div>

                <form onSubmit={handleSubmitPassword(onSubmitPassword)} noValidate>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">{dictionary.forms["profile-edit"].password}</span>
                        </label>
                        <div className="join">
                            <input type="text" placeholder={dictionary.forms["profile-edit"]["old-email"]} className="join-item input input-bordered shadow-md w-full glass placeholder:text-gray-200 rounded-l-xl" {
                                ...registerPassword("oldPassword", {
                                    minLength: { value: 8, message: `${dictionary.forms["profile-edit"]["min-length"]} 8` },
                                    maxLength: { value: 20, message: `${dictionary.forms["profile-edit"]["max-length"]} 20` },
                                    required: { value: true, message: dictionary.forms["profile-edit"].required },
                                })
                            }/>
                            <button className="btn btn-primary join-item glass text-white rounded-r-xl" type="submit">{dictionary.forms["profile-edit"].request}</button>
                        </div>
                        {
                            errorsPassword.oldPassword &&
                            <label className="label">
                                <span className="label-text text-error">{errorsPassword.oldPassword.message}</span>
                            </label>
                        }
                    </div>
                </form>

                
                <button className="mt-10 rounded-2xl btn hover:bg-white hover:text-black glass text-white" onClick={userData.user.google?.email ? handleUnlinkGoogle : () => handleGoogle()}>
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                    </svg>
                    {userData.user.google?.email ? userData.user.google?.email : dictionary.forms["profile-edit"]["connect-google"]}
                </button>
            </div>
        </div>

    );
}