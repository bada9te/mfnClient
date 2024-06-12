import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import Battle from "@/components/entities/battle/battle";
import Post from "@/components/entities/post/post";

export default function Battles({params}: {params: {page: number}}) {
    return (
        <div className="flex flex-wrap gap-5 justify-center">
            <BarTabsBattles activeTab="in-progress"/>
            <Battle post1={<Post/>} post2={<Post/>}/>
            <Battle post1={<Post/>} post2={<Post/>}/>
        </div>
    );
}