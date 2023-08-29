import userSocket from "../../../../socket/user/socket-user";
import { switchPostLike } from "../../../containers/posts-container/postsContainerSlice";

const changeLikes = async(
    addons, 
    base,
    isLiked,
    currentUser,
    dispatch
    ) => {
    if (addons.status !== "upload") {
        if (addons.status !== "upload") {
            if (isLiked) {
                userSocket.emit("post-remove-like", {
                    sender: currentUser._id,
                    post: base._id,
                    postOwnerId: base.owner._id,
                });
            } else {
                userSocket.emit("post-add-like", {
                    receiver: base.owner._id,
                    sender: currentUser._id,
                    post: base._id,
                    text: `${currentUser.nick} liked your track`,
                    selfAction: base.owner._id === currentUser._id,
                });
            }
        }
        dispatch(switchPostLike({userId: currentUser._id, postId: base._id}));
    } 
}

export default changeLikes;