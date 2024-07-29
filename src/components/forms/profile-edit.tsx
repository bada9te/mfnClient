"use client"
import {SubmitHandler, useForm} from "react-hook-form";
import {formsConstants} from "@/config/forms";
import { useSnackbar } from "notistack";
import { useUserPrepareAccountToRestoreMutation, useUserUpdateMutation } from "@/utils/graphql-requests/generated/schema";
import { useAppDispatch, useAppSelector } from "@/lib/redux/store";
import { setUser } from "@/lib/redux/slices/user";

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


export default function ProfileEditForm() {
    const { register: registerNick, handleSubmit: handleSubmitNick, formState: {errors: errorsNick} } = useForm<InputsNickname>();
    const { register: registerDescr, handleSubmit: handleSubmitDescr, formState: {errors: errorDescr} } = useForm<InputsDescription>();
    const { register: registerEmail, handleSubmit: handleSubmitEmail, formState: {errors: errorEmail} } = useForm<InputsEmail>();
    const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: {errors: errorsPassword} } = useForm<InputsPassword>();
    const { enqueueSnackbar } = useSnackbar();
    const [ updateUser ] = useUserUpdateMutation();
    const [ prepareToRestore ] = useUserPrepareAccountToRestoreMutation();
    const user = useAppSelector(state => state.user.user);
    const dispatch = useAppDispatch();

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

    return (
        <div className="card overflow-hidden bg-black shadow-xl glass">
            <div className="bg-black card-body m-1 pulsar-shadow text-white rounded-none shadow-2xl glass">
                <div className="divider divider-primary">Basics</div>

                <form onSubmit={handleSubmitNick(onSubmitNick)} noValidate>
                    <div className="form-control pt-0">
                        <label className="label">
                            <span className="label-text">Profile nickname</span>
                        </label>
                        <div className="join w-full">
                            <input type="text" placeholder="Nickname" className="input input-bordered shadow-md w-full glass placeholder:text-gray-200" {
                                ...registerNick("nickname", {
                                    minLength: { value: 4, message: "Min length must be 4" },
                                    maxLength: { value: 20, message: "Max length must be 20" },
                                    required: { value: true, message: "This field is required" },
                                })
                            }/>
                            <button className="btn btn-primary join-item glass text-white" type="submit">Save</button>
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
                            <span className="label-text">Profile description</span>
                        </label>
                        <div className="join w-full">
                            <input type="text" placeholder="Description" className="input input-bordered shadow-md w-full glass placeholder:text-gray-200" {
                                ...registerDescr("description", {
                                    minLength: { value: 4, message: "Min length must be 4" },
                                    maxLength: { value: 40, message: "Max length must be 40" },
                                    required: { value: true, message: "This field is required" },
                                })
                            }/>
                            <button className="btn btn-primary join-item glass text-white" type="submit">Save</button>
                        </div>
                        {
                            errorDescr.description &&
                            <label className="label">
                                <span className="label-text text-error">{errorDescr.description.message}</span>
                            </label>
                        }
                    </div>
                </form>

                <div className="divider divider-primary mt-10">Email</div>

                <form onSubmit={handleSubmitEmail(onSubmitEmail)} noValidate>
                    
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <div className="join w-full">
                            <input type="text" placeholder="Old email" className="input input-bordered shadow-md w-full glass placeholder:text-gray-200" {
                                ...registerEmail("oldEmail", {
                                    pattern: {value: formsConstants.emailRegex, message: "Email address is not valid"},
                                    required: { value: true, message: "This field is required" },
                                    validate: (value) => {
                                        const userEmail = user?.local?.email as string;
                                        if (userEmail !== value) {
                                            return "Wrong email address"
                                        }
                                    }
                                })
                            }/>
                            <button className="btn btn-primary join-item glass text-white" type="submit">Request</button>
                        </div>
                        {
                            errorEmail.oldEmail &&
                            <label className="label">
                                <span className="label-text text-error">{errorEmail.oldEmail.message}</span>
                            </label>
                        }
                    </div>
                </form>

                <div className="divider divider-primary mt-10">Password</div>

                <form onSubmit={handleSubmitPassword(onSubmitPassword)} noValidate>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Password</span>
                        </label>
                        <div className="join">
                            <input type="text" placeholder="Old password" className="join-item input input-bordered shadow-md w-full glass placeholder:text-gray-200" {
                                ...registerPassword("oldPassword", {
                                    minLength: { value: 8, message: "Min length must be 8" },
                                    maxLength: { value: 20, message: "Max length must be 20" },
                                    required: { value: true, message: "This field is required" }
                                })
                            }/>
                            <button className="btn btn-primary join-item glass text-white" type="submit">Request</button>
                        </div>
                        {
                            errorsPassword.oldPassword &&
                            <label className="label">
                                <span className="label-text text-error">{errorsPassword.oldPassword.message}</span>
                            </label>
                        }
                    </div>
                </form>

                <div className="divider divider-primary mt-10">Socials</div>
                <button className="btn hover:bg-white hover:text-black glass text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                    </svg>
                    Connect Google
                </button>
                <button className="btn hover:bg-blue-600 glass text-white">
                    <svg fill="#0091ff" height="25px" width="25px" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 310 310" stroke="#0091ff">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> 
                        <g id="XMLID_834_"> 
                            <path id="XMLID_835_" d="M81.703,165.106h33.981V305c0,2.762,2.238,5,5,5h57.616c2.762,0,5-2.238,5-5V165.765h39.064 c2.54,0,4.677-1.906,4.967-4.429l5.933-51.502c0.163-1.417-0.286-2.836-1.234-3.899c-0.949-1.064-2.307-1.673-3.732-1.673h-44.996 V71.978c0-9.732,5.24-14.667,15.576-14.667c1.473,0,29.42,0,29.42,0c2.762,0,5-2.239,5-5V5.037c0-2.762-2.238-5-5-5h-40.545 C187.467,0.023,186.832,0,185.896,0c-7.035,0-31.488,1.381-50.804,19.151c-21.402,19.692-18.427,43.27-17.716,47.358v37.752H81.703 c-2.762,0-5,2.238-5,5v50.844C76.703,162.867,78.941,165.106,81.703,165.106z">
                            </path>
                        </g> 
                        </g>
                    </svg>
                    Connect Facebook
                </button>
                <button className="btn hover:bg-black glass text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="32" height="32" viewBox="0 0 48 48">
                        <path fill="#212121" fill-rule="evenodd" d="M38,42H10c-2.209,0-4-1.791-4-4V10c0-2.209,1.791-4,4-4h28	c2.209,0,4,1.791,4,4v28C42,40.209,40.209,42,38,42z" clip-rule="evenodd"></path><path fill="#fff" d="M34.257,34h-6.437L13.829,14h6.437L34.257,34z M28.587,32.304h2.563L19.499,15.696h-2.563 L28.587,32.304z"></path><polygon fill="#fff" points="15.866,34 23.069,25.656 22.127,24.407 13.823,34"></polygon><polygon fill="#fff" points="24.45,21.721 25.355,23.01 33.136,14 31.136,14"></polygon>
                    </svg>
                    Connect Twitter
                </button>
            </div>
        </div>

    );
}