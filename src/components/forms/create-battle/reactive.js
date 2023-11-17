import { makeVar } from "@apollo/client";

export const createBattleFormState = makeVar({
    post1: null,
    post2: null,
});