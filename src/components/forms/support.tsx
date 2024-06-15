import Link from "next/link";

export default function SupportForm() {
    return (
        <form className="card-body">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Email</span>
                </label>
                <input type="email" placeholder="email" className="input input-bordered" required/>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Contact reason</span>
                </label>
                <select className="select select-bordered w-full max-w-xs" required>
                    <option disabled selected>Who shot first?</option>
                    <option>Han Solo</option>
                    <option>Greedo</option>
                </select>
            </div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Details</span>
                </label>
                <textarea className="textarea textarea-bordered resize-none" rows={4}
                            placeholder="Details"
                            required></textarea>
            </div>
            <div className="form-control mt-4">
                <button className="btn btn-primary">Send support request</button>
            </div>
            <label className="label flex flex-col gap-3 justify-start items-start">
                <Link href="/faq" className="label-text-alt link link-hover">FAQ</Link>
            </label>
        </form>
    );
}