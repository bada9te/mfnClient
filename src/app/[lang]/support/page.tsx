import SupportForm from "@/components/forms/support";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";


export default async function Support({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang)
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/supportFormBG.png')] bg-right"
            title={dict.app.support.title}
            description={dict.app.support.description}
        >
            <SupportForm/>
        </HeroWrapperForm>
    );
}