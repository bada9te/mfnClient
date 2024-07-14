export default function CategoryLeftBar(props: {
    title: string;
    bgImage: string;
}) {
    const { title, bgImage } = props;

    return (
        <div className={`card rounded-2xl w-fit max-w-80 bg-cover bg-center shadow-none text-white max-h-52 ml-5`} style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="card-body glass rounded-2xl relative">
                <div className="flex flex-row gap-4">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src="/assets/icons/logo_clear.png"/>
                        </div>
                    </div>
                    <h2 className="card-title">{title}</h2>
                </div>
                <p>If a dog chews shoes whose shoes does he choose?</p>

                <div className="absolute top-0 right-0 h-full card-actions justify-end">
                    <a className="btn btn-primary h-full glass bg-pink-500 btn-sm rounded-l-none rounded-r-2xl" href={`/categories/${String(title).toLowerCase().replaceAll(' ', '-')}/1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </a>
                </div>
            </div>
        </div>
    );
}