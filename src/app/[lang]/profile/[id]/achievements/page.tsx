import AchievementsContainer from "@/components/containers/achievements-container/achievements-container";
import AchievementsContainerSkeleton from "@/components/containers/achievements-container/achievements-container-skeleton";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { PreloadQuery } from "@/lib/apollo/client";
import { ACHIEVEMENTS_ALL_QUERY } from "@/utils/graphql-requests/achievements";
import { Suspense } from "react";

export default function Challenges({params}: {params: {id: string}}) {
    return (
        <HeroWrapper
            title="Challenges"
            description="The list of challenges progression assosiated to me"
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