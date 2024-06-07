import { makeVar } from "@apollo/client/index.js";

export const userSelectContainerState = makeVar<{
    isLoading: boolean;
    selectType: string;
    includeChats: boolean;
    sharedItem: any;
    checked: { _id: string, __typename: string }[]
}>({
    isLoading: true,
    selectType: 'postShare',
    includeChats: false,
    sharedItem: null,
    checked: []
});