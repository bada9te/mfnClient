"use client"
import {useEffect, useState} from "react";

export default function CategoryLeftBar(props: {
    title: string;
    bgImage: string;
}) {
    const { title, bgImage } = props;
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return <></>
    }

    return (
        <div className={`card rounded-2xl w-fit max-w-80 bg-cover bg-center text-white max-h-52 mx-10 shadow-2xl`} style={{ backgroundImage: `url(${bgImage})` }}>
            <div className="card-body glass rounded-2xl">
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
                    <a className="btn btn-primary glass bg-pink-500 btn-sm" href={`/categories/${String(title).toLowerCase().replaceAll(' ', '-')}/1`}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="size-5">
                            <path fillRule="evenodd"
                                  d="M2.5 3A1.5 1.5 0 0 0 1 4.5v4A1.5 1.5 0 0 0 2.5 10h6A1.5 1.5 0 0 0 10 8.5v-4A1.5 1.5 0 0 0 8.5 3h-6Zm11 2A1.5 1.5 0 0 0 12 6.5v7a1.5 1.5 0 0 0 1.5 1.5h4a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 17.5 5h-4Zm-10 7A1.5 1.5 0 0 0 2 13.5v2A1.5 1.5 0 0 0 3.5 17h6a1.5 1.5 0 0 0 1.5-1.5v-2A1.5 1.5 0 0 0 9.5 12h-6Z"
                                  clipRule="evenodd"/>
                        </svg>
                        Open
                    </a>
                </div>
            </div>
        </div>
    );
}