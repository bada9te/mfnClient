"use client"
import Battle from "../../entities/battle/battle";
import {Battle as TBattle, useBattleByIdSuspenseQuery} from "@/app/utils/graphql-requests/generated/schema";
import InfoImage from "@/app/[lang]/app/components/common/info-image/info-image";
import { getDictionary } from "@/app/translations/dictionaries";


export default function BattleContainer({id, dictionary}: {id: string, dictionary: Awaited<ReturnType<typeof getDictionary>>["components"]}) {

    const { data } = useBattleByIdSuspenseQuery({
        variables: {
            _id: id
        },
    });

    return (
        <>
            {
                data?.battleById._id
                ?
                <Battle battleData={data.battleById as TBattle} dictionary={dictionary}/>
                :
                <InfoImage text="Battle not found" image="/assets/icons/battle-disk.png"/>
            }
        </>
    );
}