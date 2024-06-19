"use client"
import Link from "next/link";
import {SubmitHandler, useForm} from "react-hook-form";
import {formsConstants} from "@/config/forms";
import {useSnackbar} from "notistack";
import {useUserCreateMutation} from "@/utils/graphql-requests/generated/schema";
import {useRouter} from 'next/navigation';

type Inputs = {
    email: string;
    nickname: string;
    password: string;
    repeatPassword: string;
};

export default function RegisterForm() {
    const { getValues, register, handleSubmit, formState: {errors}, reset } = useForm<Inputs>();
    const { enqueueSnackbar } = useSnackbar();
    const [ createUser ] = useUserCreateMutation();
    const router = useRouter();

    const onSubmit: SubmitHandler<Inputs> = async(data) => {
        createUser({
            variables: {
                input: {
                    email: data.email,
                    password: data.password,
                    nick: data.nickname,
                }
            }
        }).then(({data: result}) => {
            enqueueSnackbar(`Account ${data.email} was successfully created`, {variant: "success", autoHideDuration: 2000});
            reset();
            router.replace('/login');
        }).catch(err => {
            console.log(err.message)
            enqueueSnackbar(`Account with this email already exists`, {variant: 'error', autoHideDuration: 3000});
        });
    }

    return (
        <form className="card-body" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="divider divider-primary">Register</div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="Email" className="input input-bordered shadow-md" {
                    ...register("email", {
                        pattern: formsConstants.emailRegex,
                        required: true
                    })
                }/>
                {
                    errors.email &&
                    <label className="label">
                        <span className="label-text text-error">Email address is not valid</span>
                    </label>
                }
            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text">Nickname</span>
                </label>
                <input type="text" placeholder="Nickname" className="input input-bordered shadow-md" {
                    ...register("nickname", {
                        minLength: { value: 4, message: "Min length must be 4" },
                        maxLength: { value: 20, message: "Max length must be 20" },
                        required: { value: true, message: "This field is required" }
                    })
                }/>
                {
                    errors.nickname &&
                    <label className="label">
                        <span className="label-text text-error">{errors.nickname.message}</span>
                    </label>
                }

            </div>
            <div className="form-control">
                <label className="label">
                <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="Password" className="input input-bordered shadow-md" {
                    ...register("password", {
                        minLength: { value: 8, message: "Min length must be 8" },
                        maxLength: { value: 20, message: "Max length must be 20" },
                        required: { value: true, message: "This field is required" }
                    })}
                />
                {
                    errors.password &&
                    <label className="label">
                        <span className="label-text text-error">{errors.password.message}</span>
                    </label>
                }
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Repeat Password</span>
                </label>
                <input type="password" placeholder="Repeat password" className="input input-bordered shadow-md" {
                    ...register("repeatPassword", {
                        validate: (value) => {
                            const { password } = getValues();
                            if (!password) return false;
                            return password == value;
                        }
                    })
                }/>
                {
                    errors.repeatPassword &&
                    <label className="label">
                        <span className="label-text text-error">Password mismatch</span>
                    </label>
                }
            </div>
            <div className="form-control mt-4">
                <button className="btn btn-primary">Register</button>
            </div>
            <label className="label flex flex-col gap-3 justify-start items-start">
                <Link href="/login" className="label-text-alt link link-hover">Already have an account?</Link>
            </label>
        </form>
    );
}