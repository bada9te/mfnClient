import AchievementsContainer from "@/app/[lang]/app/components/containers/achievements-container/achievements-container";
import AchievementsContainerSkeleton from "@/app/[lang]/app/components/containers/achievements-container/achievements-container-skeleton";
import HeroWrapper from "@/app/[lang]/app/components/wrappers/hero-wrapper";
import { getDictionary } from "@/app/translations/dictionaries";
import { PreloadQuery } from "@/app/lib/apollo/client";
import { TLang } from "@/app/types/language";
import { ACHIEVEMENTS_ALL_QUERY } from "@/app/utils/graphql-requests/achievements";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
    title: 'Tunes Hub - Achievements',
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