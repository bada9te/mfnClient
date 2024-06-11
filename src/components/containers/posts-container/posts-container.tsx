import { useCallback, useEffect } from 'react';
import PaginationTree from '../../common/pagination/pagination';
import { Box, Stack } from '@mui/material';
import EnumPosts from '../../enums/enum-posts';
import { OperationVariables, QueryResult, useLazyQuery, useReactiveVar } from '@apollo/client/index.js';
import { POSTS_BY_CATEGORY_QUERY, POSTS_BY_OWNER_QUERY, POSTS_QUERY, POSTS_SAVED_BY_USER_QUERY } from '@/utils/graphql-requests/posts';
import defineMaxPage from '../../../utils/common-functions/defineMaxPage';
import { baseState } from '../../baseReactive';
import { postsContainerState } from './reactive';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import InfoImage from '@/components/common/info-image/info-image';
import LogoClear from '@/assets/icons/logo_clear.png';
import PostsContainerSkeleton from "@/components/skeletons/posts-container-skeleton.tsx";
import {
    usePostsByCategoryLazyQuery,
    usePostsByOwnerLazyQuery,
    usePostsLazyQuery,
    usePostsSavedByUserLazyQuery
} from "@/utils/graphql-requests/generated/schema.ts";


export default function PostsContainer(props: {
    id?: string;
    profileLinkAccessable: boolean;
    savedOnly?: boolean;
    except?: unknown[];
    category?: string;
}) {
    const { id, profileLinkAccessable, savedOnly, except, category } = props;
    const location = useLocation();

    const { user: currentUser } = useReactiveVar(baseState);
    const { activePage, maxCountPerPage, maxPage, isLoading, posts } = useReactiveVar(postsContainerState);
    const [ getSavedOnlyPosts ] = usePostsSavedByUserLazyQuery();
    const [ getAllPosts ] = usePostsLazyQuery()
    const [ getOwnerPosts ] = usePostsByOwnerLazyQuery();
    const [ getPostsByCategory ] = usePostsByCategoryLazyQuery();
    const { t } = useTranslation("containers");
    
    const handlePageChange = (page: number) => {
        postsContainerState({...postsContainerState(), activePage: page});
    }

    const setPostsAndCount = useCallback((result: QueryResult<any, OperationVariables>, at: string) => {
        console.log(result.data)
        postsContainerState({
            ...postsContainerState(), 
            posts: result?.data?.[at]?.posts || [],
            /* @ts-ignore */
            maxPage: defineMaxPage(result?.data?.[at].count, maxCountPerPage),
        });
    }, [maxCountPerPage]);


    useEffect(() => {
        postsContainerState({...postsContainerState(), activePage: 1});
        //console.log(postsContainerState())
    }, [location.key, location]);


    useEffect(() => {
        const fetchData = async() => {
            try {
                postsContainerState({...postsContainerState(), isLoading: true, error: null});

                let result;
                let offset = activePage === 0 ? maxCountPerPage : (activePage - 1) * maxCountPerPage;
                
                if (savedOnly && currentUser._id !== "") {
                    // fetch saved by user
                    result = await getSavedOnlyPosts({
                        variables: { user: currentUser?._id, offset, limit: maxCountPerPage }
                    })
                    setPostsAndCount(result, "postsSavedByUser");
                } else if (id) {
                    // fetch by owner
                    result = await getOwnerPosts({
                        variables: { owner: id, offset, limit: maxCountPerPage }
                    });
                    setPostsAndCount(result, "postsByOwner");
                } else if (category) {
                    // fetch posts by category
                    result = await getPostsByCategory({
                        variables: { category, offset, limit: maxCountPerPage }
                    });
                    setPostsAndCount(result, "postsByCategory");
                } else {
                    // fetch all
                    result = await getAllPosts({
                        variables: { offset, limit: maxCountPerPage }
                    });
                    setPostsAndCount(result, "posts");
                }
            } catch (error) {
                console.error(error)
                postsContainerState({...postsContainerState(), error});
            } finally {
                postsContainerState({...postsContainerState(), isLoading: false});
            }
        }

        fetchData();
    }, [savedOnly, id, category, currentUser?._id, activePage, getAllPosts, getOwnerPosts, getSavedOnlyPosts, getPostsByCategory, maxCountPerPage, setPostsAndCount]);

    
    
    return ( 
        <>
            {
                (() => {
                    if (isLoading) {
                        return (
                            <PostsContainerSkeleton/>
                        );
                    } else if (posts.length === 0) {
                        return (
                            <Box sx={{mt: 3, mb: 5, minHeight: '88vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <InfoImage text={t('posts.not_found')} src={LogoClear}/>
                            </Box>
                        );
                    } else {
                        return (
                            <Stack 
                                spacing={2} 
                                sx={{
                                    width: '100%', 
                                    minHeight: '88vh',
                                    p: 2, 
                                    display: 'flex', 
                                    justifyContent: 'center',
                                    alignItems: 'flex-start',
                                }} 
                                direction="row" 
                                useFlexGap 
                                flexWrap="wrap"
                            >
                                <EnumPosts 
                                    profileLinkAccessable={profileLinkAccessable} 
                                    except={except} 
                                    posts={posts}
                                />
                            </Stack>
                        );
                    }
                })()
            }
            
            {
                posts.length > 0 && !isLoading
                &&
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', my: 5}}>
                    <PaginationTree maxPage={maxPage} activePage={activePage} handlePageChange={handlePageChange}/>
                </Box>
            }
        </>
    );
}
