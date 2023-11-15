import { useLocation } from "react-router-dom";
import TrackContainer from "../../components/containers/track-container/track-container";
import PostsContainer from "../../components/containers/posts-container/posts-container";
import { Typography } from "@mui/material";
import { useSelector } from "react-redux";
import BaseContentContainer from "../../components/containers/base-content-container/base-content-container";


const Track = (props) => {
    const location = useLocation();

    return (
        <BaseContentContainer>
            <TrackContainer trackId={location.state.trackId}/>
            <PostsContainer id={location.state.ownerId} except={[location.state.trackId]} profileLinkAccessable={true}/>
        </BaseContentContainer>
    );
}

export default Track;