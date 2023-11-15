import { makeVar } from "@apollo/client";

export const commentsContainerState = makeVar({
    commentsIds: [],
    replyingTo: [null, null],
    isLoading: true,
    postId: null,
    postOwnerId: null,
});