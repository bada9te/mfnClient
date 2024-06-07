import { makeVar } from "@apollo/client/index.js";

export const audioPlayerState = makeVar<{
    isShowing: boolean;
    src: string;
    isPlaying: boolean;
    isMuted: boolean;
    loop: boolean;
    controlsLocked: boolean;
    isLoading: boolean;
    currentTrack: null | any;
    volume: number;
}>({
    isShowing: false,
    src: "",
    isPlaying: false,
    isMuted: false,
    loop: false,
    controlsLocked: true,
    isLoading: false,
    currentTrack: null,
    volume: 0,
});