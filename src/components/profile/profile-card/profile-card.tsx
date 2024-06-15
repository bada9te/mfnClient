export default function ProfileCard() {
    return (
        <div className="card w-full max-h-96 bg-base-100 shadow-xl rounded-none">
            <figure><img className="w-full" src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes"/>
            </figure>
            <div className="card-body flex flex-col md:flex-row gap-5">
                <div className="avatar flex justify-center">
                    <div className="w-32 mask mask-hexagon">
                        <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                    </div>
                </div>
                <div>
                    <h2 className="card-title flex flex-col md:flex-row">
                        User profile header
                        <div className="badge badge-secondary">789798787 followers</div>
                        <div className="badge badge-accent">7897 following</div>
                    </h2>
                    <p className="mt-3 md:mt-0">If a dog chews shoes whose shoes does he choose?</p>
                    <div className="card-actions justify-start mt-3">
                        <button className="btn btn-primary w-full md:w-96">Subscribe</button>
                    </div>
                </div>
            </div>
        </div>
    );
}