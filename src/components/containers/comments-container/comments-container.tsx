import Comment from "@/components/entities/comment/comment";
import CommentSkeleton from "@/components/entities/comment/comment-skeleton";
import InfoImage from "@/components/common/info-image/info-image";
import { Comment as TComment, useCommentsByPostIdLazyQuery, useCommentsByPostIdQuery, useCommentsByPostIdSuspenseQuery } from "@/utils/graphql-requests/generated/schema";
import { useEffect } from "react";
import CommentsContainerSkeleton from "./comments-container-skeleton";

export default function CommentsContainer({postId}: {postId: string}) {
    const [fetchComments, {data, loading, refetch, fetchMore}] = useCommentsByPostIdLazyQuery();

    useEffect(() => {
        postId && fetchComments({
            variables: {
                _id: postId,
                offset: 0,
                limit: 12
            }
        });
    }, [postId]);

    return (
        <div className="flex flex-col gap-2 w-full">
            {
                (() => {
                    if (loading) {
                        return <CommentsContainerSkeleton/>
                    }

                    if (data?.commentsByPostId?.length) {
                        return (
                            <>
                                {
                                    data.commentsByPostId.map((comment, key) => {
                                        return (
                                            <Comment key={key} data={comment as TComment}/>
                                        )
                                    })
                                }
                            </>
                        )
                    }
                    return (
                        <InfoImage text={"No comments yet"}/>
                    );       
                })()
            }
        </div>
    );
}