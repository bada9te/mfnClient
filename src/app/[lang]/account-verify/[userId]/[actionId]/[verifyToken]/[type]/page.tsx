import AccountConfirminationForm from "@/components/forms/account-confirmination";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";

export default async function AccountVerify({params}: {params: {
    userId: string;
    actionId: string;
    verifyToken: string;
    type: string;
    lang: TLang;
}}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title={dict.app["account-verify"].title}
            description={dict.app["account-verify"].description}
        >
            <AccountConfirminationForm {...params} dictionary={dict.components}/>
        </HeroWrapperForm>
    );
}