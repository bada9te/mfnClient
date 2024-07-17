"use client"
import {Post as TPost, usePostsByOwnerSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/common/pagination/pagination";
import InfoImage from "@/components/common/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";


export default function PostsContainerProfile(props: TPaginationProps & { profileId: string }) {
    const { offset, limit, page, profileId } = props;

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
                            return (<Post key={key} data={post as TPost}/>)
                        })
                    }
                    <Pagination page={page} maxPage={Number(data?.postsByOwner.count as number / limit)}/>
                </>
                :
                <InfoImage text={"No tracks yet"}/>
            }
        </>
    );
}