import Link from "next/link";
import {genres} from "@/config/categories";

export default function PostUploadForm() {
    return (
        <form className="card-body">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Track title</span>
                </label>
                <input type="text" placeholder="Track title" className="input input-bordered shadow-md" required/>
            </div>

            <div className="form-control">
                <label className="label">
                    <span className="label-text">Track description</span>
                </label>
                <input type="text" placeholder="Track description" className="input input-bordered shadow-md" required/>
            </div>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Track image</span>
                    <span className="label-text-alt">.jpg, .png</span>
                </div>
                <input type="file" className="file-input file-input-bordered w-full"/>
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Track audio</span>
                    <span className="label-text-alt">.mp3, .wav</span>
                </div>
                <input type="file" className="file-input file-input-bordered w-full"/>
            </label>

            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Genre</span>
                </div>
                <select className="select select-bordered">
                    {
                        genres.map((gen, key) => {
                            return <option key={key} value={key}>{gen.title}</option>
                        })
                    }
                </select>
            </label>

            <div className="form-control mt-4">
                <button className="btn btn-primary">Upload</button>
            </div>
        </form>
    );
}