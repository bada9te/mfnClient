import LoginForm from "./components/forms/login";
import HeroWrapperForm from "../components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/app/translations/dictionaries";
import { TLang } from "@/app/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Welcome back',
    description: 'Welcome back',
}

export default async function Login({params}: {params: {lang: TLang}}) {
    const { lang } = await params;
    const dict = await getDictionary(lang);
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title={dict.app.login.title}
            description={dict.app.login.description}
            fullWidth
        >
            <LoginForm dictionary={dict.components}/>
        </HeroWrapperForm>
    );
}