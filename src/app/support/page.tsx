import SupportForm from "@/components/forms/support";
import HeroWrapper from "@/components/wrappers/hero-wrapper";


export default function Login() {
    return (
        <HeroWrapper
            bgStyles="bg-[url('/assets/bgs/supportFormBG.png')] bg-right"
            title="Feel yourself free to contact us!"
            description="Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi."
        >
            <div className="card shadow-2xl bg-base-100 w-fit md:w-96">
                <SupportForm/>
            </div>
        </HeroWrapper>
    );
}