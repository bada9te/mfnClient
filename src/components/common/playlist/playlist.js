import { Add, ExpandMore } from "@mui/icons-material";
import { Accordion, AccordionSummary, Button, Typography, Card, CardContent, CardHeader, Avatar, AccordionDetails } from "@mui/material";
import PlaylistDropdown from "./playlist-dropdown/post-item-dropdown";
import PostsContainer from "../../containers/posts-container/posts-container";
import EnumPosts from "../../enums/enum-posts";
import EnumPlaylistTracks from "../../enums/enum-playlist-tracks";

const Playlist = (props) => {
    const { playlist } = props;

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
                        <PlaylistDropdown owner={playlist.owner}/>
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
                                    return (
                                        <EnumPlaylistTracks tracks={playlist.tracks}/>
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