import PostsContainer from "../../components/containers/posts-container/posts-container";
import BaseContentContainer from "../../components/containers/base-content-container/base-content-container";


const MainPage = (props) => {

    return (
        <BaseContentContainer>
            <PostsContainer profileLinkAccessable={true}/>
        </BaseContentContainer>
    );
}

export default MainPage;
