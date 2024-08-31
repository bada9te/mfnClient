import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import BattleForm from "@/components/forms/battle";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Music From Nothing - New battle',
    description: 'New battle',
}

export default async function Battles({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            <BarTabsBattles activeTab="create" dictionary={dict.components}/>
            <HeroWrapperForm
                fullWidth
                bgStyles="bg-[url('/assets/bgs/newBattleFormBG.png')] bg-right"
                title={dict.app.battles.create.title}
                description={dict.app.battles.create.description}
                disableMarginsOnMobile
            >
                <div className="card shadow-2xl bg-base-300">
                    <BattleForm dictionary={dict.components}/>
                </div>
            </HeroWrapperForm>
        </>
    );
}