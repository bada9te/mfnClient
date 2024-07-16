import Post from "@/components/entities/post/post";
import InfoImage from "../info-image/info-image";

const PostPlaceholder = () => {
    return (
        <div className="border-2 border-dashed border-white w-64 md:w-80 h-96 flex flex-col justify-center items-center glass relative">
            <InfoImage text="Select yout track" />
            <button className="mt-5 btn btn-sm btn-primary glass  absolute bottom-0 w-full text-white">Select</button>
        </div>
    );
}

export default function BattleForm() {
    return (
        <form className="card-body w-full text-white glass bg-black shadow-2xl">
            <div className="divider divider-primary">New battle setup</div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Battle title</span>
                </label>
                <input type="text" placeholder="Title" className="input input-bordered shadow-md glass placeholder:text-gray-200" required/>
            </div>

            <div className="flex flex-wrap gap-5 mt-5 w-full justify-around">
                <div className="flex flex-col gap-3">
                    <p className='font-bold text-lg'>Your track</p>
                    <PostPlaceholder/>
                </div>

                <div className="flex flex-col gap-3">
                    <p className='font-bold text-lg'>{"Oponnent's track"}</p>
                    <PostPlaceholder/>
                </div>
            </div>


            <div className="form-control mt-5">
                <button className="btn btn-primary glass text-white">Create battle</button>
            </div>
        </form>
    );
}