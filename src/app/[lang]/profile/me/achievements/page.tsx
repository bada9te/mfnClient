import { cookies } from "next/headers";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { Suspense } from "react";
import AchievementsContainer from "@/components/containers/achievements-container/achievements-container";
import AchievementsContainerSkeleton from "@/components/containers/achievements-container/achievements-container-skeleton";
import { PreloadQuery } from "@/lib/apollo/client";
import { ACHIEVEMENTS_ALL_QUERY } from "@/utils/graphql-requests/achievements";
import envCfg from "@/config/env";
import { getDictionary } from "@/dictionaries/dictionaries";
import { TLang } from "@/types/language";
import { Metadata } from "next";


export const metadata: Metadata = {
    title: 'Music From Nothing - Achievements',
    description: 'The list of challenges',
}


export default async function Challenges({params}: {params: {lang: TLang}}) {
    const currentUserId = cookies().get(envCfg.userIdCookieKey as string)?.value as string;
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapper
            title={dict.app.profile.me.achievements.title}
            description={dict.app.profile.me.achievements.description}
        >
            <div className="card w-full">
                <div className="flex flex-wrap justify-center md:justify-around gap-5">
                    <PreloadQuery
                        query={ACHIEVEMENTS_ALL_QUERY}
                    >
                        <Suspense fallback={<AchievementsContainerSkeleton/>}>
                            <AchievementsContainer userId={currentUserId}/>
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>
    );
}