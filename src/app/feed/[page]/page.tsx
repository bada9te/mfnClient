import Post from "@/components/entities/post/post";
import Pagination from "@/components/pagination/pagination";
import HeroWrapper from "@/components/wrappers/hero-wrapper";

export default function Feed({params}: {params: { page: number }}) {
    return (
        <HeroWrapper
            bgStyles="bg-[url('/assets/bgs/newPostFormBG.png')] bg-right"
            title="Recent tracks"
            description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        >
            <div className="card shadow-2xl glass w-full">
                <div className="card-body flex flex-wrap flex-row justify-around gap-5">
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