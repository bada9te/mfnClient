import { useQuery, useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import { COMMENTS_BY_POST_ID } from "../../../graphql-requests/comments";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumComments from "../../enums/enum-comments";
import { commentsContainerState } from "./reactive";


const CommentsContainer = props => {
    const { postId } = useReactiveVar(commentsContainerState);
    const { data, loading } = useQuery(COMMENTS_BY_POST_ID, { variables: { _id: postId } });

    return (
        <>
            {
                (() => {
                    if (loading) {
                        return (
                            <SpinnerLinear/>
                        );
                    } else if (!data?.commentsByPostId || data?.commentsByPostId.length === 0) {
                        return (
                            <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                                <Typography>
                                    No comments yet
                                </Typography>
                            </Box>
                        );
                    } else {
                        return (
                            <Stack>
                                <EnumComments comments={data.commentsByPostId}/>
                            </Stack>
                        );
                    }
                })()
            }
        </>
    );
}

export default CommentsContainer;