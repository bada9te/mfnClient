import { makeVar } from "@apollo/client";

export const replyingToNull = {
    commentId: null,
    userId: null,
    userNick: null,
}

export const commentsContainerState = makeVar({
    commentsIds: [],
    replyingTo: replyingToNull,
    isLoading: true,
    postId: null,
    postOwnerId: null,
});
