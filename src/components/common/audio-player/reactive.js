import { makeVar } from "@apollo/client";

export const audioPlayerState = makeVar({
    isShowing: false,
    src: "",
    isPlaying: false,
    isMuted: false,
    loop: false,
    controlsLocked: true,
    isLoading: false,
    currentTrack: null,
});