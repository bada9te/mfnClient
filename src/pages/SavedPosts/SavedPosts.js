import PostsContainer from "../../components/containers/posts-container/posts-container";


const SavedPosts = (props) => {

    return (
        <>
            <PostsContainer savedOnly={true} profileLinkAccessable={true}/>
        </>
    );
}

export default SavedPosts;