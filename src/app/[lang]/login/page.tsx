import LoginForm from "@/components/forms/login";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";

export default async function Login({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title={dict.app.login.title}
            description={dict.app.login.description}
        >
            <LoginForm/>
        </HeroWrapperForm>
    );
}