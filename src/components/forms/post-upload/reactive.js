import { makeVar } from "@apollo/client";

export const postUploadFormState = makeVar({
    title: "Track title",
    description: "Track description",
    audioTitle: "Upload audio",
    imageTitle: "Upload image",
    picture: null,
    audio: null,
    uploadedPictureName: "",
    uploadedAudioName: "",
    commentsAllowed: true,
    downloadsAllowed: true,
});