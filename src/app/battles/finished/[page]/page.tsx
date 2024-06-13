import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import Battle from "@/components/entities/battle/battle";
import Post from "@/components/entities/post/post";
import BattleForm from "@/components/forms/battle";

export default function Battles({params}: {params: {page: number}}) {
    return (
        <>
            <BarTabsBattles activeTab="finished"/>
            <div className="hero min-h-screen bg-[url('/assets/bgs/newBattleFormBG.png')] bg-right rounded-none">
                <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
                <div className="hero-content text-center text-neutral-content">
                    <div className="flex w-full flex-col items-center justify-center py-10">
                        <h1 className="mb-5 text-5xl font-bold">Finished battles</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <div className="card shadow-2xl bg-base-100 text-black">
                            <Battle post1={<Post/>} post2={<Post/>}/>
                            <Battle post1={<Post/>} post2={<Post/>}/>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
        ;
}