import { makeVar } from "@apollo/client";

export const userSelectContainerState = makeVar({
    isLoading: true,
    selectType: 'postShare',
    sharedItem: null,
});