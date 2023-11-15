import PostItem from "../common/post-item/post-item";
import getTimeSince from "../../common-functions/getTimeSince";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../baseReactive";

const EnumPosts = props => {
    const {except, profileLinkAccessable, posts} = props;
    const { locations } = useReactiveVar(baseState);

    return (
        <>
            {
                posts
                .filter(item => {
                    if (except && except.indexOf(item._id) >= 0) {
                        return false;
                    } 
                    return true;
                })
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

export default EnumPosts;