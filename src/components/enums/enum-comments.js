import getTimeSince from "../../common-functions/getTimeSince";
import Comment from "../common/comment/comment";
import { useSelector } from "react-redux";


const EnumComments = props => {
    const locations = useSelector(state => state.base.locations);
    const comments = useSelector(state => state.commentsContainer.commentsData);

    return (
        <>
            {
                comments.map((item, i) => {
                    if (!item.isReply) {
                        return (
                            <Comment 
                                key={i}
                                id={item._id}
                                user={[
                                    item.owner._id, 
                                    item.owner.nick, 
                                    `${locations?.images}/${item.owner.avatar}`,
                                ]}
                                createdAt={getTimeSince(new Date(item.createdAt)) + ' ago'}
                                text={item.text}
                                replies={item.replies}
                            />
                        );
                    }
                    return null;
                })
            }
        </>
    );
}

export default EnumComments;