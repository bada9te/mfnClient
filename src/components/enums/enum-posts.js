import PostItem from "../common/post-item/post-item";
import getTimeSince from "../../common-functions/getTimeSince";
import { useSelector } from "react-redux";

const EnumPosts = props => {
    const {except, profileLinkAccessable} = props;
    const locations = useSelector(state => state.base.locations);
    const posts = useSelector(state => state.postsContainer.posts);

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
                            id={item._id}
                            user={[
                                item.owner._id, 
                                item.owner.nick, 
                                `${locations?.images}/${item.owner.avatar}`,
                            ]}
                            createdAt={getTimeSince(new Date(item.createdAt)) + ' ago'}
                            title={item.title} 
                            description={item.description}
                            img={`${locations?.images}/${item.image}`}
                            audio={`${locations?.audios}/${item.audio}`}
                            likedBy={item.likedBy}
                            savedBy={item.savedBy}
                            comments={item.comments}
                            commentsAllowed={item.commentsAllowed}
                            downloadsAllowed={item.downloadsAllowed}
                            status={null}
                            profileLinkAccessable={profileLinkAccessable}
                        />
                    );
                })
            }
        </>
    )
}

export default EnumPosts;