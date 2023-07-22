import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Accordion, AccordionDetails, AccordionSummary, Avatar, Card, CardHeader, Typography } from "@mui/material";
import './comment.scss';
import { ExpandMore } from "@mui/icons-material";
import Reply from "../reply/reply";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, setReplyingTo } from "../../containers/comments-container/commentsContainerSlice";
import { unwrapResult } from "@reduxjs/toolkit";
import CommentDropDown from "./comment-dropdown/comment-dropdown";
import { setReportingItemId } from "../../forms/report/reportFormSlice";
import { setIsShowing as setReportsModalIsShowing } from "../../modals/report-modal/reportModalSlice";
import { updateCommentsSocket } from "../../containers/posts-container/postsContainerSlice";
import userSocket from "../../../socket/user/socket-user";



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
        dispatch(deleteComment(id))
            .then(unwrapResult)
            .then(result => {
                //console.log(result);
                if (result.data.done) {
                    //console.log(`Comment: ${id} was removed.`);
                    //console.log(result.data)
                    dispatch(updateCommentsSocket({
                        comment: result.data.comment
                    }));
                    
                    userSocket.emit("post-remove-comment", {
                        postId: result.data.comment.post,
                        comment: result.data.comment,
                    });
                }
            });
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
                            src={user[2]} 
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
                                        goToProfile={goToProfile}
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
