import PostItem from "../common/post-item/post-item";
import getTimeSince from "../../common-functions/getTimeSince";
import { useSelector } from "react-redux";


const EnumPlaylistTracks = props => {
    const {tracks, profileLinkAccessable} = props;
    const locations = useSelector(state => state.base.locations);

    return (
        <>
            {
                tracks
                .map((item, key) => {
                    return (
                        <PostItem 
                            key={key}
                            base={{
                                ...item, 
                                ownerAvatar: `${locations?.images}/${item.owner.avatar}`,
                                createdAt: getTimeSince(new Date(item.createdAt)) + ' ago',
                                img: `${locations?.images}/${item.image}`,
                                audio: `${locations?.audios}/${item.audio}`,
                            }}
                            addons={{
                                commentsAllowed: item.commentsAllowed,
                                downloadsAllowed: item.downloadsAllowed,
                                status: null,
                                profileLinkAccessable: profileLinkAccessable,
                            }}
                        />
                    );
                })
            }
        </>
    )
}

export default EnumPlaylistTracks;