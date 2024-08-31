import AchievementsContainer from "@/components/containers/achievements-container/achievements-container";
import AchievementsContainerSkeleton from "@/components/containers/achievements-container/achievements-container-skeleton";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { getDictionary } from "@/dictionaries/dictionaries";
import { PreloadQuery } from "@/lib/apollo/client";
import { TLang } from "@/types/language";
import { ACHIEVEMENTS_ALL_QUERY } from "@/utils/graphql-requests/achievements";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Music From Nothing - Achievements',
    description: 'The list of challenges',
}

export default async function Challenges({params}: {params: {id: string, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <HeroWrapper
            title={dict.app.profile.id.achievements.title}
            description={dict.app.profile.id.achievements.description}
        >
            <div className="card w-full">
                <div className="flex flex-wrap justify-center md:justify-around gap-5">
                    <PreloadQuery
                        query={ACHIEVEMENTS_ALL_QUERY}
                    >
                        <Suspense fallback={<AchievementsContainerSkeleton/>}>
                            <AchievementsContainer userId={params.id}/>
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>
    );
}