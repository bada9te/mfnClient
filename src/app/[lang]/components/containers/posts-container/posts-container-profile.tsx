"use client"
import {Post as TPost, usePostsByOwnerSuspenseQuery} from "@/app/utils/graphql-requests/generated/schema";
import Post from "../../entities/post/post";
import Pagination from "@/app/[lang]/components/common/pagination/pagination";
import InfoImage from "@/app/[lang]/components/common/info-image/info-image";
import {TPaginationProps} from "@/app/types/pagination";
import { useAppSelector } from "@/app/lib/redux/store";
import RefreshButtonPerContainer from "@/app/[lang]/components/common/refresh-btn-container/refresh-btn-container";
import { getDictionary } from "@/app/translations/dictionaries";


export default function PostsContainerProfile(props: TPaginationProps & { profileId: string; dictionary: Awaited<ReturnType<typeof getDictionary>>["components"] }) {
    const { offset, limit, page, profileId, paginationHidden, dictionary } = props;
    const user = useAppSelector(state => state.user.user);

    const { data, refetch } = usePostsByOwnerSuspenseQuery({
        variables: {
            offset, limit, owner: profileId
        }
    });

    return (
        <>
            <RefreshButtonPerContainer handleClick={() => refetch({offset, limit, owner: profileId})} dictionary={dictionary}/>
            {
                data?.postsByOwner.posts?.length
                ?
                <>
                    {
                        data?.postsByOwner.posts?.map((post, key) => {
                            return (<Post key={key} data={post as TPost} dictionary={dictionary} editable={(user?._id && user._id === profileId) || false}/>)
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