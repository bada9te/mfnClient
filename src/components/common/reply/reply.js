import { Card, CardHeader, Avatar, CardContent } from "@mui/material";
import getTimeSince from "../../../common-functions/getTimeSince";
import CommentDropDown from "../comment/comment-dropdown/comment-dropdown";
import { reportFormState } from "../../forms/report/reactive";
import { reportModalState } from "../../modals/report-modal/reactive";
import { commentsContainerState } from "../../containers/comments-container/reactive";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";


const Reply = props => {
    const { item, goToProfile, id } = props;
    const { locations } = useReactiveVar(baseState);
    
    const handleSelect = () => {
        commentsContainerState({
            ...commentsContainerState(),
            replyingTo: [id, item.owner.nick]
        });
    }

    // report comment
    const handleReportComment = () => {
        reportFormState({...reportFormState(), reportingItemId: id});
        reportModalState({ ...reportModalState(), isShowing: true });
    }

    return (
        <Card sx={{ mb: 1, boxShadow: 1 }}>
            <CardHeader
                onClick={() => goToProfile(item.owner._id)}
                avatar={
                    <Avatar
                        src={item.owner.avatar.endsWith('/') ? "NULL" : `${locations?.images}/${item.owner.avatar}`}
                        sx={{bgcolor: "gray", boxShadow: 3}} 
                        aria-label="recipe"
                    />
                }
                title={item.owner.nick}
                subheader={`${getTimeSince(new Date(+item.createdAt))} ago`}
                action={
                    <CommentDropDown handleReply={handleSelect} handleReport={handleReportComment}/>
                }
            />

            <CardContent>
                {item.text}
            </CardContent>
        </Card>
    );
}

export default Reply;