import { makeVar } from "@apollo/client";


type TReplyingTo = {
    commentId: null | string,
    userId: null | string,
    userNick: null | string,
}


export const replyingToNull: TReplyingTo = {
    commentId: null,
    userId: null,
    userNick: null,
}

export const commentsContainerState = makeVar<{
    commentsIds: string[];
    replyingTo: TReplyingTo;
    isLoading: boolean;
    postId: string | null;
    postOwnerId: string | null;
}>({
    commentsIds: [],
    replyingTo: replyingToNull,
    isLoading: true,
    postId: null,
    postOwnerId: null,
});
