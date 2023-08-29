import { unwrapResult } from "@reduxjs/toolkit";
import userSocket from "../../../../socket/user/socket-user";
import * as Alert from "../../../alerts/alerts";
import { switchPostInSaved } from "../../../containers/posts-container/postsContainerSlice";

const changeSaves = async(
    base, 
    isSaved, 
    currentUser, 
    theme,
    dispatch
    ) => {
    if (base.status !== "upload") {
        if (isSaved) {
            userSocket.emit("post-remove-save", {
                sender: currentUser._id,
                post: base._id,
                postOwnerId: base.owner._id,
            });
        } else {
            userSocket.emit("post-add-save", {
                receiver: base.owner._id,
                sender: currentUser._id,
                post: base._id,
                text: `${currentUser.nick} bookmarked your track`,
                selfAction: base.owner._id === currentUser._id,
            });
        }
        dispatch(switchPostInSaved({userId: currentUser._id, postId: base._id}))
            .then(unwrapResult)
            .then(result => {
                if (result.data.done) {
                    Alert.alertSuccess(`Success`, { theme });
                }
            });
    }
}

export default changeSaves;