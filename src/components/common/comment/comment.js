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
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { COMMENTS_REPLIES_BY_COMMENT_ID } from "../../../graphql-requests/comments";
import { SpinnerCircular } from "../spinner/Spinner";
import { useTranslation } from "react-i18next";


const Comment = (props) => {
    const { createdAt, owner, text, id, postId } = props;
    const { user: currentUser, locations } = useReactiveVar(baseState);
    const [ getReplies, { data: replies, loading } ] = useLazyQuery(COMMENTS_REPLIES_BY_COMMENT_ID, { variables: { _id: id } });
    const navigate = useNavigate();
    const { t } = useTranslation("objects");

    const ownerAvatar = `${locations.images}/${owner.avatar}`;

    const handleCommentSelection = () => {
        commentsContainerState({
            ...commentsContainerState(),
            replyingTo: {
                commentId: id,
                userId: owner._id,
                userNick: owner.nick,
            },
            postId,
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
        navigate(`/app/profile/${id}`)
    }


    return (
        <>

            <Card sx={{mb: 3, boxShadow: 1, marginBottom: 1, borderRadius: 5}}>
                <CardHeader
                    avatar={
                        <Avatar 
                            onClick={() => goToProfile(currentUser._id)}
                            src={ownerAvatar.endsWith('/') ? "NULL" : ownerAvatar} 
                            sx={{bgcolor: "gray", boxShadow: 3, cursor: 'pointer'}} 
                            aria-label="recipe"
                        />
                    }
                    title={owner.nick}
                    subheader={createdAt}
                    action={
                        <CommentDropDown 
                            handleReply={handleCommentSelection} 
                            handleDelete={handleCommentRemoving}
                            handleReport={handleReportComment}
                            canBeDeleted={owner._id === currentUser._id}
                        />
                    }
                />
                 
                <Accordion>
                    <AccordionSummary expandIcon={<ExpandMore/>} onClick={getReplies}>
                        <Typography>{text}</Typography>
                    </AccordionSummary>

                    <AccordionDetails>
                        {
                            (() => {
                                if (loading) {
                                    return (
                                        <SpinnerCircular/>
                                    );
                                } else if (replies?.commentReplies?.length > 0) {
                                    return (
                                        <>
                                            {
                                                replies.commentReplies.map((item, i) => {
                                                    return (
                                                        <Reply key={i} id={id} item={item} goToProfile={goToProfile} postId={postId}/>
                                                    );
                                                })
                                            }
                                        </>
                                    );
                                } else {
                                    return (t('comment.no_replies'));
                                }
                            })()
                        }
                    </AccordionDetails>    
                </Accordion>               
            </Card>
        </>
    );
}

export default Comment;
