import { Box, Stack, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import getTimeSince from "../../../common-functions/getTimeSince";
import PostItem from "../../common/post-item/post-item";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { setPost1 as setBattlePost1, setPost2 as setBattlePost2 } from "../../forms/create-battle/createBattleFormSlice";
import { setIsShowing as setPostSelectModalIsShowing } from "../../modals/post-select-modal/postSelectModalSlice";
import { switchTrackInPlaylist } from "../playlists-container/playlistsContainerSlice";
import { fetchSavedPosts } from "./postSelectContainerSlice";



const PostSelectContainer = props => {
    const locations = useSelector(state => state.base.locations);
    const isLoading = useSelector(state => state.postSelectContainer.isLoading);
    const posts = useSelector(state => state.postSelectContainer.posts);
    const query = useSelector(state => state.postSelectContainer.query);
    const isMine = useSelector(state => state.postSelectContainer.isMine);
    const selectingFor = useSelector(state => state.postSelectContainer.selectingFor);
    const dispatch = useDispatch();

    
    const handlePostSelection = (post) => {
        dispatch(setPostSelectModalIsShowing(false));
        if (selectingFor === "playlist") {
            dispatch(switchTrackInPlaylist(post));
        } else if (selectingFor === "battle") {
            isMine ? dispatch(setBattlePost1(post)) : dispatch(setBattlePost2(post));
        }
    }

    useEffect(() => {
        if (selectingFor === "playlist") {
            dispatch(fetchSavedPosts());
        }
    }, [dispatch, selectingFor])


    return (
        <Stack spacing={4} sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%'}} direction="row" useFlexGap flexWrap="wrap">
            {
                (() => {
                    if (isLoading && query !== "") {
                        return (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <SpinnerCircular/>
                            </Box>
                        );
                    } else if (posts && posts.length > 0) {
                        return posts.map((item, key) => {
                            return (
                                <PostItem
                                    key={key}
                                    base={{
                                        ...item, 
                                        ownerAvatar: `${locations?.images}/${item.owner.avatar}`,
                                        createdAt: getTimeSince(new Date(item.createdAt)) + ' ago',
                                        img: `${locations?.images}/${item.image}`,
                                        audio: `${locations?.audios}/${item.audio}`,
                                    }}
                                    addons={{
                                        commentsAllowed: item.commentsAllowed,
                                        downloadsAllowed: item.downloadsAllowed,
                                        status: 'selecting',
                                        selectPost: handlePostSelection,
                                    }}
                                />
                            );
                        });
                    } else {
                        return (
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%'}} >
                                <Typography>Start typing track name to search.</Typography>
                            </Box>
                        );
                    }
                })()
            }
        </Stack>
    );
}

export default PostSelectContainer;