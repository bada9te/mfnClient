import PostsContainer from "../../components/containers/posts-container/posts-container";
import BaseContentContainer from "../../components/containers/base-content-container/base-content-container";
import { postsContainerState } from "../../components/containers/posts-container/reactive";

const SavedPosts = (props) => {
    postsContainerState({ ...postsContainerState(), activePage: 1 });

    return (
        <BaseContentContainer>
            <PostsContainer savedOnly={true} profileLinkAccessable={true}/>
        </BaseContentContainer>
    );
}

export default SavedPosts;