import EmailVerificationForm from "@/components/forms/email-verification";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";

export default function EmailVerification() {
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title="Email verification"
            description="Pls provide the email address that is linked to your account"
        >
            <EmailVerificationForm/>
        </HeroWrapperForm>
    );
}