import PostsContainer from "../components/containers/posts-container/posts-container";
import BaseContentContainer from "../components/containers/base-content-container/base-content-container";


export default function MainPage() {
    
    return (
        <BaseContentContainer>
            <PostsContainer profileLinkAccessable={true}/>
        </BaseContentContainer>
    );
}

