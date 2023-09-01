import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Button, Typography, Card, CardContent, CardHeader, Avatar, AccordionDetails, Box, Stack } from "@mui/material";
import PlaylistDropdown from "./playlist-dropdown/playlist-dropdown";
import EnumPlaylistTracks from "../../enums/enum-playlist-tracks";
import { useDispatch, useSelector } from "react-redux";
import { setSelectType, setSharedItem } from "../../containers/user-select-container/userSelectContainerSlice";
import { setIsShowing as setUserSelectModalIsShowing } from "../../modals/user-select-modal/userSelectModalSlice";
import { setReportingItemId } from "../../forms/report/reportFormSlice";
import { setIsShowing as setReportModalIsShowing } from "../../modals/report-modal/reportModalSlice";
import { setIsShowing as setConfirmModalIsShowing } from "../../modals/confirm-modal/confirmModalSlice";
import { setActionType, setItemId, setText, setTitle } from "../../containers/confirm-container/confirmContainerSlice";
import { setSelectingFor } from "../../containers/post-select-container/postSelectContainerSlice";
import { setIsShowing as setPostSelectModalIsShowing } from "../../modals/post-select-modal/postSelectModalSlice";
import { setTargetPlaylist } from "../../containers/playlists-container/playlistsContainerSlice";

const Playlist = (props) => {
    const { playlist } = props;
    const currentUserId = useSelector(state => state.base.user._id);
    const dispatch = useDispatch();


     // open user select modal to share
     const sharePlaylist = () => {
        dispatch(setSharedItem(playlist._id));
        dispatch(setSelectType('playlistShare'));
        dispatch(setUserSelectModalIsShowing(true));
    }

    // report playlist
    const reportPlaylist = () => {
        dispatch(setReportingItemId(playlist._id));
        dispatch(setReportModalIsShowing(true));
    }

    // delete playlist
    const deletePlaylist = () => {
        dispatch(setConfirmModalIsShowing(true));
        dispatch(setActionType("delete-playlist"));
        dispatch(setItemId(playlist._id));
        dispatch(setText("By confirming this, you agree that your playlist will be removed without any ability to restore."));
        dispatch(setTitle("Confirm playlist deletion"));
    }

    // add track to playlist
    const handleTrackAdding = () => {
        dispatch(setTargetPlaylist(playlist._id))
        dispatch(setSelectingFor("playlist"));
        dispatch(setPostSelectModalIsShowing(true));
    }

    return (
        <Card>
            <CardHeader
                avatar={
                    <Avatar src={playlist.ownerAvatar}/>
                }
                title={playlist.owner.nick}
                subheader={playlist.createdAt}
                action={
                    <>
                        { 
                            currentUserId === playlist.owner._id 
                            && 
                            <Button startIcon={<Add/>} onClick={handleTrackAdding}>Add track</Button> 
                        }
                        <PlaylistDropdown 
                            owner={playlist.owner} 
                            handlers={{
                                sharePlaylist,
                                reportPlaylist,
                                deletePlaylist
                            }}
                        />
                    </>
                }
            />
            <CardContent sx={{p: {xs: 0, md: 2}}}>
                <Accordion>
                    <AccordionSummary
                        expandIcon={<ExpandMore/>}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                    >
                        <Typography>{playlist.title}</Typography>
                    </AccordionSummary>
                    <AccordionDetails sx={{p: {xs: 0, md: 2}}}>
                        {
                            (() => {
                                if (playlist.tracks.length === 0) {
                                    return (
                                        <Typography>No tracks in this playlist</Typography>
                                    );
                                } else {
                                    return (
                                        <Box sx={{ width: '100%' }}>
                                            <Stack spacing={4} sx={{display: 'flex', justifyContent: 'space-around', alignItems: 'center'}} direction="row" useFlexGap flexWrap="wrap">
                                                <EnumPlaylistTracks tracks={playlist.tracks}/>
                                            </Stack>
                                        </Box>
                                    );
                                }
                            })()
                        }
                    </AccordionDetails>
                </Accordion>
            </CardContent>
        </Card>
    );
}


export default Playlist;