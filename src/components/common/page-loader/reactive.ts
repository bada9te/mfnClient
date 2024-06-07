import { makeVar } from "@apollo/client/index.js";

export const pageLoaderState = makeVar<{
    isLoading: boolean;
}>({
    isLoading: false,
});
