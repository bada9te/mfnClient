import AccountConfirminationForm from "./components/forms/account-confirmination";
import HeroWrapperForm from "@/app/[lang]/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/app/translations/dictionaries";
import { TLang } from "@/app/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Music From Nothing - Account verification',
    description: 'Account verification',
}

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