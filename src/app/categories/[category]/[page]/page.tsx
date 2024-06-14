"use client"
import {useParams} from "next/navigation";
import Post from "@/components/entities/post/post";
import Playlist from "@/components/entities/playlist/playlist";
import HeroWrapper from "@/components/wrappers/hero-wrapper";

export default function Categories({params}: {params: {category: string, page: number}}) {
    const category = params.category;

    return (
        <HeroWrapper imgUrl="url('/assets/bgs/verifyFormBG.png')">
            <div className="flex w-full flex-col items-center justify-center py-10">
                <h1 className="mb-5 text-5xl font-bold">{category.substring(0, 1).toUpperCase() + category.substring(1, category.length)}</h1>
                <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                    exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                </p>
                <div className="card shadow-2xl bg-base-100 w-full">
                    <div className="card-body flex flex-wrap flex-row justify-between gap-5">
                        <Post/>
                        <Post/>
                        <Post/>
                        <Post/>
                    </div>
                </div>
            </div>
        </HeroWrapper>   
    );
}