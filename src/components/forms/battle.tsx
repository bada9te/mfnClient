import Post from "@/components/entities/post/post";

export default function BattleForm() {
    return (
        <form className="card-body w-full text-white glass bg-gray-950 rounded-2xl shadow-2xl">
            <div className="divider divider-primary">New battle setup</div>
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Battle title</span>
                </label>
                <input type="text" placeholder="Title" className="input input-bordered shadow-md" required/>
            </div>

            <div className="flex flex-wrap gap-5 mt-5 w-full justify-around">
                <div className="flex flex-col gap-3">
                    <p className='font-bold text-lg'>Your track</p>
                    <Post/>
                </div>

                <div className="flex flex-col gap-3">
                    <p className='font-bold text-lg'>Your track</p>
                    <Post/>
                </div>
            </div>


            <div className="form-control mt-4">
                <button className="btn btn-primary glass bg-pink-500">Create battle</button>
            </div>
        </form>
    );
}