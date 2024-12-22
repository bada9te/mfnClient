import RegisterForm from "./components/forms/register";
import HeroWrapperForm from "@/app/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { TLang } from "@/types/language";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Music From Nothing - Register',
    description: 'Start the new journey',
}

export default async function Register({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title={dict.app.register.title}
            description={dict.app.register.description}
            fullWidth
        >
            <RegisterForm dictionary={dict.components}/>
        </HeroWrapperForm>
    );
}