import { makeVar } from "@apollo/client";

export const pageLoaderState = makeVar<{
    isLoading: boolean;
}>({
    isLoading: false,
});
