import RegisterForm from "@/components/forms/register";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";

export default function Login() {
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title="Register new account"
            description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi"
        >
            <RegisterForm/>
        </HeroWrapperForm>
    );
}