import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import {BATTLES_BY_STATUS_QUERY} from "@/utils/graphql-requests/battles";
import {Suspense} from "react";
import BattlesContainerSkeleton from "@/components/containers/battles-container/battles-container-skeleton";
import BattlesContainer from "@/components/containers/battles-container/battles-container";
import {PreloadQuery} from "@/lib/apollo/client";
import { TLang } from "@/types/language";
import { getDictionary } from "@/dictionaries/dictionaries";


export default async function Battles({params}: {params: {page: number, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            <BarTabsBattles activeTab="in-progress"/>
            <HeroWrapper
                title={dict.app.battles["in-progress"].title}
                description={dict.app.battles["in-progress"].description}
                disableMarginsOnMobile
            >
                <div className="card w-full">
                    <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center w-full gap-10">
                        <PreloadQuery
                            query={BATTLES_BY_STATUS_QUERY}
                            variables={{
                                offset: (params.page - 1) * 6,
                                limit: 6,
                                finished: false,
                            }}
                        >
                            <Suspense fallback={<BattlesContainerSkeleton/>}>
                                <BattlesContainer
                                    offset={(params.page - 1) * 12}
                                    limit={12}
                                    finished={false}
                                    page={params.page}
                                />
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}