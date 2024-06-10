
import PostGenerate from "../common/post-item/post-generate";
import {PostsMostPopularQuery, Post} from "@/utils/graphql-requests/generated/schema.ts";

export default function EnumPosts(props: {
    except?: unknown[];
    posts: PostsMostPopularQuery["postsMostPopular"];
    profileLinkAccessable: boolean;
}) {
    const { except, profileLinkAccessable, posts } = props;

    return (
        <>
            {
                posts?.filter((item) => {
                    if (except && except.indexOf(item._id) >= 0) {
                        return false;
                    } 
                    return true;
                }).map((item, key) => {
                    return (
                        <PostGenerate key={key} item={item as Post} addonsCorrections={{ profileLinkAccessable }}/>
                    );
                })
            }
        </>
    )
}