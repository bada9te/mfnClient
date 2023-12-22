import getTimeSince from "../../common-functions/getTimeSince/getTimeSince";
import Comment from "../common/comment/comment";


const EnumComments = props => {
    const { comments } = props;

    return (
        <>
            {
                comments.map((item, i) => {
                    if (!item.isReply) {
                        return (
                            <Comment 
                                key={i}
                                id={item._id}
                                owner={item.owner}
                                createdAt={getTimeSince(new Date(+item.createdAt)) + ' ago'}
                                text={item.text}
                                isReply={false}
                                postId={item.post._id}
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