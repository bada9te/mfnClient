import LeftBarPostsItem from "../common/left-bar-posts-item/left-bar-posts-item";
import { useSelector } from "react-redux";

const EnumLeftBarPosts = props => {
    const postsData = useSelector(state => state.leftBarPostsContainer.postsData);
    const locations = useSelector(state => state.base.locations);

    return (
        <>
            {
                postsData.map((item, key) => {
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