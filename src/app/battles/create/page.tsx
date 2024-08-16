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
                description="Ready to take the stage and lead the next great music showdown? Our Create New page is your gateway to launching a fresh and exciting music battle. Whether you're an artist, a promoter, or just a passionate music fan, this is where your vision for the ultimate music competition begins!"
                disableMarginsOnMobile
            >
                <div className="card shadow-2xl bg-base-300">
                    <BattleForm/>
                </div>
            </HeroWrapperForm>
        </>
    );
}