import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import getTimeSince from "../../../common-functions/getTimeSince";
import { PLAYLIST_SWICTH_TRACK_MUTATION } from "../../../graphql/playlists";
import { POSTS_BY_TITLE_QUERY } from "../../../graphql/posts";
import { baseState } from "../../baseReactive";
import PostItem from "../../common/post-item/post-item";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { setPost1 as setBattlePost1, setPost2 as setBattlePost2 } from "../../forms/create-battle/createBattleFormSlice";
import { postSelectModalState } from "../../modals/post-select-modal/reactive";
import { playlistsContainerState } from "../playlists-container/reactive";
import { postSelectContainerState } from "./reactive";



const PostSelectContainer = props => {
    const { locations, user: currentUser } = useReactiveVar(baseState);
    const { targetPlaylist } = useReactiveVar(playlistsContainerState);
    const { query, isMine, selectingFor } = useReactiveVar(postSelectContainerState);

    const dispatch = useDispatch();

    const [switchTrackInPlaylist] = useMutation(PLAYLIST_SWICTH_TRACK_MUTATION);
    const { data, loading } = useQuery(POSTS_BY_TITLE_QUERY, {
        variables: {
            input: {
                title: query,
                userId: currentUser._id,
                userIsOwner: isMine,
            },
        },
    });

    
    const handlePostSelection = (post) => {
        postSelectModalState({ ...postSelectModalState(), isShowing: false });

        if (selectingFor === "playlist") {
            switchTrackInPlaylist({
                variables: {
                    input: {
                        trackId: post._id,
                        playlistId: targetPlaylist,
                    },
                },
            });
            
            dispatch(switchTrackInPlaylist(post));
        } else if (selectingFor === "battle") {
            isMine ? dispatch(setBattlePost1(post)) : dispatch(setBattlePost2(post));
        }
    }


    return (
        <Stack spacing={4} sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%'}} direction="row" useFlexGap flexWrap="wrap">
            {
                (() => {
                    if (loading && query !== "") {
                        return (
                            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                                <SpinnerCircular/>
                            </Box>
                        );
                    } else if (data?.postsByTitle && data?.postsByTitle.length > 0) {
                        return data.postsByTitle.map((item, key) => {
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