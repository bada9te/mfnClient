import AccountConfirminationForm from "@/components/forms/account-confirmination";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";

export default function AccountVerify({params}: {params: {
    userId: string;
    actionId: string;
    verifyToken: string;
    type: string;
}}) {
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title="Account confirmination"
            description="You will be able to sign in into your account after this step"
        >
            <AccountConfirminationForm {...params}/>
        </HeroWrapperForm>
    );
}