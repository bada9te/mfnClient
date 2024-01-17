import PostItem from "../common/post-item/post-item";
import getTimeSince from "../../utils/common-functions/getTimeSince";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../baseReactive";


const EnumPlaylistTracks = props => {
    const {tracks, profileLinkAccessable} = props;
    const { locations } = useReactiveVar(baseState);

    return (
        <>
            {
                tracks.map((item, key) => {
                    return (
                        <PostItem 
                            key={key}
                            base={{
                                ...item, 
                                ownerAvatar: `${locations?.images}/${item.owner.avatar}`,
                                createdAt: getTimeSince(new Date(+item.createdAt)) + ' ago',
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