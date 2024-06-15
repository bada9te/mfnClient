import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import Battle from "@/components/entities/battle/battle";
import Post from "@/components/entities/post/post";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import Pagination from "@/components/pagination/pagination";

export default function Battles({params}: {params: {page: number}}) {
    return (
        <>
            <BarTabsBattles activeTab="finished"/>
            <HeroWrapper
                bgStyles="bg-[url('/assets/bgs/newBattleFormBG.png')] bg-right"
                title="Finished battles"
                description="Battles finished description"
            >
                <div className="card shadow-2xl glass w-full">
                    <div className="card card-body flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center w-full gap-10 sm:p-10">
                        <Battle post1={<Post/>} post2={<Post/>}/>
                        <Battle post1={<Post/>} post2={<Post/>}/>
                    </div>
                    <Pagination/>
                </div>
            </HeroWrapper>
        </>
    );
}