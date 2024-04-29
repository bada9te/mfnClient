import { makeVar } from "@apollo/client";

export const trackContainerState = makeVar({
    inspectingPost: null,
});