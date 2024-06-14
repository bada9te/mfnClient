import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import BattleForm from "@/components/forms/battle";
import HeroWrapper from "@/components/wrappers/hero-wrapper";

export default function Battles() {
    return (
        <>
            <BarTabsBattles activeTab="create"/>
            <HeroWrapper imgUrl="url('/assets/bgs/newBattleFormBG.png')">
                <div className="flex max-w-[800px] flex-col items-center justify-center">
                    <h1 className="mb-5 text-5xl font-bold">New Battle</h1>
                    <p className="mb-5">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <div className="card shadow-2xl bg-base-100">
                        <BattleForm/>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}