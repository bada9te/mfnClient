import { useLocation } from "react-router-dom";
import TrackContainer from "../../components/containers/track-container/track-container";
import PostsContainer from "../../components/containers/posts-container/posts-container";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import BaseContentContainer from "../../components/containers/base-content-container/base-content-container";


const Track = (props) => {
    const location = useLocation();
    const inspectingPost = useSelector(item => item.trackContainer.inspectingPost);

    return (
        <BaseContentContainer>
            <Typography variant="h4" sx={{ m: 3, textAlign: 'center' }}>"{inspectingPost?.title}" by {inspectingPost?.owner.nick}</Typography>
            <TrackContainer trackId={location.state.trackId}/>
            <Typography variant="h4" sx={{ mt: 4, textAlign: 'center' }}>More tracks from {inspectingPost?.owner.nick}:</Typography>
            <PostsContainer id={location.state.ownerId} except={[location.state.trackId]} profileLinkAccessable={true}/>
        </BaseContentContainer>
    );
}

export default Track;