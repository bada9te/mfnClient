import BarTabsBattles from "@/components/bars/bar-tabs/bar-tabs-battles";
import HeroWrapper from "@/components/wrappers/hero-wrapper";
import {PreloadQuery} from "@/lib/apollo/client";
import {Suspense} from "react";
import BattlesContainer from "@/components/containers/battles-container/battles-container";
import BattlesContainerSkeleton from "@/components/containers/battles-container/battles-container-skeleton";
import {BATTLES_BY_STATUS_QUERY} from "@/utils/graphql-requests/battles";
import { TLang } from "@/types/language";
import { getDictionary } from "@/dictionaries/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Music From Nothing - Finished battles',
    description: 'Finished battles',
}

export default async function Battles({params}: {params: {page: number, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            <BarTabsBattles activeTab="finished" dictionary={dict.components}/>
            <HeroWrapper
                title={dict.app.battles.finished.title}
                description={dict.app.battles.finished.description}
                disableMarginsOnMobile
            >
                <div className="card w-full">
                    <div className="flex flex-col md:flex-row flex-wrap justify-center md:justify-between items-center w-full gap-10">
                        <PreloadQuery
                            query={BATTLES_BY_STATUS_QUERY}
                            variables={{
                                offset: (params.page - 1) * 6,
                                limit: 6,
                                finished: true,
                            }}
                        >
                            <Suspense fallback={<BattlesContainerSkeleton/>}>
                                <BattlesContainer
                                    offset={(params.page - 1) * 12}
                                    limit={12}
                                    finished={true}
                                    page={params.page}
                                    dictionary={dict.components}
                                />
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}