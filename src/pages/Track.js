import { useParams } from "react-router-dom";
import TrackContainer from "../components/containers/track-container/track-container";
import PostsContainer from "../components/containers/posts-container/posts-container";
import BaseContentContainer from "../components/containers/base-content-container/base-content-container";
import { useEffect } from "react";
import { postsContainerState } from "../components/containers/posts-container/reactive";


const Track = (props) => {
    const { id: trackId, owner: ownerId } = useParams();

    useEffect(() => {
        postsContainerState({...postsContainerState(), activePage: 1});
    }, [trackId, ownerId]);

    return (
        <BaseContentContainer>
            <TrackContainer trackId={trackId}/>
            <PostsContainer id={ownerId} except={[trackId]} profileLinkAccessable={true}/>
        </BaseContentContainer>
    );
}

export default Track;