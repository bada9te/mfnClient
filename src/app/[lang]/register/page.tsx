import RegisterForm from "@/components/forms/register";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";

export default async function Register({params}: {params: {lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title={dict.app.register.title}
            description={dict.app.register.description}
        >
            <RegisterForm/>
        </HeroWrapperForm>
    );
}