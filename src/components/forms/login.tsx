import Link from "next/link";

export default function LoginForm() {
    return (
        <form className="card-body">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered shadow-md" required/>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered shadow-md"
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
    );
}