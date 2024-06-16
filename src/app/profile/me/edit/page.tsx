import ProfileCard from "@/components/profile/profile-card/profile-card";
import HeroWrapperForm from "@/components/wrappers/hero-wrapper-form";
import ProfileEditForm from "@/components/forms/profile-edit";

export default function EditProfile() {
    return (
        <>
            <ProfileCard isEditable/>
            <HeroWrapperForm
                bgStyles={"bg-[url('/assets/bgs/newPlaylistFormBG.png')] bg-right"}
                title={"Profile data"}
                description={"In this section the account details could be changed"}
            >
                <ProfileEditForm/>
            </HeroWrapperForm>
        </>
    );
}