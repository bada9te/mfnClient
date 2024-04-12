import { makeVar } from "@apollo/client";
import { TPostAddons, TPostBase } from "components/common/post-item/types";


export const createBattleFormState = makeVar<{
    post1: {base: TPostBase; addons: TPostAddons} | null;
    post2: {base: TPostBase; addons: TPostAddons} | null;
}>({
    post1: null,
    post2: null,
});