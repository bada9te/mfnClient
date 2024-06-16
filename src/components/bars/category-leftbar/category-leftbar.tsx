
export default function CategoryLeftBar(props: {
    title: string;
    bgImage: string;
}) {
    const { title, bgImage } = props;
    return (
        <div className={`card w-fit bg-cover bg-center shadow-xl text-white max-h-52`} style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="card-body">
                <div className="flex flex-row gap-4">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src="/assets/icons/logo_clear.png"/>
                        </div>
                    </div>
                    <h2 className="card-title">{title}</h2>
                </div>
                <p>If a dog chews shoes whose shoes does he choose?</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary">Open</button>
                </div>
            </div>
        </div>
    );
}