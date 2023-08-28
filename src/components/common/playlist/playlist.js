import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Button, Typography, Card, CardContent, CardHeader, Avatar, AccordionDetails } from "@mui/material";
import PlaylistDropdown from "./playlist-dropdown/post-item-dropdown";
import PlaylistTrack from "./playlist-track/playlist-track";

const Playlist = (props) => {
    const { playlist } = props;
    //console.log(playlist)

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
                        <Button startIcon={<Add/>}>Add track</Button>
                        <PlaylistDropdown/>
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
                    <AccordionDetails>
                        {
                            (() => {
                                if (playlist.tracks.length === 0) {
                                    return (
                                        <Typography>No tracks in this playlist</Typography>
                                    );
                                } else {
                                    playlist.tracks.map((track, key) => {
                                        return (
                                            <PlaylistTrack/>
                                        );
                                    });
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