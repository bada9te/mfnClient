"use client"
import Battle from "@/components/entities/battle/battle";
import {Battle as TBattle, useBattleByIdSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import InfoImage from "@/components/common/info-image/info-image";


export default function BattleContainer({id}: {id: string}) {

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
                <Battle battleData={data.battleById as TBattle}/>
                :
                <InfoImage text="battle not found" image="/assets/icons/battle-disk.png"/>
            }
        </>
    );
}