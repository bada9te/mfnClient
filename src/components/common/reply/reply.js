import { Card, CardHeader, Avatar, CardContent } from "@mui/material";
import getTimeSince from "../../../common-functions/getTimeSince";
import { useDispatch, useSelector } from "react-redux";
import { setReplyingTo } from "../../containers/comments-container/commentsContainerSlice";
import CommentDropDown from "../comment/comment-dropdown/comment-dropdown";


const Reply = props => {
    const {item, goToProfile, id} = props;
    const dispatch = useDispatch();
    const locations = useSelector(state => state.base.locations);
    
    const handleSelect = () => {
        dispatch(setReplyingTo({
            commentId: id,
            commentOwnerNick: item.owner.nick,
        }));
    }

    return (
        <Card sx={{ mb: 1, boxShadow: 1 }}>
            <CardHeader
                //onClick={() => goToProfile(item.owner._id)}
                avatar={
                    <Avatar
                        src={`${locations?.images}/${item.owner.avatar}`}
                        sx={{bgcolor: "gray", boxShadow: 3}} 
                        aria-label="recipe"
                    />
                }
                title={item.owner.nick}
                subheader={`${getTimeSince(new Date(item.createdAt))} ago`}
                action={
                    <CommentDropDown handleReply={handleSelect}/>
                    //<Button onClick={handleSelect}>Reply</Button>
                }
            />

            <CardContent>
                {item.text}
            </CardContent>
        </Card>
    );
}

export default Reply;