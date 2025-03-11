import BarTabsBattles from "../../components/navigation-bar";
import HeroWrapper from "@/app/[lang]/components/wrappers/hero-wrapper";
import {BATTLES_BY_STATUS_QUERY} from "@/app/utils/graphql-requests/battles";
import {Suspense} from "react";
import BattlesContainerSkeleton from "@/app/[lang]/components/containers/battles-container/battles-container-skeleton";
import BattlesContainer from "@/app/[lang]/components/containers/battles-container/battles-container";
import {PreloadQuery} from "@/app/lib/apollo/client";
import { TLang } from "@/app/types/language";
import { getDictionary } from "@/app/translations/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Tunes Hub - Live battles',
    description: 'Battles in progress',
}

export default async function Battles({params}: {params: {page: number, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            <BarTabsBattles activeTab="in-progress" dictionary={dict.components}/>
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
                                    offset={(params.page - 1) * 6}
                                    limit={6}
                                    finished={false}
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