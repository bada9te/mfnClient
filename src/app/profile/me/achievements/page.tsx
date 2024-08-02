import { cookies } from "next/headers";
import nextConfig from "../../../../../next.config.mjs";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import { Suspense } from "react";
import AchievementsContainer from "@/components/containers/achievements-container/achievements-container";
import AchievementsContainerSkeleton from "@/components/containers/achievements-container/achievements-container-skeleton";

export default function Challenges() {
    const currentUser = cookies().get(nextConfig.env?.userIdCookieKey as string)?.value as string;

    return (
        <HeroWrapper
            title="Challenges"
            description="The list of challenges progression assosiated to me"
        >
            <div className="card w-full">
                <div className="flex flex-wrap justify-center md:justify-around gap-5">
                    <Suspense fallback={<AchievementsContainerSkeleton/>}>
                        <AchievementsContainer/>
                    </Suspense>
                </div>
            </div>
        </HeroWrapper>
    );
}