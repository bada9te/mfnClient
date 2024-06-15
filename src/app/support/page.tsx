import SupportForm from "@/components/forms/support";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";


export default function Login() {
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/supportFormBG.png')] bg-right"
            title="Feel yourself free to contact us!"
            description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        >
            <SupportForm/>
        </HeroWrapperForm>
    );
}