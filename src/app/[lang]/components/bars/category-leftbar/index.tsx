import { Calculator, ChevronsRight, Layers } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function CategoryLeftBar(props: {
    id: string;
    title: string;
    bgImage: string;
    iconImage: string;
    description: string;
    count: string;
}) {
    const { title, bgImage, iconImage, description, count, id } = props;
    return (
        <div className={`card w-fit max-w-[305px] min-h-48 bg-cover bg-center bg-base-300 shadow-none text-base-content h-full relative rounded-2xl overflow-hidden `}>
            <Image src={bgImage} alt="category-bg" width={800} height={600} className="absolute bottom-0 left-0 rounded-bl-2xl min-h-48"/>
            <div className="card-body relative h-full">
                <div className="bg-base-300 absolute top-0 left-0 w-fit rounded-br-xl rounded-tl-xl p-1 px-2 flex flex-row items-center">
                    <Calculator size={16} className="mr-1"/>
                    {count}
                </div>
                <div className="flex flex-row items-center justify-center gap-4 bg-base-300 rounded-3xl w-fit  pr-5 bg-opacity-75">
                    <div className="avatar">
                        <div className="w-10 rounded-full">
                            <Image src={iconImage} alt="info-image" width={400} height={400}/>
                        </div>
                    </div>
                    <h2 className="card-title">{title}</h2>
                </div>
                <p className="mr-8">{description}</p>

                <div className="absolute top-0 right-0 h-full card-actions justify-end p-1">
                    <Link className="btn  bg-base-content text-black btn-sm rounded-2xl hover:text-base-content" href={`/src/app/%5Blang%5D/categories/${String(id).toLowerCase().replaceAll(' ', '-')}/1`}>
                        <ChevronsRight />
                    </Link>
                </div>
            </div>
        </div>
    );
}