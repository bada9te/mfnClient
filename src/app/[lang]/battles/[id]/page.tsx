import HeroWrapper from "../../components/wrappers/hero-wrapper";
import {PreloadQuery} from "@/app/lib/apollo/client";
import {Suspense} from "react";
import {BATTLE_BY_ID_QUERY} from "@/app/utils/graphql-requests/battles";
import BattleSkeleton from "../../components/entities/battle/battles-skeleton";
import BattleContainer from "@/app/[lang]/components/containers/battles-container/battle-container";
import { TLang } from "@/app/types/language";
import { getDictionary } from "@/app/translations/dictionaries";
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