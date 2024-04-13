import { makeVar } from "@apollo/client";

export const postUploadFormState = makeVar<{
    title: null | string,
    description: null | string,
    audioTitle: null | string,
    imageTitle: null | string,
    picture: null | string,
    audio: null | string,
    uploadedPictureName: string,
    uploadedAudioName: string,
    category: string,
    commentsAllowed: boolean,
    downloadsAllowed: boolean,
}>({
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