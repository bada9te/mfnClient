import { makeVar } from "@apollo/client/index.js";

export const bottomBarState = makeVar<{
    showRB: boolean;
    showLB: boolean;
    showAduioPlayer: boolean;
    value: string;
}>({
    showRB: false,
    showLB: false,
    showAduioPlayer: false,
    value: '',
});