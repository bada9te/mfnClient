import PostsContainer from "../components/containers/posts-container/posts-container";
import BaseContentContainer from "../components/containers/base-content-container/base-content-container";


const SavedPosts = (props) => {
    return (
        <BaseContentContainer>
            <PostsContainer savedOnly={true} profileLinkAccessable={true}/>
        </BaseContentContainer>
    );
}

export default SavedPosts;