import { useParams } from "react-router-dom";
import TrackContainer from "../../components/containers/track-container/track-container";
import PostsContainer from "../../components/containers/posts-container/posts-container";
import BaseContentContainer from "../../components/containers/base-content-container/base-content-container";


const Track = (props) => {
    const { id: trackId, owner: ownerId } = useParams();

    return (
        <BaseContentContainer>
            <TrackContainer trackId={trackId}/>
            <PostsContainer id={ownerId} except={[trackId]} profileLinkAccessable={true}/>
        </BaseContentContainer>
    );
}

export default Track;