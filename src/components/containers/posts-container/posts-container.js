import { useEffect } from 'react';
import { SpinnerLinear } from '../../common/spinner/Spinner';
import PaginationTree from '../../common/pagination/pagination';

import { Box, Stack, Typography } from '@mui/material';
import EnumPosts from '../../enums/enum-posts';
import { useDispatch, useSelector } from 'react-redux';
import { useLazyQuery } from '@apollo/client';
import { POSTS_BY_OWNER_QUERY, POSTS_QUERY, POSTS_SAVED_BY_USER_QUERY } from '../../../graphql/posts';
import defineMaxPage from '../../../common-functions/defineMaxPage';
import { setActivePage, setError, setIsLoading, setMaxPage, setPosts } from './postsContainerSlice';



const PostsContainer = (props) => {
    const {id, profileLinkAccessable, savedOnly, except} = props;

    const dispatch = useDispatch();
    const currentUser = useSelector(state => state?.base?.user);
    const maxCountPerPage = useSelector(state => state.postsContainer.maxCountPerPage);
    const maxPage = useSelector(state => state.postsContainer.maxPage)
    const activePage = useSelector(state => state.postsContainer.activePage)
    const posts = useSelector(state => state.postsContainer.posts)
    const isLoading = useSelector(state => state.postsContainer.isLoading)
    const error = useSelector(state => state.postsContainer.error)


    const [getSavedOnlyPosts, {}] = useLazyQuery(POSTS_SAVED_BY_USER_QUERY);
    const [getAllPosts, {}] = useLazyQuery(POSTS_QUERY);
    const [getOwnerPosts, {}] = useLazyQuery(POSTS_BY_OWNER_QUERY);
    
    
    const handlePageChange = page => {
        dispatch(setActivePage(page));
    }

    useEffect(() => {
        const fetchData = async() => {
            try {
                
                dispatch(setIsLoading(true));
                dispatch(setError(null));

                let result;
                let offset = activePage === 0 ? maxCountPerPage : (activePage - 1) * maxCountPerPage;
                
                if (savedOnly) {
                    result = await getSavedOnlyPosts({
                        variables: {
                            user: currentUser?._id,
                            offset,
                            limit: maxCountPerPage
                        }
                    })
                    dispatch(setPosts(result.data.postsSavedByUser.posts));
                    dispatch(setMaxPage(defineMaxPage(result.data.postsSavedByUser.count, maxCountPerPage)));
                } else if (id) {
                    result = await getOwnerPosts({
                        variables: {
                            owner: id,
                            offset,
                            limit: maxCountPerPage
                        }
                    })
                    dispatch(setPosts(result.data.postsByOwner.posts));
                    dispatch(setMaxPage(defineMaxPage(result.data.postsByOwner.count, maxCountPerPage)));
                } else {
                    result = await getAllPosts({
                        variables: {
                            offset,
                            limit: maxCountPerPage
                        }
                    });
                    dispatch(setPosts(result.data.posts.posts));
                    dispatch(setMaxPage(defineMaxPage(result.data.posts.count, maxCountPerPage)));
                }
            } catch (error) {
                console.log(error)
                dispatch(setError(error));
            } finally {
                dispatch(setIsLoading(false));
            }
        }

        fetchData();
    }, [savedOnly, id, currentUser?._id, activePage, getAllPosts, getOwnerPosts, getSavedOnlyPosts, dispatch, maxCountPerPage]);

    
    
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
                                <Typography sx={{textAlign: 'center'}}>No tracks yet</Typography>
                            </Box>
                        );
                    } else {
                        return (
                            <Stack 
                                spacing={4} 
                                sx={{
                                    width: '100%', 
                                    py: 4, 
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
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 10}}>
                    <PaginationTree maxPage={maxPage} activePage={activePage} handlePageChange={handlePageChange}/>
                </Box>
            }
        </>
    );
}


export default PostsContainer;