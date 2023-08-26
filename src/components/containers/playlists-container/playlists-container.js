import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumPlaylists from "../../enums/enum-playlists";
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
    const currentUser = useSelector(state => state.base.user);

    const dispatch = useDispatch();
    const [status, setStatus] = useState(0);

    const handleTabSwitch = (event, key) => {
        setStatus(key);
        if (key === 0) {
            dispatch(setPage("All"));
        } else if (key === 1) {
            dispatch(setPage("My"));
        }
    }

    useEffect(() => {
        if (currentUser && currentUser._id !== "") {
            dispatch(fetchCurrentUserPlaylists());
        }
    }, [dispatch, currentUser]);


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
                create playlist tab
            </TabPanel>
        </Box>
    );
}


export default PlaylistsContainer;