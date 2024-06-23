"use client"
import {usePostsSavedByUserSuspenseQuery, usePostsSuspenseQuery} from "@/utils/graphql-requests/generated/schema";
import Post from "@/components/entities/post/post";
import Pagination from "@/components/pagination/pagination";
import InfoImage from "@/components/info-image/info-image";
import {TPaginationProps} from "@/types/pagination";
import {useAppSelector} from "@/lib/redux/store";


export default function PostsContainerSaved(props: TPaginationProps) {
    const { offset, limit, page } = props;
    const user = useAppSelector(state => state.user.user);

    const { data } = usePostsSavedByUserSuspenseQuery({
        variables: {
            offset, limit, user: user._id
        }
    });

    return (
        <>
            {
                data?.postsSavedByUser.posts?.length
                    ?
                    <>
                        {
                            data?.postsSavedByUser.posts?.map((post, key) => {
                                return (<Post key={key}/>)
                            })
                        }
                        <Pagination page={page} maxPage={Number(data?.postsSavedByUser.count as number / limit)}/>
                    </>
                    :
                    <InfoImage text={"No saved tracks yet"}/>
            }
        </>
    );
}