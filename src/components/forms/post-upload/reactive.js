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
    category: "",
    commentsAllowed: true,
    downloadsAllowed: true,
});