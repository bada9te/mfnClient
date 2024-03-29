import { memo, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { MusicNote, PersonSearch, AddCircle, Radio } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useReactiveVar } from "@apollo/client";
import { audioPlayerState } from "../../../common/audio-player/reactive";
import { bottomBarState } from "./reactive";
import { baseState } from "../../../baseReactive";
import { useTranslation } from "react-i18next";


const BottomBar = (props) => {
    const navigate= useNavigate();
    const location = useLocation();

    const { user } = useReactiveVar(baseState);
    
    const bottomBar = useReactiveVar(bottomBarState);
    const audioPlayer = useReactiveVar(audioPlayerState);

    const { t } = useTranslation("bars");

    const handleShowRB = () => bottomBarState({ ...bottomBar, showRB: true });
    const handleShowLB = () => bottomBarState({ ...bottomBar, showLB: true });

    const handleShowAudioPlayer = () => {
        audioPlayerState({...audioPlayer, isShowing: true});
    }

    const handleChange = (event, newValue) => {
        bottomBarState({ ...bottomBar, value: newValue });
        switch (newValue) {
            case 'tracks': 
                handleShowLB();
                break;
            case 'people':
                handleShowRB();
                break;
            case '/post-upload':
                navigate('/app/post-upload');
                break;
            case 'audioPlayer': 
                handleShowAudioPlayer();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        bottomBarState({ ...bottomBarState(), value: '' });
    }, [location.pathname])


    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0}} elevation={1}>
            <BottomNavigation sx={{ 
                background: 'none',  
            }} showLabels value={bottomBar.value === '' ? location.pathname : bottomBar.value} onChange={handleChange}>
                <BottomNavigationAction value="tracks" label={t('bottombar.tracks')} icon={<MusicNote />} />
                {
                    user && user._id !== "" 
                    &&
                    <BottomNavigationAction value="/post-upload" label={t('bottombar.new_post')} icon={<AddCircle />} />
                }
                <BottomNavigationAction value="audioPlayer" label={t('bottombar.player')} icon={<Radio />} disabled={!audioPlayer.src} />
                <BottomNavigationAction value="people" label={t('bottombar.people')} icon={<PersonSearch />} />
            </BottomNavigation>
        </Paper>
        
    );
}

    
export default memo(BottomBar);

/*

<Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
            { isLoading && <SpinnerLinear/> }
*/