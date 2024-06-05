import { Comment as TComment } from "@/utils/graphql-requests/generated/schema";
import getTimeSince from "@/utils/common-functions/getTimeSince";
import Comment from "@/components/common/comment/comment";

export default function EnumComments(props: {
    comments: TComment[];
}) {
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
