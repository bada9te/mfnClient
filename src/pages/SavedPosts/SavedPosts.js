import { Typography } from "@mui/material";
import PostsContainer from "../../components/containers/posts-container/posts-container";


const SavedPosts = (props) => {

    return (
        <>
            <Typography variant="h4" sx={{ textAlign: 'center', mt: 4 }}>Saved tracks</Typography>
            <PostsContainer savedOnly={true} profileLinkAccessable={true}/>
        </>
    );
}

export default SavedPosts;