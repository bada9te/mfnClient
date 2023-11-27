import { useQuery, useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import { COMMENTS_BY_IDS_QUERY } from "../../../graphql-requests/comments";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumComments from "../../enums/enum-comments";
import { commentsContainerState } from "./reactive";


const CommentsContainer = props => {
    const { commentsIds } = useReactiveVar(commentsContainerState);
    const { data, loading } = useQuery(COMMENTS_BY_IDS_QUERY, { 
        variables: {
            ids: commentsIds.map(i => i._id),
        },
    });

    return (
        <>
            {
                (() => {
                    if (loading) {
                        return (
                            <SpinnerLinear/>
                        );
                    } else if (!data?.commentsByIds || data?.commentsByIds.length === 0) {
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
                                <EnumComments comments={data.commentsByIds}/>
                            </Stack>
                        );
                    }
                })()
            }
        </>
    );
}

export default CommentsContainer;