import { makeVar } from "@apollo/client/index.js";

export const trackContainerState = makeVar({
    inspectingPost: null,
});