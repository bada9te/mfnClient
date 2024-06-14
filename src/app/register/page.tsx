import Link from "next/link";
import RegisterForm from "@/components/forms/register";

export default function Login() {
    return (
        <div className="hero min-h-screen bg-[url('/assets/bgs/loginFormBG.png')] bg-left">
            <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
            <div className="hero-content text-center">
                <div className="max-w-md flex flex-col items-center justify-center">
                    <h1 className="mb-5 text-5xl font-bold">Register new account</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <RegisterForm/>
                    </div>
                </div>
            </div>
        </div>
    );
}