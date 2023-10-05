import { CreateNewFolder, Explore, Topic } from "@mui/icons-material";
import { Box, CardActions, CardContent, Stack, Tab, Tabs, Typography } from "@mui/material";
import { unwrapResult } from "@reduxjs/toolkit";
import { useCallback } from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PaginationTree from "../../common/pagination/pagination";
import { setMaxPage } from "../../common/pagination/paginationSlice";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumPlaylists from "../../enums/enum-playlists";
import CreatePlaylistForm from "../../forms/create-playlist/create-playlist";
import ImageRightFormContainer from "../image-right-form-container/image-right-form.container";
import { fetchCurrentUserPlaylists, fetchPublicAvailablePlaylists, setPage } from "./playlistsContainerSlice";
import newPlaylistBG from "../../../images/bgs/newPlaylistFormBG.png"


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

const PlaylistsEnumWithPagination = () => {
    const playlists = useSelector(state => state.playlistsContainer.playlists)
    return (
        <>
            <Stack spacing={2} sx={{my: 3, mx: {sx: 0, md: 2}}}>
                <EnumPlaylists/>
            </Stack>
            {
                playlists?.length > 0 ? <PaginationTree/> : null
            }
        </>
    );
}



const PlaylistsContainer = (props) => {
    const isLoading = useSelector(state => state.playlistsContainer.isLoading);
    const currentUser = useSelector(state => state.base.user);
    const playlists = useSelector(state => state.playlistsContainer.playlists)
    const activePage = useSelector(state => state?.pagination?.activePage) 

       

    const dispatch = useDispatch();

    // used to know the page number
    const [status, setStatus] = useState(0);

    // on tab switch
    const handleTabSwitch = (event, key) => {
        setStatus(key);
        if (key === 0) {
            dispatch(setPage("Explore"));
        } else if (key === 1) {
            dispatch(setPage("My playlists"));
        } else if (key === 2) {
            dispatch(setPage("Create new"))
        }
    }

    // set max page in pagination tree
    const dispatchDocumentsCount = useCallback((result) => {
        if (result.data.done) {
            let count = result.data.count;
            count = Math.ceil(count / 12);
            dispatch(setMaxPage(count));
        }
    }, [dispatch]);

    // main effect 
    useEffect(() => {
        if (status === 1 && currentUser?._id !== "") {
            dispatch(fetchCurrentUserPlaylists(activePage));
        } else if (status === 0) {
            dispatch(fetchPublicAvailablePlaylists(activePage))
                .then(unwrapResult)
                .then(result => {
                    dispatchDocumentsCount(result);
                });
        }
    }, [dispatch, currentUser?._id, status, activePage, dispatchDocumentsCount]);


    return (
        <Box sx={{pb: 0}}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 1.2 }}>
                <Tabs value={status} onChange={handleTabSwitch} centered variant="fullWidth">
                    <Tab icon={<Explore/>} label="Explore" id="simple-tab-0" aria-controls="simple-tabpanel-0"/>
                    <Tab icon={<Topic/>}label="My playlists" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                    <Tab icon={<CreateNewFolder/>} label="Create new" id="simple-tab-2" aria-controls="simple-tabpanel-2"/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                {
                    (() => {
                        if (isLoading) {
                            return (<SpinnerLinear/>);
                        }

                        if (playlists && playlists.length > 0) {
                            return (
                                <PlaylistsEnumWithPagination/>
                            );
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
                            return (
                                <PlaylistsEnumWithPagination/>
                            );
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
                    <ImageRightFormContainer bg={newPlaylistBG}>
                        {
                            currentUser && currentUser._id !== ""
                            ?
                            <Box sx={{width: '35rem', height: 'fit-content', boxShadow: 0, borderRadius: 5}}>
                                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                                    Create playlist
                                </Typography>
                                <Typography gutterBottom variant="h6" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                                    Create playlist using form below:
                                </Typography>
                                <CardContent>
                                    <CreatePlaylistForm/>
                                </CardContent>
                                <CardActions>
                                    <Box sx={{mx: 2, mb: 2}}>
                                        <Typography>Notice, public playlists are visible to all users</Typography>
                                    </Box>
                                </CardActions>
                            </Box>
                            :
                            <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '75vh'}}>
                                <Typography>
                                    Please login to create a new one
                                </Typography>
                            </Box>
                        }
                    </ImageRightFormContainer>
                
            </TabPanel>
        </Box>
    );
}


export default PlaylistsContainer;