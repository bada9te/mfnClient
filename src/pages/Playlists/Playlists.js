import PlaylistsContainer from "../../components/containers/playlists-container/playlists-container";
import BaseContentContainer from "../../components/containers/base-content-container/base-content-container";

const Playlists = (props) => {
    return (
        <BaseContentContainer>
            <PlaylistsContainer/>
        </BaseContentContainer>
    );
}

export default Playlists;