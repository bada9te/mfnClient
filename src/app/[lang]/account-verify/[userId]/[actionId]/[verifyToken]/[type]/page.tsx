import AccountConfirminationForm from "./components/forms/account-confirmination";
import HeroWrapperForm from "@/app/[lang]/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/app/translations/dictionaries";
import { TLang } from "@/app/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Account verification',
    description: 'Account verification',
}

export default async function AccountVerify({params}: {params: Promise<{
    userId: string;
    actionId: string;
    verifyToken: string;
    type: string;
    lang: TLang;
}>}) {
    const { lang, ...rest } = await params;
    const dict = await getDictionary(lang);
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title={dict.app["account-verify"].title}
            description={dict.app["account-verify"].description}
        >
            <AccountConfirminationForm {...rest} dictionary={dict.components}/>
        </HeroWrapperForm>
    );
}