import { makeVar } from "@apollo/client/index.js";

export const profileCardState = makeVar({
    profileOwner: null,
});