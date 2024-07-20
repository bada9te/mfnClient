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
                <button className="btn btn-primary glass text-white">
                    <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 0 24 24" width="24">
                        <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                        <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                        <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                        <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                        <path d="M1 1h22v22H1z" fill="none"/>
                    </svg>
                    Connect Google
                </button>
                <button className="btn btn-primary glass text-white">
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
                <button className="btn btn-primary glass text-white">
                    <svg width="25px" height="25px" viewBox="0 -4 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000">
                    <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
                    <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
                    <g id="SVGRepo_iconCarrier"> <title>Twitter-color</title> <desc>Created with Sketch.</desc> <defs> </defs> 
                    <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-300.000000, -164.000000)" fill="#00AAEC"> 
                        <path d="M348,168.735283 C346.236309,169.538462 344.337383,170.081618 342.345483,170.324305 C344.379644,169.076201 345.940482,167.097147 346.675823,164.739617 C344.771263,165.895269 342.666667,166.736006 340.418384,167.18671 C338.626519,165.224991 336.065504,164 333.231203,164 C327.796443,164 323.387216,168.521488 323.387216,174.097508 C323.387216,174.88913 323.471738,175.657638 323.640782,176.397255 C315.456242,175.975442 308.201444,171.959552 303.341433,165.843265 C302.493397,167.339834 302.008804,169.076201 302.008804,170.925244 C302.008804,174.426869 303.747139,177.518238 306.389857,179.329722 C304.778306,179.280607 303.256911,178.821235 301.9271,178.070061 L301.9271,178.194294 C301.9271,183.08848 305.322064,187.17082 309.8299,188.095341 C309.004402,188.33225 308.133826,188.450704 307.235077,188.450704 C306.601162,188.450704 305.981335,188.390033 305.381229,188.271578 C306.634971,192.28169 310.269414,195.2026 314.580032,195.280607 C311.210424,197.99061 306.961789,199.605634 302.349709,199.605634 C301.555203,199.605634 300.769149,199.559408 300,199.466956 C304.358514,202.327194 309.53689,204 315.095615,204 C333.211481,204 343.114633,188.615385 343.114633,175.270495 C343.114633,174.831347 343.106181,174.392199 343.089276,173.961719 C345.013559,172.537378 346.684275,170.760563 348,168.735283" id="Twitter"> 
                        </path> 
                    </g> 
                    </g> 
                    </g>
                    </svg>
                    Connect Twitter
                </button>
            </div>
        </div>

    );
}