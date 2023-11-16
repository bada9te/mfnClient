import LeftBarPostsItem from "../common/left-bar-posts-item/left-bar-posts-item";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../baseReactive";

const EnumLeftBarPosts = props => {
    const { posts } = props;
    const { locations } = useReactiveVar(baseState);

    return (
        <>
            {
                posts.map((item, key) => {
                    return (
                        <div key={key}>
                            <LeftBarPostsItem 
                                id={item._id}
                                title={item.title} 
                                description={item.description}
                                image={`${locations?.images}/${item.image}`}
                                user={[
                                    item.owner._id, 
                                    item.owner.nick, 
                                    `${locations?.images}/${item.owner.avatar}`,
                                ]}
                            />
                        </div>
                    );
                })
            }
        </>
    );

}

export default EnumLeftBarPosts;