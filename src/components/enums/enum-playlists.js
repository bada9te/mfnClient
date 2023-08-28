import { useSelector } from "react-redux"
import getTimeSince from "../../common-functions/getTimeSince";
import Playlist from "../common/playlist/playlist";

const EnumPlaylists = (props) => {
    const playlists = useSelector(state => state.playlistsContainer.playlists);
    const locations = useSelector(state => state.base.locations);

    return (
        <>
            {
                playlists.map((playlist, key) => {
                    return (
                        <Playlist key={key} playlist={{
                            ...playlist, 
                            ownerAvatar: `${locations.images}/${playlist.owner.avatar}`,
                            createdAt: getTimeSince(new Date(playlist.createdAt)) + ' ago'
                        }}/>
                    );
                })
            }
        </>
    );
}

export default EnumPlaylists;