import { useReactiveVar } from "@apollo/client";
import getTimeSince from "../../common-functions/getTimeSince";
import { baseState } from "../baseReactive";
import Playlist from "../common/playlist/playlist";

const EnumPlaylists = (props) => {
    const { playlists } = props;
    const { locations } = useReactiveVar(baseState);

    return (
        <>
            {
                playlists.map((playlist, key) => {
                    return (
                        <Playlist key={key} playlist={{
                            ...playlist, 
                            ownerAvatar: `${locations.images}/${playlist.owner.avatar}`,
                            createdAt: getTimeSince(new Date(+playlist.createdAt)) + ' ago'
                        }}/>
                    );
                })
            }
        </>
    );
}

export default EnumPlaylists;