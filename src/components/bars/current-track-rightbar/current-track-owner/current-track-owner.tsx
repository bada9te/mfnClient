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
                <button className="btn btn-primary w-full">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path fillRule="evenodd"
                              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-11.25a.75.75 0 0 0-1.5 0v2.5h-2.5a.75.75 0 0 0 0 1.5h2.5v2.5a.75.75 0 0 0 1.5 0v-2.5h2.5a.75.75 0 0 0 0-1.5h-2.5v-2.5Z"
                              clipRule="evenodd"/>
                    </svg>
                    Subscribe
                </button>
            </div>
        </div>
    );
}