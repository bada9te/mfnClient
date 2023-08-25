import { Box, Typography } from "@mui/material";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { SpinnerLinear } from "../../common/spinner/Spinner";
import EnumPlaylists from "../../enums/enum-playlists";
import { fetchCurrentUserPlaylists } from "./playlistsContainerSlice";

const PlaylistsContainer = (props) => {
    const playlists = useSelector(state => state.playlistsContainer.playlists);
    const isLoading = useSelector(state => state.playlistsContainer.isLoading);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchCurrentUserPlaylists());
    }, [dispatch]);


    return (
        <>
            {
                (() => {
                    if (isLoading) {
                        return (
                            <SpinnerLinear/>
                        );
                    }
                    if (playlists && playlists.length > 0) {
                        return (<EnumPlaylists/>);
                    } else {
                        return (
                            <Box sx={{mt: 3, mb: 5, minHeight: '78vh', display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                                <Typography sx={{textAlign: 'center'}}>No playlist yet</Typography>
                            </Box>
                        );
                    }
                })()
            }
        </>
    );
}


export default PlaylistsContainer;