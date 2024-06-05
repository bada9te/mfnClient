export type TPostStatus = null | "upload" | "in-player" | "voting" | "selecting" | "battle-form";

export type TPostBase = {
    _id: string;
    title: string;
    description: string;
    savedBy: string[];
    likedBy: string[];
    comments: string[];
    createdAt: string;
    image: string;
    audio: string;
    owner: {
        _id: string;
        nick: string;
        avatar: string;
    }
}

export type TPostAddons = {
    commentsAllowed: boolean;
    downloadsAllowed: boolean;
    status: TPostStatus;
}