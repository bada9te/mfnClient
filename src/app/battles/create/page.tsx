import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import BattleForm from "@/components/forms/battle";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";

export default function Battles() {
    return (
        <>
            <BarTabsBattles activeTab="create"/>
            <HeroWrapperForm
                fullWidth
                bgStyles="bg-[url('/assets/bgs/newBattleFormBG.png')] bg-right"
                title="New Battle"
                description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
            >
                <div className="card shadow-2xl bg-base-300">
                    <BattleForm/>
                </div>
            </HeroWrapperForm>
        </>
    );
}