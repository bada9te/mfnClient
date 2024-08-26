import AccountRestoreForm from "@/components/forms/account-restore";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";

export default function AccountRestore({params}: {params: {
    userId: string;
    actionId: string;
    verifyToken: string;
    type: string;
}}) {
    return (
        <HeroWrapperForm
            bgStyles="bg-[url('/assets/bgs/loginFormBG.png')] bg-left"
            title="Restore your account"
            description=""
        >
            <AccountRestoreForm {...params}/>
        </HeroWrapperForm>
    );
}