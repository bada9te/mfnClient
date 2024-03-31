
export type TReply = {
    owner: {
        _id: string;
        nick: string;
        avatar: string;
    };
    createdAt: string;
    text: string;
}

export type TUserId = {
    _id: string;
}
