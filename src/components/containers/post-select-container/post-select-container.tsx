import { useReactiveVar } from "@apollo/client";
import { Box, Stack, Typography } from "@mui/material";
import getTimeSince from "../../../utils/common-functions/getTimeSince";
import { PLAYLISTS_BY_OWNER_ID_QUERY } from "../../../utils/graphql-requests/playlists";
import { baseState } from "../../baseReactive";
import PostItem from "../../common/post-item/post-item";
import { SpinnerCircular } from "../../common/spinner/Spinner";
import { createBattleFormState } from "../../forms/create-battle/reactive";
import { postSelectModalState } from "../../modals/post-select-modal/reactive";
import { playlistsContainerState } from "../playlists-container/reactive";
import { postSelectContainerState } from "./reactive";
import { useTranslation } from "react-i18next";
import defineMaxPage from "../../../utils/common-functions/defineMaxPage";
import { enqueueSnackbar } from "notistack";
import { Playlist, PlaylistsByOwnerIdQuery, Post, usePlaylistSwicthTrackMutation, usePostsByTitleQuery } from "utils/graphql-requests/generated/schema";
import { TPostAddons, TPostBase } from "components/common/post-item/types";



const PostSelectContainer = () => {
    const { locations, user: currentUser } = useReactiveVar(baseState);
    const { targetPlaylist, maxCountPerPage, activePage } = useReactiveVar(playlistsContainerState);
    const { query, isMine, selectingFor } = useReactiveVar(postSelectContainerState);
    const { t } = useTranslation("containers");

    const [ switchTrackInPlaylist ] = usePlaylistSwicthTrackMutation();
    const { data, loading } = usePostsByTitleQuery({
        variables: {
            input: {
                title: query,
                userId: currentUser._id,
                userIsOwner: isMine,
            },
        },
    });
    
    const handlePostSelection = async(post: { base: TPostBase, addons: TPostAddons }) => {
        postSelectModalState({ ...postSelectModalState(), isShowing: false });

        if (selectingFor === "playlist") {
            enqueueSnackbar("Updating playlist...", { autoHideDuration: 1500 });
            await switchTrackInPlaylist({
                variables: {
                    input: {
                        trackId: post.base._id,
                        playlistId: targetPlaylist as string,
                    },
                },
                update: (cache, { data }) => {
                    let offset = activePage === 0 ? maxCountPerPage : (activePage - 1) * maxCountPerPage;
                    

                    const cachedData = cache.readQuery({ query: PLAYLISTS_BY_OWNER_ID_QUERY, 
                        variables: {
                            owner: currentUser._id,
                            offset,
                            limit: maxCountPerPage,
                        }
                    }) as PlaylistsByOwnerIdQuery;

                    let playlists = JSON.parse(JSON.stringify(cachedData.playlistsByOwnerId.playlists)) as Playlist[];
                    playlists.forEach(playlist => {
                        if (playlist._id === data?.playlistSwicthTrack._id) {
                            playlist.tracks = data.playlistSwicthTrack.tracks as Post[];
                        }
                    });
                    
                    cache.writeQuery({ query: PLAYLISTS_BY_OWNER_ID_QUERY, 
                        variables: {
                            owner: currentUser._id,
                            offset,
                            limit: maxCountPerPage,
                        },
                        data: {
                            playlistsByOwnerId: {
                                playlists,
                                count: playlists.length,
                            }
                        }
                    });

                    playlistsContainerState({...playlistsContainerState(), playlists,
                        maxPage: defineMaxPage(playlists.length, maxCountPerPage),
                    });
                }
            }).then(() => {
                enqueueSnackbar(t('select.post.snack.playlist.success'), { autoHideDuration: 1500, variant: 'success' });
            }).catch(() => {
                enqueueSnackbar(t('select.post.snack.playlist.error'), { autoHideDuration: 3000, variant: 'error' });
            });
        } else if (selectingFor === "battle") {
            createBattleFormState({ ...createBattleFormState(), [isMine ? "post1" : "post2"]: post })    
        }
    }


    return (
        <Stack spacing={4} sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center', height: '100%', p: 1.5}} direction="row" useFlexGap flexWrap="wrap">
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
                                <Typography>{t('select.post.info_text')}</Typography>
                            </Box>
                        );
                    }
                })()
            }
        </Stack>
    );
}

export default PostSelectContainer;