import PostUploadForm from "../../components/forms/post-upload/post-upload";

import { Typography, Box } from "@mui/material";


const PostUpload = (props) => {
    return (
        <>
            <Box>
                <Box sx={{pt: 2}}>
                    <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                        Post upload
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                        Set up your post using form below:
                    </Typography>
                </Box>

                <Box sx={{pt: 5, m: 1}}>
                    <PostUploadForm/>
                </Box>
            </Box>
        </>
    );
}

export default PostUpload;