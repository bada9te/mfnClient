import AccountRestoreForm from "@/components/forms/account-restore";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Music From Nothing - Restore',
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