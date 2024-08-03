import { cookies } from "next/headers";
import nextConfig from "../../../../../next.config.mjs";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { Suspense } from "react";
import AchievementsContainer from "@/components/containers/achievements-container/achievements-container";
import AchievementsContainerSkeleton from "@/components/containers/achievements-container/achievements-container-skeleton";
import { PreloadQuery } from "@/lib/apollo/client";
import { USER_QUERY } from "@/utils/graphql-requests/users";
import { ACHIEVEMENTS_ALL_QUERY } from "@/utils/graphql-requests/achievements";

export default function Challenges() {
    const currentUserId = cookies().get(nextConfig.env?.userIdCookieKey as string)?.value as string;

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
                            <AchievementsContainer userId={currentUserId}/>
                        </Suspense>
                    </PreloadQuery>
                </div>
            </div>
        </HeroWrapper>
    );
}