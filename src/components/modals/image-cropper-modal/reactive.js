import { makeVar } from "@apollo/client";

export const imageCropperModalState = makeVar({
    isShowing: false,
    imageType: "avatar",
});