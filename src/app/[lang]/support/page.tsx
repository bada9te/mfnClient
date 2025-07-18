import SupportForm from "./components/forms/support";
import HeroWrapperForm from "../components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/app/translations/dictionaries";
import { TLang } from "@/app/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Support',
    description: 'Support',
}

export default async function Support({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang)
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/supportFormBG.png')] bg-right"
            title={dict.app.support.title}
            description={dict.app.support.description}
            fullWidth
        >
            <SupportForm dictionary={dict.components}/>
        </HeroWrapperForm>
    );
}