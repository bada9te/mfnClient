import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import BattleForm from "@/components/forms/battle";

export default function Battles() {
    return (
        <>
            <BarTabsBattles activeTab="create"/>
            <div className="hero min-h-screen bg-[url('/assets/bgs/newBattleFormBG.png')] bg-right rounded-none">
                <div className="hero-overlay bg-opacity-60 rounded-2xl"></div>
                <div className="hero-content text-center text-neutral-content py-10">
                    <div className="flex max-w-[800px] flex-col items-center justify-center">
                        <h1 className="mb-5 text-5xl font-bold">New Battle</h1>
                        <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                            exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                        </p>
                        <div className="card shadow-2xl bg-base-100 text-black">
                            <BattleForm/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}