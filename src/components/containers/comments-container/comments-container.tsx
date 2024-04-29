import { useQuery, useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import { COMMENTS_BY_POST_ID } from "../../../utils/graphql-requests/comments";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumComments from "../../enums/enum-comments";
import { commentsContainerState } from "./reactive";
import { useTranslation } from "react-i18next";


export default function CommentsContainer() {
    const { postId } = useReactiveVar(commentsContainerState);
    const { data, loading } = useQuery(COMMENTS_BY_POST_ID, { variables: { _id: postId } });
    const { t } = useTranslation("containers");

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
                                    {t('comments.not_found')}
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