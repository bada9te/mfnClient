export default function CurrentTrackOwner() {
    return (
        <div className="card w-full bg-base-100 shadow-xl rounded-2xl">
            <figure className="min-h-32"><img className="w-full"
                         src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/>
            </figure>
            <div className="card-body flex flex-col gap-3 text-center justify-center items-center">
                <div className="avatar flex justify-center">
                    <div className="w-24 mask mask-hexagon">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"/>
                    </div>
                </div>
                <h2 className="card-title">User profile header</h2>
                <p className="mt-3 md:mt-0">If a dog chews shoes whose shoes does he choose?</p>

                <div className="badge badge-secondary">789798787 followers</div>
                <div className="badge badge-accent">7897 following</div>
                <button className="btn btn-primary w-full">Subscribe</button>
            </div>
        </div>
    );
}