import { makeVar } from "@apollo/client";

export const profileCardFormState = makeVar({
    picture: null,
    avatarTitle: "Select image",
    backgroundTitle: "Select image",
});