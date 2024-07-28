"use client"
import {Post as TPost, usePostsByOwnerSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/common/pagination/pagination";
import InfoImage from "@/components/common/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";
import { useAppSelector } from "@/lib/redux/store";


export default function PostsContainerProfile(props: TPaginationProps & { profileId: string }) {
    const { offset, limit, page, profileId, paginationHidden } = props;
    const user = useAppSelector(state => state.user.user);

    const { data } = usePostsByOwnerSuspenseQuery({
        variables: {
            offset, limit, owner: profileId
        }
    });

    return (
        <>
            {
                data?.postsByOwner.posts?.length
                ?
                <>
                    {
                        data?.postsByOwner.posts?.map((post, key) => {
                            return (<Post key={key} data={post as TPost} editable={user?._id && user._id === profileId}/>)
                        })
                    }
                    { !paginationHidden && <Pagination page={page} maxPage={Number(data?.postsByOwner.count as number / limit)}/> }
                </>
                :
                <InfoImage text={"No tracks yet"} image="/assets/icons/logo_clear.png"/>
            }
        </>
    );
}