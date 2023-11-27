import { useMutation, useQuery, useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import getTimeSince from "../../../common-functions/getTimeSince";
import { PLAYLIST_SWICTH_TRACK_MUTATION } from "../../../graphql-requests/playlists";
import { POSTS_BY_TITLE_QUERY } from "../../../graphql-requests/posts";
import { baseState } from "../../baseReactive";
import PostItem from "../../common/post-item/post-item";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { createBattleFormState } from "../../forms/create-battle/reactive";
import { postSelectModalState } from "../../modals/post-select-modal/reactive";
import { playlistsContainerState } from "../playlists-container/reactive";
import { postSelectContainerState } from "./reactive";



const PostSelectContainer = props => {
    const { locations, user: currentUser } = useReactiveVar(baseState);
    const { targetPlaylist } = useReactiveVar(playlistsContainerState);
    const { query, isMine, selectingFor } = useReactiveVar(postSelectContainerState);


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
            
            console.log("SWICTH_TRACK_IN_PLAYLIST")
            //dispatch(switchTrackInPlaylist(post));
        } else if (selectingFor === "battle") {
            createBattleFormState({ ...createBattleFormState(), [isMine ? "post1" : "post2"]: post })    
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
                                        createdAt: getTimeSince(new Date(+item.createdAt)) + ' ago',
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