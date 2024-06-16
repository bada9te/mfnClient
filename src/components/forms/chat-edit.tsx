import Link from "next/link";
import ProfileCard from "@/components/profile/profile-card/profile-card";

export default function ChatEditForm() {
    return (
        <>
            <form className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Chat title</span>
                    </label>
                    <input type="text" placeholder="Chat title" className="input input-bordered shadow-md"
                           required/>
                </div>

                <div className="form-control mt-4">
                    <button className="btn btn-primary">Update title</button>
                </div>
            </form>

            <form className="card-body">
                <div className="form-control">
                    <label className="label">
                        <span className="label-text">Add participants</span>
                    </label>
                    <select className="select select-bordered w-full">
                        <option disabled selected>Who shot first?</option>
                        <option>Han Solo</option>
                        <option>Greedo</option>
                    </select>

                    <div className="form-control mt-4">
                        <button className="btn btn-primary">Update participants</button>
                    </div>
                </div>
            </form>

            <div className="card-body flex flex-col gap-5">
                <ProfileCard/>
                <ProfileCard/>
                <ProfileCard/>
            </div>
        </>
    );
}