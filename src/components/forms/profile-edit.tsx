import {SubmitHandler, useForm} from "react-hook-form";
import {formsConstants} from "@/config/forms";

type InputsNickname = {
    nickname: string;
};

type InputsDescription = {
    description: string;
};

type InputsEmail = {
    oldEmail: string;
    newEmail: string;
};


export default function ProfileEditForm() {
    const { register: registerNick, handleSubmit: handleSubmitNick, formState: {errors: errorsNick} } = useForm<InputsNickname>();
    const { register: registerDescr, handleSubmit: handleSubmitDescr, formState: {errors: errorDescr} } = useForm<InputsDescription>();
    const { register: registerEmail, handleSubmit: handleSubmitEmail, formState: {errors: errorEmail} } = useForm<InputsEmail>();

    // nick
    const onSubmitNick: SubmitHandler<InputsNickname> = async(data) => {
        console.log(data)
    };

    // desc
    const onSubmitDescription: SubmitHandler<InputsDescription> = async(data) => {
        console.log(data)
    }

    // email
    const onSubmitEmail: SubmitHandler<InputsEmail> = async(data) => {
        console.log(data)
    }

    return (
        <div className="card-body">
            <div className="divider divider-primary">Basics</div>

            <form onSubmit={handleSubmitNick(onSubmitNick)} noValidate>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Profile nickname</span>
                    </label>
                    <div className="join w-full">
                        <input type="text" placeholder="Nickname" className="input input-bordered shadow-md w-full" {
                            ...registerNick("nickname", {
                                minLength: { value: 4, message: "Min length must be 4" },
                                maxLength: { value: 20, message: "Max length must be 20" },
                            })
                        }/>
                        <button className="btn btn-primary join-item" type="submit">Save</button>
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
                        <input type="text" placeholder="Description" className="input input-bordered shadow-md w-full" {
                            ...registerDescr("description", {
                                minLength: { value: 4, message: "Min length must be 4" },
                                maxLength: { value: 40, message: "Max length must be 40" },
                            })
                        }/>
                        <button className="btn btn-primary join-item" type="submit">Save</button>
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
                        <span className="label-text">Old Email</span>
                    </label>
                    <input type="text" placeholder="Old email" className="input input-bordered shadow-md w-full" {
                        ...registerEmail("oldEmail", {
                            pattern: {value: formsConstants.emailRegex, message: "Email address is not valid"},
                        })
                    }/>
                    {
                        errorEmail.oldEmail &&
                        <label className="label">
                            <span className="label-text text-error">{errorEmail.oldEmail.message}</span>
                        </label>
                    }
                </div>
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">New Email</span>
                    </label>
                    <div className="join w-full">
                        <input type="text" placeholder="New email" className="input input-bordered shadow-md w-full" {
                            ...registerEmail("newEmail", {
                                pattern: {value: formsConstants.emailRegex, message: "Email address is not valid"},
                            })
                        }/>
                        <button className="btn btn-primary join-item" type="submit">Save</button>
                    </div>
                    {
                        errorEmail.newEmail &&
                        <label className="label">
                            <span className="label-text">{errorEmail.newEmail.message}</span>
                        </label>
                    }
                </div>
            </form>


            <div className="divider divider-primary">Socials</div>
            <button className="btn btn-error">Connect google</button>
            <button className="btn btn-info">Connect facebook</button>
            <button className="btn btn-neutral">Connect twitter</button>
        </div>

    );
}