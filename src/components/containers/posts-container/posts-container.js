import { useEffect, useState } from 'react';
import { SpinnerLinear } from '../../common/spinner/Spinner';
import PaginationTree from '../../common/pagination/pagination';

import { Box, Stack, Typography } from '@mui/material';
import EnumPosts from '../../enums/enum-posts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './postsContainerSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { setMaxPage } from '../../common/pagination/paginationSlice';
import { useCallback } from 'react';
import { useLazyQuery } from '@apollo/client';
import { POSTS_BY_OWNER_QUERY, POSTS_QUERY, POSTS_SAVED_BY_USER_QUERY } from '../../../graphql/posts';
import defineMaxPage from '../../../common-functions/defineMaxPage';



const PostsContainer = (props) => {
    const {id, profileLinkAccessable, savedOnly, except} = props;
    const currentUser = useSelector(state => state?.base?.user);

    const [maxCountPerPage, _] = useState(12);
    const [maxPage, setMaxPage] = useState(1);
    const [activePage, setActivePage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);


    const [getSavedOnlyPosts, {}] = useLazyQuery(POSTS_SAVED_BY_USER_QUERY);
    const [getAllPosts, {}] = useLazyQuery(POSTS_QUERY);
    const [getOwnerPosts, {}] = useLazyQuery(POSTS_BY_OWNER_QUERY);
    
    

    


    useEffect(() => {
        const fetchData = async() => {
            try {
                setIsLoading(true);
                setError(null);

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
                    setPosts(result.data.postsSavedByUser.posts);
                    setMaxPage(defineMaxPage(result.data.postsSavedByUser.count, maxCountPerPage));
                } else if (id) {
                    result = await getOwnerPosts({
                        variables: {
                            owner: id,
                            offset,
                            limit: maxCountPerPage
                        }
                    })
                    setPosts(result.data.postsByOwner.posts);
                    setMaxPage(defineMaxPage(result.data.postsByOwner.count, maxCountPerPage));
                } else {
                    result = await getAllPosts({
                        variables: {
                            offset,
                            limit: maxCountPerPage
                        }
                    });
                    setPosts(result.data.posts.posts);
                    setMaxPage(defineMaxPage(result.data.posts.count, maxCountPerPage));
                }
            } catch (error) {
                console.log(error)
                setError(error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchData();
    }, [savedOnly, id, currentUser?._id, activePage]);

    
    
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
                    <PaginationTree maxPage={maxPage} activePage={activePage} handlePageChange={(page) => setActivePage(page)}/>
                </Box>
            }
        </>
    );
}


export default PostsContainer;