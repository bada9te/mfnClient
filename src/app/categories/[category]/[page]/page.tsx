"use client"
import {useParams} from "next/navigation";
import Post from "@/components/entities/post/post";
import Playlist from "@/components/entities/playlist/playlist";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import Pagination from "@/components/pagination/pagination";

export default function Categories({params}: {params: {category: string, page: number}}) {
    const category = params.category;

    return (
        <HeroWrapper
            bgStyles="bg-[url('/assets/bgs/verifyFormBG.png')] bg-right"
            title={category.substring(0, 1).toUpperCase() + category.substring(1, category.length)}
            description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        >
            <div className="card shadow-2xl glass w-full">
                <div className="card-body flex flex-wrap flex-row justify-between gap-5">
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
                <Pagination/>
            </div>
        </HeroWrapper>   
    );
}