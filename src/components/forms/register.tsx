import Link from "next/link";

export default function RegisterForm() {
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
                    <span className="label-text">Nickname</span>
                </label>
                <input type="text" placeholder="nickname" className="input input-bordered shadow-md" required/>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Password</span>
                </label>
                <input type="password" placeholder="password" className="input input-bordered shadow-md"
                       required/>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Repeat Password</span>
                </label>
                <input type="password" placeholder="repeat password" className="input input-bordered shadow-md"
                       required/>
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