import { makeVar } from "@apollo/client";

export const bottomBarState = makeVar({
    showRB: false,
    showLB: false,
    showAduioPlayer: false,
    value: '',
});