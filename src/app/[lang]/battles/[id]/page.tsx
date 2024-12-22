import HeroWrapper from "@/app/components/wrappers/hero-wrapper";
import {PreloadQuery} from "@/app/lib/apollo/client";
import {Suspense} from "react";
import {BATTLE_BY_ID_QUERY} from "@/app/utils/graphql-requests/battles";
import BattleSkeleton from "@/app/components/entities/battle/battles-skeleton";
import BattleContainer from "@/app/components/containers/battles-container/battle-container";
import { TLang } from "@/types/language";
import { getDictionary } from "@/app/dictionaries/dictionaries";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Music From Nothing - Battle',
    description: 'Battle',
}

export default async function Battles({params}: {params: {id: string, lang: TLang}}) {
    const dict = await getDictionary(params.lang);
    return (
        <>
            <HeroWrapper
                title={dict.app.battles.id.title}
                description={dict.app.battles.id.description}
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
                                <BattleContainer id={params.id} dictionary={dict.components}/>
                            </Suspense>
                        </PreloadQuery>
                    </div>
                </div>
            </HeroWrapper>
        </>
    );
}