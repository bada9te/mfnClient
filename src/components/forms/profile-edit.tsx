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
    const { register: registerPassword, handleSubmit: handleSubmitPassword, formState: {errors: errorsPassword} } = useForm<InputsPassword>()
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
        <div className="bg-black card-body text-white rounded-none md:rounded-2xl shadow-2xl glass">
            <div className="divider divider-primary">Basics</div>

            <form onSubmit={handleSubmitNick(onSubmitNick)} noValidate>
                <div className="form-control">
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
                        <button className="btn btn-primary join-item glass bg-pink-500" type="submit">Save</button>
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
                        <button className="btn btn-primary join-item glass bg-pink-500" type="submit">Save</button>
                    </div>
                    {
                        errorDescr.description &&
                        <label className="label">
                            <span className="label-text text-error">{errorDescr.description.message}</span>
                        </label>
                    }
                </div>
            </form>

            <div className="divider divider-primary">Email</div>

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
                        <button className="btn btn-primary join-item glass bg-pink-500" type="submit">Request</button>
                    </div>
                    {
                        errorEmail.oldEmail &&
                        <label className="label">
                            <span className="label-text text-error">{errorEmail.oldEmail.message}</span>
                        </label>
                    }
                </div>
            </form>

            <div className="divider divider-primary">Password</div>

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
                        <button className="btn btn-primary join-item glass bg-pink-500" type="submit">Request</button>
                    </div>
                    {
                        errorsPassword.oldPassword &&
                        <label className="label">
                            <span className="label-text text-error">{errorsPassword.oldPassword.message}</span>
                        </label>
                    }
                </div>
            </form>

            <div className="divider divider-primary">Socials</div>
            <button className="btn btn-error glass bg-error">Connect google</button>
            <button className="btn btn-info glass bg-info">Connect facebook</button>
            <button className="btn btn-neutral glass bg-neutral">Connect twitter</button>
        </div>

    );
}