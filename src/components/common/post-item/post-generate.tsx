import { useReactiveVar } from "@apollo/client";
import getTimeSince from "utils/common-functions/getTimeSince";
import { baseState } from "components/baseReactive";
import PostItem from "./post-item";
import { TPostAddons, TPostBase } from "./types";
import { Post } from "utils/graphql-requests/generated/schema";

export default function PostGenerate(props: {
    item: Post;
    addonsCorrections?: TPostAddons | any;
    baseCorrections?: TPostBase | any;
}) {
    const { item, addonsCorrections, baseCorrections } = props;
    const { locations } = useReactiveVar(baseState);

    return (
        <PostItem 
            base={{
                ...item, 
                ownerAvatar: `${locations?.images}/${item.owner.avatar}`,
                createdAt: getTimeSince(new Date(+item.createdAt)) + ' ago',
                img: `${locations?.images}/${item.image}`,
                audio: `${locations?.audios}/${item.audio}`,
                ...baseCorrections
            }}
            addons={{
                commentsAllowed: item.commentsAllowed,
                downloadsAllowed: item.downloadsAllowed,
                status: null,
                profileLinkAccessable: true,
                ...addonsCorrections
            }}
        />
    );
}
