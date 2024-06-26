import { CreateNewFolder, Explore, Topic } from "@mui/icons-material";
import { Box, CardActions, CardContent, Stack, Tab, Tabs, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import PaginationTree from "../../common/pagination/pagination";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumPlaylists from "../../enums/enum-playlists";
import CreatePlaylistForm from "../../forms/create-playlist/create-playlist";
import ImageRightFormContainer from "../image-right-form-container/image-right-form.container";
import newPlaylistBG from "@/assets/bgs/newPlaylistFormBG.png"
import { playlistsContainerState } from "./reactive";
import {  useReactiveVar } from "@apollo/client/index.js";
import { baseState } from "@/components/baseReactive";
import defineMaxPage from "@/utils/common-functions/defineMaxPage";
import { useTranslation } from "react-i18next";
import InfoImage from "../../common/info-image/info-image";
import PlaylistsLogo from "@/assets/icons/logo_playlist.png";
import TabPanel from "../../common/tab-panel/tab-panel";
import { usePlaylistsByOwnerIdLazyQuery, usePlaylistsPublicAvailableLazyQuery } from "@/utils/graphql-requests/generated/schema";



const PlaylistsEnumWithPagination = () => {
    const playlistsContainer = useReactiveVar(playlistsContainerState);

    const handlePageChange = (page: number) => {
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



export default function PlaylistsContainer() {
    const { maxCountPerPage, activePage, playlists, isLoading } = useReactiveVar(playlistsContainerState);
    const { user: currentUser } = useReactiveVar(baseState);


    const [ getCurrentUserPlaylists ] = usePlaylistsByOwnerIdLazyQuery();
    const [ getPublicAvailablePlaylists ] = usePlaylistsPublicAvailableLazyQuery();

    // used to know the page number
    const [status, setStatus] = useState(0);

    const { t } = useTranslation("containers");

    // on tab switch
    const handleTabSwitch = (event: React.SyntheticEvent<Element, Event>, key: number) => {
        setStatus(key);

        const setPagename = (name: string) => {
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


    const setPlaylistsAndCount = useCallback((result: any, at: string) => {
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
                playlistsContainerState({ ...playlistsContainerState(), error: error as string });
            } finally {
                playlistsContainerState({ ...playlistsContainerState(), isLoading: false });
            }
        }
        fetchPlaylists();
    }, [currentUser?._id, status, getCurrentUserPlaylists, getPublicAvailablePlaylists, setPlaylistsAndCount, maxCountPerPage, activePage]);


    return (
        <Box>
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
                    <Box sx={{width: '30rem', mx: 0, px: 0, boxShadow: 0, borderRadius: 5}}>
                        {
                            currentUser && currentUser._id !== ""
                            ?
                            <Box>
                                <Typography gutterBottom variant="h4" component="div" sx={{display: 'flex', justifyContent: 'center', pt: 3, mb: 0}}>
                                    {t('playlists.create.title')}
                                </Typography>
                                <CardContent sx={{ px: 0, py: 2, ":last-child": { pb: 0 } }}>
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
