import { makeVar } from "@apollo/client";

export const imageCropperModalState = makeVar<{
    isShowing: boolean;
    imageType: string;
}>({
    isShowing: false,
    imageType: "avatar",
});