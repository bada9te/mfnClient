import ProfileCard from "@/components/profile/profile-card/profile-card";
import ProfileEditForm from "@/components/forms/profile-edit";
import { cookies } from "next/headers";
import nextConfig from "@/../next.config.mjs";
import { PreloadQuery } from "@/lib/apollo/client";
import { Suspense } from "react";
import { USER_QUERY } from "@/utils/graphql-requests/users";
import ProfileCardSkeleton from "@/components/profile/profile-card/profile-card-skelton";


export default function EditProfile() {
    const myId = cookies().get(nextConfig.env?.userIdCookieKey as string)?.value as string
    return (
        <>
            <PreloadQuery
                query={USER_QUERY}
                variables={{
                    _id: myId
                }}
            >
                <Suspense fallback={<ProfileCardSkeleton/>}>
                    <ProfileCard isEditable userId={myId}/>
                </Suspense>
            </PreloadQuery>
            <ProfileEditForm/>
        </>
    );
}