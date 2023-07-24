import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardHeader, Typography } from "@mui/material";
import './comment.scss';
import { ExpandMore } from "@mui/icons-material";
import Reply from "../reply/reply";
import { useDispatch, useSelector } from "react-redux";
import { setReplyingTo } from "../../containers/comments-container/commentsContainerSlice";
import CommentDropDown from "./comment-dropdown/comment-dropdown";
import { setReportingItemId } from "../../forms/report/reportFormSlice";
import { setIsShowing as setReportsModalIsShowing } from "../../modals/report-modal/reportModalSlice";
import { setIsShowing } from "../../modals/confirm-modal/confirmModalSlice";
import { setActionType, setItemId, setText, setTitle } from "../../containers/confirm-container/confirmContainerSlice";



const Comment = (props) => {
    const {createdAt, user, text, replies, id} = props;
    const currentUserId = useSelector(state => state.base.user._id)
    const navigate = useNavigate();
    const dispatch = useDispatch();



    const handleCommentSelection = () => {
        dispatch(setReplyingTo({
            commentId: id,
            commentOwnerNick: user[1]
        }));
    }

    const handleCommentRemoving = async() => {
        dispatch(setIsShowing(true));
        dispatch(setActionType("delete-comment"));
        dispatch(setItemId(id));
        dispatch(setText("By confirming this, you agree that your comment will be removed without any ability to restore."));
        dispatch(setTitle("Confirm comment deletion"));
    }

    // report comment
    const handleReportComment = () => {
        dispatch(setReportingItemId(id));
        dispatch(setReportsModalIsShowing(true));
    }


    // open owner profile
    const goToProfile = (id) => {
        navigate(`/app/profile/${id}`)
    }



    useEffect(() => {}, [replies])

    return (
        <>

            <Card sx={{mb: 3, boxShadow: 1, marginBottom: 1}}>
                <CardHeader
                    //onClick={handleCommentSelection}
                    avatar={
                        <Avatar 
                            src={user[2].endsWith('/') ? "NULL" : user[2]} 
                            sx={{bgcolor: "gray", boxShadow: 3}} 
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
                            canBeDeleted={user[0] === currentUserId}
                        />
                        //<Button onClick={handleCommentSelection}>Reply</Button>
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
                                        //goToProfile={goToProfile}
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
