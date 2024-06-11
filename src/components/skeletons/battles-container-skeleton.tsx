import {Stack} from "@mui/material";
import BattleItemUnavailable from "@/components/common/battle-item/battle-item-unavailable.tsx";

export default function BattlesContainerSkeleton() {
    return (
        <Stack spacing={2} p={2}>
            <BattleItemUnavailable/>
            <BattleItemUnavailable/>
            <BattleItemUnavailable/>
            <BattleItemUnavailable/>
            <BattleItemUnavailable/>
            <BattleItemUnavailable/>
        </Stack>
    );
}