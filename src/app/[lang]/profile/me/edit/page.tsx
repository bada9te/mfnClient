import ProfileCard from "@/app/[lang]/profile/components/profile-card/profile-card";
import ProfileEditForm from "./components/forms/profile-edit";
import { cookies } from "next/headers";
import { PreloadQuery } from "@/app/lib/apollo/client";
import { Suspense } from "react";
import { USER_QUERY } from "@/app/utils/graphql-requests/users";
import ProfileCardSkeleton from "@/app/[lang]/profile/components/profile-card/profile-card-skelton";
import envCfg from "@/app/config/env";
import { TLang } from "@/app/types/language";
import { getDictionary } from "@/app/translations/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Profile edit',
    description: 'Profile edit',
}

export default async function EditProfile({params}: {params: {lang: TLang}}) {
    const myId = cookies().get(envCfg.userIdCookieKey as string)?.value as string;
    const dict = await getDictionary(params.lang);
    return (
        <>
            <PreloadQuery
                query={USER_QUERY}
                variables={{
                    _id: myId
                }}
            >
                <Suspense fallback={<ProfileCardSkeleton/>}>
                    <ProfileCard isEditable userId={myId} dictionary={dict.components}/>
                </Suspense>
                <div className="m-0 md:m-4 md:mb-0 w-full">
                    <ProfileEditForm userId={myId} dictionary={dict.components}/>
                </div>
            </PreloadQuery>
        </>
    );
}