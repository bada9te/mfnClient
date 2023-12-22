import { CreateNewFolder, Explore, Topic } from "@mui/icons-material";
import { Box, CardActions, CardContent, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import PaginationTree from "../../common/pagination/pagination";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumPlaylists from "../../enums/enum-playlists";
import CreatePlaylistForm from "../../forms/create-playlist/create-playlist";
import ImageRightFormContainer from "../image-right-form-container/image-right-form.container";
import newPlaylistBG from "../../../images/bgs/newPlaylistFormBG.png"
import { playlistsContainerState } from "./reactive";
import { useLazyQuery, useReactiveVar } from "@apollo/client";
import { PLAYLISTS_BY_OWNER_ID_QUERY, PLAYLISTS_PUBLIC_AWAILABLE_QUERY } from "../../../graphql-requests/playlists";
import { baseState } from "../../baseReactive";
import defineMaxPage from "../../../common-functions/defineMaxPage/defineMaxPage";


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
    const playlistsContainer = useReactiveVar(playlistsContainerState);

    const handlePageChange = page => {
        playlistsContainerState({...playlistsContainerState(), activePage: page})
    }

    return (
        <>
            <Stack spacing={2} sx={{my: 3, mx: {sx: 0, md: 2}}}>
                <EnumPlaylists playlists={playlistsContainer.playlists}/>
            </Stack>
            {
                playlistsContainer.playlists.length > 0 
                ? 
                <Box sx={{mb: 10}}>
                    <PaginationTree 
                        maxPage={playlistsContainer.maxPage} 
                        activePage={playlistsContainer.activePage} 
                        handlePageChange={handlePageChange}
                    />
                </Box> 
                : 
                null
            }
        </>
    );
}



const PlaylistsContainer = (props) => {
    const { maxCountPerPage, activePage, playlists, isLoading } = useReactiveVar(playlistsContainerState);
    const { user: currentUser } = useReactiveVar(baseState);


    const [ getCurrentUserPlaylists ] = useLazyQuery(PLAYLISTS_BY_OWNER_ID_QUERY);
    const [ getPublicAvailablePlaylists ] = useLazyQuery(PLAYLISTS_PUBLIC_AWAILABLE_QUERY, { pollInterval: 15000 });

    // used to know the page number
    const [status, setStatus] = useState(0);

    // on tab switch
    const handleTabSwitch = (event, key) => {
        setStatus(key);

        const setPagename = (name) => {
            playlistsContainerState({ ...playlistsContainerState(), page: name })
        }

        if (key === 0) {
            setPagename("Explore");
        } else if (key === 1) {
            setPagename("My playlists");
        } else if (key === 2) {
            setPagename("Create new");
        }
    }


    const setPlaylistsAndCount = useCallback((result, at) => {
        playlistsContainerState({
            ...playlistsContainerState(), 
            playlists: result.data[at].playlists,
            maxPage: defineMaxPage(result.data[at].count, maxCountPerPage),
        });
    }, [maxCountPerPage]);

    // main effect 
    useEffect(() => {
        const fetchPlaylists = async() => {
            try {
                let result;
                let offset = activePage === 0 ? maxCountPerPage : (activePage - 1) * maxCountPerPage;

                if (status === 1 && currentUser?._id !== "") {
                    result = await getCurrentUserPlaylists({
                        variables: {
                            owner: currentUser._id,
                            offset,
                            limit: maxCountPerPage,
                        }
                    });
                    setPlaylistsAndCount(result, "playlistsByOwnerId"); 
                } else if (status === 0) {
                    result = await getPublicAvailablePlaylists({
                        variables: {
                            offset,
                            limit: maxCountPerPage,
                        }
                    });
                    setPlaylistsAndCount(result, "playlistsPublicAvailable");
                }
            } catch (error) {
                playlistsContainerState({ ...playlistsContainerState(), error });
            } finally {
                playlistsContainerState({ ...playlistsContainerState(), isLoading: false });
            }
        }
        fetchPlaylists();
    }, [currentUser?._id, status, getCurrentUserPlaylists, getPublicAvailablePlaylists, setPlaylistsAndCount, maxCountPerPage, activePage]);


    return (
        <Box sx={{width: '100%'}}>
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
                <ImageRightFormContainer bg={newPlaylistBG} text="New playlist? Beautiful :)">
                    {
                        currentUser && currentUser._id !== ""
                        ?
                        <Box sx={{width: '30rem', height: 'fit-content', boxShadow: 0, borderRadius: 5}}>
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