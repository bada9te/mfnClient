import { Box, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import EnumComments from "../../enums/enum-comments";


const CommentsContainer = props => {
    const comments = useSelector(state => state.commentsContainer.commentsData);

    return (
        <>
            {
                !comments || comments.length === 0 
                ?
                <Box sx={{width: '100%', display: 'flex', justifyContent: 'center'}}>
                    <Typography>
                        No comments yet
                    </Typography>
                </Box>
                :
                <Stack>
                    <EnumComments/>
                </Stack>
            }
            
        </>
    );
}

export default CommentsContainer;