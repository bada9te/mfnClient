import LeftBarPostsItem from "../common/left-bar-posts-item/left-bar-posts-item";
import { useReactiveVar } from "@apollo/client/index.js";
import { baseState } from "../baseReactive";
import { PostsByTitleQuery } from "utils/graphql-requests/generated/schema";

export default function EnumLeftBarPosts(props: {
    posts: PostsByTitleQuery["postsByTitle"]
}) {
    const { posts } = props;
    const { locations } = useReactiveVar(baseState);

    return (
        <>
            {
                posts?.map((item, key) => {
                    return (
                        <div key={key}>
                            <LeftBarPostsItem 
                                id={item._id}
                                title={item.title} 
                                description={item.description}
                                image={`${locations?.images}/${item.image}`}
                                user={{
                                    _id: item.owner._id, 
                                    nick: item.owner.nick, 
                                    avatar: `${locations?.images}/${item.owner.avatar}`,
                                }}
                            />
                        </div>
                    );
                })
            }
        </>
    );

}
