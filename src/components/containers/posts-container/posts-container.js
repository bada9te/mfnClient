import { useEffect } from 'react';
import { SpinnerLinear } from '../../common/spinner/Spinner';
import PaginationTree from '../../common/pagination/pagination';

import { Box, Stack, Typography } from '@mui/material';
import EnumPosts from '../../enums/enum-posts';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPosts } from './postsContainerSlice';


const PostsContainer = (props) => {
    const {id, profileLinkAccessable, savedOnly, except} = props;

    
    const currentUser = useSelector(state => state?.base?.user);
    const isLoading = useSelector(state => state?.postsContainer?.isLoading);
    const activePage = useSelector(state => state?.pagination?.activePage);
    const posts = useSelector(state => state.postsContainer.posts);
    const dispatch = useDispatch();
    
    

    useEffect(() => {
        if (savedOnly) {
            dispatch(fetchPosts({payload: currentUser?._id, activePage, type: "savedOnly"}));
        } else if (id) {
            dispatch(fetchPosts({payload: id, activePage, type: "byOwnerId"}));
        } else {
            dispatch(fetchPosts({payload: null, activePage, type: "all"}));
        }
    }, [savedOnly, id, currentUser?._id, dispatch, activePage]);
    
    
    return ( 
        <>
            {
                (() => {
                    if (isLoading) {
                        return (
                            
                                <SpinnerLinear/>
                            
                        );
                    } else if (posts?.length === 0) {
                        return (
                            <Box sx={{mt: 3, mb: 5, minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography sx={{textAlign: 'center'}}>No tracks yet</Typography>
                            </Box>
                        );
                    } else {
                        return (
                            <>
                                <Box sx={{ width: '100%', py: 4 }}>
                                    <Stack spacing={4} sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} direction="row" useFlexGap flexWrap="wrap">
                                        <EnumPosts profileLinkAccessable={profileLinkAccessable} except={except}/>
                                    </Stack>
                                </Box>
                                {
                                    (() => {
                                        if (posts?.length >= 12) {
                                            return (
                                                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mb: 5}}>
                                                    <PaginationTree/>
                                                </Box>
                                            );
                                        }
                                    })()
                                }
                            </>
                        );
                    }
                })()
            }
        </>
    );
}


export default PostsContainer;