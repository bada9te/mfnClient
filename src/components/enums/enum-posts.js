import PostGenerate from "../common/post-item/post-generate";

const EnumPosts = props => {
    const { except, profileLinkAccessable, posts } = props;

    return (
        <>
            {
                posts
                .filter(item => {
                    if (except && except.indexOf(item._id) >= 0) {
                        return false;
                    } 
                    return true;
                })
                .map((item, key) => {
                    return (
                        <PostGenerate key={key} item={item} addonsCorrections={{ profileLinkAccessable }}/>
                    );
                })
            }
        </>
    )
}

export default EnumPosts;