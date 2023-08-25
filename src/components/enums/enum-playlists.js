import { useSelector } from "react-redux"
import Playlist from "../common/playlist/playlist";

const EnumPlaylists = (props) => {
    const playlists = useSelector(state => state.playlistsContainer.playlists);

    return (
        <>
            {
                playlists.map((playlist, key) => {
                    return (
                        <Playlist key={key} playlist={playlist}/>
                    );
                })
            }
        </>
    );
}

export default EnumPlaylists;