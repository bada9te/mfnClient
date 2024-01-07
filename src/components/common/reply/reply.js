import { Card, CardHeader, Avatar, CardContent } from "@mui/material";
import getTimeSince from "../../../common-functions/getTimeSince/getTimeSince";
import CommentDropDown from "../comment/comment-dropdown/comment-dropdown";
import { reportFormState } from "../../forms/report/reactive";
import { reportModalState } from "../../modals/report-modal/reactive";
import { commentsContainerState } from "../../containers/comments-container/reactive";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { confirmModalState } from "../../modals/confirm-modal/reactive";
import { confirmContainerState } from "../../containers/confirm-container/reactive";


const Reply = props => {
    const { item, goToProfile, id, postId } = props;
    const { locations, user: currentUser } = useReactiveVar(baseState);
    
    const handleSelect = () => {
        commentsContainerState({
            ...commentsContainerState(),
            replyingTo: {
                commentId: id,
                userId: item.owner._id,
                userNick: item.owner.nick,
            },
            postId,
        });
    }

    // report comment
    const handleReportComment = () => {
        reportFormState({...reportFormState(), reportingItemId: id});
        reportModalState({ ...reportModalState(), isShowing: true });
    }

    const handleCommentRemoving = async() => {
        confirmModalState({ ...confirmModalState(), isShowing: true, });
        confirmContainerState({
            ...confirmContainerState(),
            actionType: "delete-comment",
            itemId: id,
            text: "By confirming this, you agree that your comment will be removed without any ability to restore.",
            title: "Confirm comment deletion",
        });
    }

    return (
        <Card sx={{ mb: 1, boxShadow: 1 }}>
            <CardHeader
                avatar={
                    <Avatar
                        src={item.owner.avatar.endsWith('/') ? "NULL" : `${locations?.images}/${item.owner.avatar}`}
                        sx={{bgcolor: "gray", boxShadow: 3, cursor: 'pointer'}} 
                        aria-label="recipe"
                        onClick={() => goToProfile(item.owner._id)}
                    />
                }
                title={item.owner.nick}
                subheader={`${getTimeSince(new Date(+item.createdAt))} ago`}
                action={
                    <CommentDropDown 
                        handleReply={handleSelect} 
                        handleReport={handleReportComment} 
                        handleDelete={handleCommentRemoving}
                        canBeDeleted={item.owner._id === currentUser._id}
                    />
                }
            />

            <CardContent>{item.text}</CardContent>
        </Card>
    );
}

export default Reply;