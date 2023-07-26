import { useEffect } from "react";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { Box, List, Typography } from "@mui/material";
import EnumLeftBarPosts from "../../enums/enum-leftbar-posts";
import { useDispatch, useSelector } from "react-redux";
import { fetchPostsByTitle } from "./leftBarPostsContainerSlice";



const LeftBarPostsContainer = props => {
    const searchQuery = useSelector(state => state.leftBarPosts.searchQuery);
    const isLoading = useSelector(state => state.leftBarPostsContainer.isLoading);
    const postsData = useSelector(state => state.leftBarPostsContainer.postsData);
    const dispatch = useDispatch();


    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchQuery !== "") {
                dispatch(fetchPostsByTitle(searchQuery));
            }
        }, 750);

        return () => {
            clearTimeout(timer);
        }
    }, [searchQuery, dispatch]);


    return (
            <List sx={{overflow: 'auto', position: 'relative', height: '100%'}}>
                {
                    (() => {
                        if (isLoading && searchQuery !== "") {
                            return (
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                    <SpinnerCircular/>
                                </Box>
                            );
                        } else if (postsData && postsData.length > 0) {
                            return (
                                <EnumLeftBarPosts/>
                            );
                        } else {
                            return (
                                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}}>
                                    <Typography>
                                        Start typing track name to search
                                    </Typography>
                                </Box>
                            );
                        }
                    })()
                }
            </List>
    );
}

export default LeftBarPostsContainer;
