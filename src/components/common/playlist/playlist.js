import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Button, Typography, Card, CardContent, CardHeader, Avatar, AccordionDetails, Box, Stack } from "@mui/material";
import PlaylistDropdown from "./playlist-dropdown/playlist-dropdown";
import EnumPlaylistTracks from "../../enums/enum-playlist-tracks";
import { reportFormState } from "../../forms/report/reactive";
import { userSelectModalState } from "../../modals/user-select-modal/reactive";
import { userSelectContainerState } from "../../containers/user-select-container/reactive";
import { confirmContainerState } from "../../containers/confirm-container/reactive";
import { confirmModalState } from "../../modals/confirm-modal/reactive";
import { reportModalState } from "../../modals/report-modal/reactive";
import { useReactiveVar } from "@apollo/client";
import { baseState } from "../../baseReactive";
import { playlistsContainerState } from "../../containers/playlists-container/reactive";
import { postSelectContainerState } from "../../containers/post-select-container/reactive";
import { postSelectModalState } from "../../modals/post-select-modal/reactive";

const Playlist = (props) => {
    const { playlist } = props;
    const { user: currentUser } = useReactiveVar(baseState);


     // open user select modal to share
     const sharePlaylist = () => {
        userSelectContainerState({...userSelectContainerState(), sharedItem: playlist._id, selectType: 'playlistShare'})
        userSelectModalState({...userSelectModalState(), isShowing: true});
    }

    // report playlist
    const reportPlaylist = () => {
        reportFormState({...reportFormState(), reportingItemId: playlist._id});
        reportModalState({ ...reportModalState(), isShowing: true });
    }

    // delete playlist
    const deletePlaylist = () => {
        confirmModalState({ ...confirmModalState(), isShowing: true });
        confirmContainerState({
            ...confirmContainerState(),
            actionType: "delete-playlist",
            itemId: playlist._id,
            text: "By confirming this, you agree that your playlist will be removed without any ability to restore.",
            title: "Confirm playlist deletion",
        });
    }

    // add track to playlist
    const handleTrackAdding = () => {
        playlistsContainerState({ ...playlistsContainerState(), targetPlaylist: playlist._id });
        postSelectContainerState({ ...postSelectContainerState(), selectingFor: "playlist" });
        postSelectModalState({ ...postSelectModalState(), isShowing: true });
    }

    return (
        <Card sx={{borderRadius: 5}}>
            <CardHeader
                avatar={
                    <Avatar src={playlist.ownerAvatar}/>
                }
                title={playlist.owner.nick}
                subheader={playlist.createdAt}
                action={
                    <>
                        { 
                            currentUser._id === playlist.owner._id 
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