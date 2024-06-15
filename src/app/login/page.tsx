import Link from "next/link";
import LoginForm from "@/components/forms/login";
import HeroWrapper from "@/components/wrappers/hero-wrapper";

export default function Login() {
    return (
        <HeroWrapper
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title="Sign in into account"
            description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi
                        exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        >
                    <div className="card shrink-0 w-full glass shadow-2xl bg-base-100">
                        <LoginForm/>
                    </div>
        </HeroWrapper>

    );
}