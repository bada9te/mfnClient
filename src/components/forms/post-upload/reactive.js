import { makeVar } from "@apollo/client";

export const postUploadFormState = makeVar({
    title: null,
    description: null,
    audioTitle: null,
    imageTitle: null,
    picture: null,
    audio: null,
    uploadedPictureName: "",
    uploadedAudioName: "",
    commentsAllowed: true,
    downloadsAllowed: true,
});