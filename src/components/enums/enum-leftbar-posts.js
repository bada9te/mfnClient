import LeftBarPostsItem from "../common/left-bar-posts-item/left-bar-posts-item";
import { useSelector } from "react-redux";

const EnumLeftBarPosts = props => {
    const { posts } = props;
    const locations = useSelector(state => state.base.locations);

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