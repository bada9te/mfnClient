import AccountRestoreForm from "./components/forms/account-restore";
import HeroWrapperForm from "@/app/[lang]/app/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/app/translations/dictionaries";
import { TLang } from "@/app/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Restore',
    description: 'Restore the account',
}

export default async function AccountRestore({params}: {params: {
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
            title={dict.app["account-restore"].restore.title}
            description={dict.app["account-restore"].restore.description}
        >
            <AccountRestoreForm {...params} dictionary={dict.components}/>
        </HeroWrapperForm>
    );
}