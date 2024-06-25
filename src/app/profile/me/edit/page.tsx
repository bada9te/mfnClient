import ProfileCard from "@/components/profile/profile-card/profile-card";
import ProfileEditForm from "@/components/forms/profile-edit";


export default function EditProfile() {
    return (
        <>
            <ProfileCard isEditable/>
            <ProfileEditForm/>
        </>
    );
}