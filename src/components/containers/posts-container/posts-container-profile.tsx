"use client"
import {usePostsByOwnerSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/pagination/pagination";
import InfoImage from "@/components/info-image/info-image";
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
                            return (<Post key={key}/>)
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