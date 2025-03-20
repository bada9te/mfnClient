import EmailVerificationForm from "./components/forms/email-verification";
import HeroWrapperForm from "../../components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/app/translations/dictionaries";
import { TLang } from "@/app/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Account verification',
    description: 'Account verification',
}

export default async function EmailVerification({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title={dict.app["account-restore"]["email-verify"].title}
            description={dict.app["account-restore"]["email-verify"].description}
        >
            <EmailVerificationForm dictionary={dict.components}/>
        </HeroWrapperForm>
    );
}