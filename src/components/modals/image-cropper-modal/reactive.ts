import { makeVar } from "@apollo/client/index.js";

export const imageCropperModalState = makeVar<{
    isShowing: boolean;
    imageType: string;
}>({
    isShowing: false,
    imageType: "avatar",
});