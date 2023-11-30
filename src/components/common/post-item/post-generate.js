import { useReactiveVar } from "@apollo/client";
import getTimeSince from "../../../common-functions/getTimeSince";
import { baseState } from "../../baseReactive";
import PostItem from "./post-item";

const PostGenerate = (props) => {
    const { item, addonsCorrections, baseCorrections } = props;
    const { locations } = useReactiveVar(baseState);



    return (
        <PostItem 
            base={{
                ...item, 
                ownerAvatar: `${locations?.images}/${item.owner.avatar}`,
                createdAt: getTimeSince(new Date(+item.createdAt)) + ' ago',
                img: `${locations?.images}/${item.image}`,
                audio: `${locations?.audios}/${item.audio}`,
                ...baseCorrections
            }}
            addons={{
                commentsAllowed: item.commentsAllowed,
                downloadsAllowed: item.downloadsAllowed,
                status: null,
                profileLinkAccessable: true,
                ...addonsCorrections
            }}
        />
    );
}

export default PostGenerate;