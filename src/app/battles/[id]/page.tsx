import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import {PreloadQuery} from "@/lib/apollo/client";
import {Suspense} from "react";
import BattlesContainer from "@/components/containers/battles-container/battles-container";
import BattlesContainerSkeleton from "@/components/containers/battles-container/battles-container-skeleton";
import {BATTLE_BY_ID_QUERY, BATTLES_BY_STATUS_QUERY} from "@/utils/graphql-requests/battles";
import BattleSkeleton from "@/components/entities/battle/battles-skeleton";
import BattleContainer from "@/components/containers/battles-container/battle-container";

export default function Battles({params}: {params: {id: string}}) {
    return (
        <>
            <BarTabsBattles activeTab="finished"/>
            <HeroWrapper
                title="Specific battle"
                description="Just look at this..."
                disableMarginsOnMobile
            >
                <div className="card w-full">
                    <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center w-full gap-10">
                        <PreloadQuery
                            query={BATTLE_BY_ID_QUERY}
                            variables={{
                                _id: params.id
                            }}
                        >
                            <Suspense fallback={<BattleSkeleton/>}>
                                <BattleContainer id={params.id}/>
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}