import Link from "next/link";

export default function Login() {
    return (
        <div className="hero min-h-screen bg-[url('/assets/bgs/loginFormBG.png')] bg-left">
            <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md flex flex-col items-center justify-center">
                    <h1 className="mb-5 text-5xl font-bold">Sign in into account</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
                    <div className="card shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                        <form className="card-body">
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" required/>
                            </div>

                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered"
                                       required/>
                            </div>

                            <div className="form-control mt-4">
                                <button className="btn btn-primary">Login</button>
                            </div>
                            <label className="label flex flex-col gap-3 justify-start items-start">
                                <Link href="/register" className="label-text-alt link link-hover">Not registered
                                    yet?</Link>
                                <Link href="/register" className="label-text-alt link link-hover">Forgot
                                    password?</Link>
                            </label>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}