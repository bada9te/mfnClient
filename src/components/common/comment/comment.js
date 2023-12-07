import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardHeader, Typography } from "@mui/material";
import './comment.scss';
import { ExpandMore } from "@mui/icons-material";
import Reply from "../reply/reply";
import CommentDropDown from "./comment-dropdown/comment-dropdown";
import { reportFormState } from "../../forms/report/reactive";
import { confirmContainerState } from "../../containers/confirm-container/reactive";
import { confirmModalState } from "../../modals/confirm-modal/reactive";
import { reportModalState } from "../../modals/report-modal/reactive";
import { commentsContainerState } from "../../containers/comments-container/reactive";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";



const Comment = (props) => {
    const { createdAt, user, text, replies, id, post } = props;
    const { user: currentUser } = useReactiveVar(baseState);
    const navigate = useNavigate();

    const handleCommentSelection = () => {
        commentsContainerState({
            ...commentsContainerState(),
            replyingTo: [id, user[1]],
            postId: post._id,
        });
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

    // report comment
    const handleReportComment = () => {
        reportFormState({...reportFormState(), reportingItemId: id});
        reportModalState({ ...reportModalState(), isShowing: true });
    }


    // open owner profile
    const goToProfile = (id) => {
        navigate(`/profile/${id}`)
    }



    useEffect(() => {}, [replies])

    return (
        <>

            <Card sx={{mb: 3, boxShadow: 1, marginBottom: 1, borderRadius: 5}}>
                <CardHeader
                    avatar={
                        <Avatar 
                            onClick={() => goToProfile(currentUser._id)}
                            src={user[2].endsWith('/') ? "NULL" : user[2]} 
                            sx={{bgcolor: "gray", boxShadow: 3, cursor: 'pointer'}} 
                            aria-label="recipe"
                        />
                    }
                    title={user[1]}
                    subheader={createdAt}
                    action={
                        <CommentDropDown 
                            handleReply={handleCommentSelection} 
                            handleDelete={handleCommentRemoving}
                            handleReport={handleReportComment}
                            canBeDeleted={user[0] === currentUser._id}
                        />
                    }
                />
                 
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore/>}>
                        <Typography>{text}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {
                            replies?.length > 0
                            ?
                            replies.map((item, i) => {
                                return (
                                    <Reply
                                        key={i}
                                        id={id}
                                        item={item}
                                        goToProfile={goToProfile}
                                        postId={post._id}
                                    />
                                )
                            })
                            :
                            'No replies yet'
                        }
                    </AccordionDetails>    
                </Accordion>               
            </Card>
        </>
    );
}

export default Comment;
