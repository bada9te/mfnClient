"use client"
import {useParams} from "next/navigation";
import Post from "@/components/entities/post/post";

export default function Categories({params}: {params: {category: string, page: number}}) {
    const category = params.category;

    return (
        <div>
            <p className="text-xl font-bold">{category.substring(0,1).toUpperCase() + category.substring(1, category.length)}</p>
            <div className="flex flex-wrap gap-5 justify-between mt-5">
                <Post/>
                <Post/>
                <Post/>
                <Post/>
            </div>
        </div>
    );
}