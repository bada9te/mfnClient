import { useReactiveVar } from "@apollo/client/index.js";
import getTimeSince from "../../utils/common-functions/getTimeSince";
import { baseState } from "../baseReactive";
import Playlist from "../common/playlist/playlist";
import { Playlist as TPlaylist } from "utils/graphql-requests/generated/schema";

export default function EnumPlaylists(props: {
    playlists: TPlaylist[]
}) {
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
