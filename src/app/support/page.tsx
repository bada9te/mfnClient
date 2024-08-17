import SupportForm from "@/components/forms/support";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";


export default function Login() {
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/supportFormBG.png')] bg-right"
            title="Feel yourself free to contact us!"
            description="Whether you have questions, need troubleshooting assistance, or seek guidance on using our features, our comprehensive FAQs, contact options, and troubleshooting tips are here to assist you. We're dedicated to ensuring you have a smooth and enjoyable experience, so don’t hesitate to reach out if you need further assistance."
        >
            <SupportForm/>
        </HeroWrapperForm>
    );
}