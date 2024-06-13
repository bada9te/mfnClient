"use client"
import {useParams} from "next/navigation";
import Post from "@/components/entities/post/post";
import Playlist from "@/components/entities/playlist/playlist";

export default function Categories({params}: {params: {category: string, page: number}}) {
    const category = params.category;

    return (
        <div>
            <div className="hero min-h-screen bg-[url('/assets/bgs/verifyFormBG.png')] bg-right rounded-none w-full">
                <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="flex w-full flex-col items-center justify-center py-10">
                        <h1 className="mb-5 text-5xl font-bold">{category.substring(0, 1).toUpperCase() + category.substring(1, category.length)}</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <div className="card shadow-2xl bg-base-100 text-black w-full">
                            <div className="card-body flex flex-wrap flex-row justify-between gap-5">
                                <Post/>
                                <Post/>
                                <Post/>
                                <Post/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}