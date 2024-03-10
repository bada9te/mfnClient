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
import { PLAYLISTS_BY_OWNER_ID_QUERY, PLAYLISTS_PUBLIC_AWAILABLE_QUERY } from "../../../utils/graphql-requests/playlists";
import { baseState } from "../../baseReactive";
import defineMaxPage from "../../../utils/common-functions/defineMaxPage";
import { useTranslation } from "react-i18next";
import InfoImage from "../../common/info-image/info-image";
import PlaylistsLogo from "../../../images/icons/logo_playlist.png";
import TabPanel from "../../common/tab-panel/tab-panel";



const PlaylistsEnumWithPagination = () => {
    const playlistsContainer = useReactiveVar(playlistsContainerState);

    const handlePageChange = page => {
        playlistsContainerState({...playlistsContainerState(), activePage: page})
    }

    return (
        <>
            <Stack spacing={2} sx={{my: 3, mx: {sx: 0, md: 2}, px: 1 }}>
                <EnumPlaylists playlists={playlistsContainer.playlists}/>
            </Stack>
            {
                playlistsContainer.playlists.length > 0 
                && 
                <Box sx={{mb: 10}}>
                    <PaginationTree 
                        maxPage={playlistsContainer.maxPage} 
                        activePage={playlistsContainer.activePage} 
                        handlePageChange={handlePageChange}
                    />
                </Box> 
            }
        </>
    );
}



const PlaylistsContainer = (props) => {
    const { maxCountPerPage, activePage, playlists, isLoading } = useReactiveVar(playlistsContainerState);
    const { user: currentUser } = useReactiveVar(baseState);


    const [ getCurrentUserPlaylists ] = useLazyQuery(PLAYLISTS_BY_OWNER_ID_QUERY);
    const [ getPublicAvailablePlaylists ] = useLazyQuery(PLAYLISTS_PUBLIC_AWAILABLE_QUERY);

    // used to know the page number
    const [status, setStatus] = useState(0);

    const { t } = useTranslation("containers");

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
                        },
                    });
                    setPlaylistsAndCount(result, "playlistsByOwnerId"); 
                } else if (status === 0) {
                    result = await getPublicAvailablePlaylists({
                        variables: {
                            offset,
                            limit: maxCountPerPage,
                        },
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
                    <Tab icon={<Explore/>}         label={t('playlists.explore')}      id="simple-tab-0" aria-controls="simple-tabpanel-0"/>
                    <Tab icon={<Topic/>}           label={t('playlists.my_playlists')} id="simple-tab-1" aria-controls="simple-tabpanel-1" />
                    <Tab icon={<CreateNewFolder/>} label={t('playlists.create_new')}   id="simple-tab-2" aria-controls="simple-tabpanel-2"/>
                </Tabs>
            </Box>

            <TabPanel value={status} index={0}>
                {
                    (() => {
                        if (isLoading) {
                            return (<SpinnerLinear/>);
                        }

                        if (playlists && playlists.length > 0) {
                            return (<PlaylistsEnumWithPagination/>);
                        } else {
                            return (<InfoImage text={t('playlists.not_found')} src={PlaylistsLogo}/>);
                        }
                    })()
                }
            </TabPanel>
            
            <TabPanel value={status} index={1}>
                {
                    (() => {
                        if (!currentUser || currentUser._id === "") {
                            return (<InfoImage text={t('playlists.login_to_operate')} src={PlaylistsLogo}/>);
                        }

                        if (isLoading) {
                            return (<SpinnerLinear/>);
                        }

                        if (playlists && playlists.length > 0) {
                            return (<PlaylistsEnumWithPagination/>);
                        } else {
                            return (<InfoImage text={t('playlists.not_found')} src={PlaylistsLogo}/>);
                        }
                    })()
                }
            </TabPanel>

            <TabPanel value={status} index={2}>
                <ImageRightFormContainer bg={newPlaylistBG} text={t('playlists.create.main_text')}>
                <Box sx={{width: '30rem', height: 'fit-content', mx: 0, px: 0, boxShadow: 0, borderRadius: 5, mb: {xs: 4, sm: 1, md: 0}}}>
                        {
                            currentUser && currentUser._id !== ""
                            ?
                            <Box sx={{ my: 3 }}>
                                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                                    {t('playlists.create.title')}
                                </Typography>
                                <CardContent>
                                    <CreatePlaylistForm/>
                                </CardContent>
                                <CardActions>
                                    <Box sx={{mx: 2, mb: 2}}>
                                        <Typography>{t('playlists.create.notice')}</Typography>
                                    </Box>
                                </CardActions>
                            </Box>
                            :
                            <InfoImage text={t('playlists.create.login_required')} src={PlaylistsLogo}/>   
                        }
                    </Box>
                </ImageRightFormContainer>
            </TabPanel>
        </Box>
    );
}


export default PlaylistsContainer;