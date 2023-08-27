import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumPlaylists from "../../enums/enum-playlists";
import CreatePlaylistForm from "../../forms/create-playlist/create-playlist";
import { fetchCurrentUserPlaylists, setPage } from "./playlistsContainerSlice";


function TabPanel(props) {
    const { children, value, index, ...other } = props;
  
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <Box sx={{ p: 0 }}>
                {children}
            </Box>
        )}
      </div>
    );
}



const PlaylistsContainer = (props) => {
    const playlists = useSelector(state => state.playlistsContainer.playlists);
    const isLoading = useSelector(state => state.playlistsContainer.isLoading);
    const tabPage = useSelector(state => state.playlistsContainer.page);
    const currentUser = useSelector(state => state.base.user);

    const dispatch = useDispatch();
    const [status, setStatus] = useState(0);

    const handleTabSwitch = (event, key) => {
        setStatus(key);
        if (key === 0) {
            dispatch(setPage("Explore"));
        } else if (key === 1) {
            dispatch(setPage("My playlists"));
        }
    }

    useEffect(() => {
        if (currentUser && currentUser._id !== "") {
            if (tabPage === "My playlists") {
                dispatch(fetchCurrentUserPlaylists());
            } else if (tabPage === "Explore") {
                console.log("TODO: load all public playlists")
            }
        }
    }, [dispatch, currentUser, tabPage]);


    return (
        <Box>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 3 }}>
                <Tabs value={status} onChange={handleTabSwitch}>
                    <Tab label="Explore" id="simple-tab-0" aria-controls="simple-tabpanel-0"/>
                    <Tab label="My playlists" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                    <Tab label="Create new" id="simple-tab-2" aria-controls="simple-tabpanel-2"/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                explore tab
            </TabPanel>
            
            <TabPanel value={status} index={1}>
                {
                    (() => {
                        if (!currentUser || currentUser._id === "") {
                            return (
                                <Box sx={{minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Typography sx={{textAlign: 'center'}}>Login to operate with your playlists</Typography>
                                </Box>
                            );
                        }

                        if (isLoading) {
                            return (<SpinnerLinear/>);
                        }

                        if (playlists && playlists.length > 0) {
                            return (<EnumPlaylists/>);
                        } else {
                            return (
                                <Box sx={{minHeight: '75vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                    <Typography sx={{textAlign: 'center'}}>No playlists yet</Typography>
                                </Box>
                            );
                        }
                    })()
                }
            </TabPanel>

            <TabPanel value={status} index={2}>
                {
                    currentUser && currentUser._id !== ""
                    ?
                    <Card sx={{my: 3, boxShadow: 0, mx: {sx: 0, md: 2}}}>
                        <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                            Create playlist
                        </Typography>
                        <Typography gutterBottom variant="h6" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                            Create playlist using form below:
                        </Typography>
                        <CardContent>

                            <CreatePlaylistForm/>
                        </CardContent>
                    </Card>
                    :
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh'}}>
                        <Typography>
                            Please login to create a new one
                        </Typography>
                    </Box>
                }
            </TabPanel>
        </Box>
    );
}


export default PlaylistsContainer;