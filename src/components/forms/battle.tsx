import Post from "@/components/entities/post/post";

export default function BattleForm() {
    return (
        <form className="card-body">
            <div className="form-control">
                <label className="label">
                    <span className="label-text">Battle title</span>
                </label>
                <input type="text" placeholder="Title" className="input input-bordered shadow-md" required/>
            </div>

            <div className="flex flex-wrap gap-5 mt-5">
                <div className="flex flex-col gap-3">
                    <p className='font-bold text-lg'>Your track</p>
                    <Post/>
                </div>

                <div className="flex flex-col gap-3">
                    <p className="font-bold text-lg">{'Opponent\'s track'}</p>
                    <div className="card w-fit md:w-80 bg-base-100 shadow-xl">
                        <figure><img
                            src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                            alt="Shoes"/></figure>
                        <div className="card-body">
                            <h2 className="card-title">
                                Shoes!
                                <div className="badge badge-secondary">NEW</div>
                            </h2>
                            <p>If a dog chews shoes whose shoes does he choose?</p>
                            <div className="card-actions justify-start">
                                <div className="badge badge-outline">Fashion</div>
                                <div className="badge badge-outline">Products</div>
                            </div>
                        </div>
                        <div className="card-actions justify-end p-2">
                            <button className="btn btn-sm btn-primary w-full">Play</button>
                        </div>
                    </div>
                </div>
            </div>


            <div className="form-control mt-4">
                <button className="btn btn-primary">Create battle</button>
            </div>
        </form>
    );
}