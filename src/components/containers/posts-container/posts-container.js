import { useCallback, useEffect, useLayoutEffect } from 'react';
import { SpinnerLinear } from '../../common/spinner/Spinner';
import PaginationTree from '../../common/pagination/pagination';
import { Box, Stack, Typography } from '@mui/material';
import EnumPosts from '../../enums/enum-posts';
import { useLazyQuery, useReactiveVar } from '@apollo/client';
import { POSTS_BY_CATEGORY_QUERY, POSTS_BY_OWNER_QUERY, POSTS_QUERY, POSTS_SAVED_BY_USER_QUERY } from '../../../utils/graphql-requests/posts';
import defineMaxPage from '../../../utils/common-functions/defineMaxPage';
import { baseState } from '../../baseReactive';
import { postsContainerState } from './reactive';
import { useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';



const PostsContainer = (props) => {
    const { id, profileLinkAccessable, savedOnly, except, category } = props;
    const location = useLocation();

    const { user: currentUser } = useReactiveVar(baseState);
    const { activePage, maxCountPerPage, maxPage, isLoading, posts } = useReactiveVar(postsContainerState);
    const [ getSavedOnlyPosts ] = useLazyQuery(POSTS_SAVED_BY_USER_QUERY);
    const [ getAllPosts] = useLazyQuery(POSTS_QUERY);
    const [ getOwnerPosts ] = useLazyQuery(POSTS_BY_OWNER_QUERY);
    const [ getPostsByCategory ] = useLazyQuery(POSTS_BY_CATEGORY_QUERY);
    const { t } = useTranslation("containers");
    
    const handlePageChange = page => {
        postsContainerState({...postsContainerState(), activePage: page});
    }

    const setPostsAndCount = useCallback((result, at) => {
        //console.log(result.data.postsByOwner)
        postsContainerState({
            ...postsContainerState(), 
            posts: result.data[at].posts,
            maxPage: defineMaxPage(result.data[at].count, maxCountPerPage),
        });
    }, [maxCountPerPage]);


    useLayoutEffect(() => {
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
                            <SpinnerLinear/>
                        );
                    } else if (posts.length === 0) {
                        return (
                            <Box sx={{mt: 3, mb: 5, minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography sx={{textAlign: 'center'}}>{t('posts.not_found')}</Typography>
                            </Box>
                        );
                    } else {
                        return (
                            <Stack 
                                spacing={2} 
                                sx={{
                                    width: '100%', 
                                    py: 1.5, 
                                    display: 'flex', 
                                    justifyContent: 'space-around',
                                    alignItems: 'center',
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


export default PostsContainer;