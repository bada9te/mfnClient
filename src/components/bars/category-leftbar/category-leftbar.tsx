import Link from "next/link";

export default function CategoryLeftBar(props: {
    title: string;
    bgImage: string;
    iconImage: string;
    description: string;
    count: number;
}) {
    const { title, bgImage, iconImage, description, count } = props;

    return (
        <div className={`card w-fit max-w-[305px] bg-cover bg-center bg-base-300 shadow-none text-white max-h-52 relative bg-opacity-90`} 
            //style={{ backgroundImage: `url(${bgImage})` }}
        >
            
            <div className="card-body relative">
                <div className="bg-secondary absolute top-0 left-0 w-fit rounded-br-xl rounded-tl-xl px-3 glass flex flex-row items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="size-4">
                        <path fillRule="evenodd" d="M5 1a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2H5Zm.75 6a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 3.75A.75.75 0 0 1 5.75 3h4.5a.75.75 0 0 1 0 1.5h-4.5A.75.75 0 0 1 5 3.75Zm.75 7.75a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5ZM5 10a.75.75 0 1 1 1.5 0A.75.75 0 0 1 5 10Zm5.25-3a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Zm-.75 3a.75.75 0 0 1 1.5 0v2.25a.75.75 0 0 1-1.5 0V10ZM8 7a.75.75 0 1 0 0 1.5A.75.75 0 0 0 8 7Zm-.75 5.25a.75.75 0 1 1 1.5 0 .75.75 0 0 1-1.5 0Zm.75-3a.75.75 0 1 0 0 1.5.75.75 0 0 0 0-1.5Z" clipRule="evenodd" />
                    </svg>
                    {count}
                </div>
                <div className="flex flex-row gap-4">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <img src={iconImage}/>
                        </div>
                    </div>
                    <h2 className="card-title">{title}</h2>
                </div>
                <p className="mr-8">{description}</p>

                <div className="absolute top-0 right-0 h-full card-actions justify-end p-1">
                    <Link className="btn btn-primary glass h-full btn-sm text-white rounded-xl" href={`/categories/${String(title).toLowerCase().replaceAll(' ', '-')}/1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                            <path fillRule="evenodd" d="M13.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L11.69 12 4.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M19.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 1 1-1.06-1.06L17.69 12l-6.97-6.97a.75.75 0 0 1 1.06-1.06l7.5 7.5Z" clipRule="evenodd" />
                        </svg>
                    </Link>
                </div>
            </div>
        </div>
    );
}