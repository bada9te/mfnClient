import { memo, useEffect } from "react";
import { BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { MusicNote, PersonSearch, AddCircle, Radio } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import { useReactiveVar } from "@apollo/client";
import { audioPlayerState } from "../../../common/audio-player/reactive";
import { bottomBarState } from "./reactive";


const BottomBar = (props) => {
    const navigate= useNavigate();
    const location = useLocation();

    const user = useSelector(state => state.base.user);
    
    const bottomBar = useReactiveVar(bottomBarState);
    const audioPlayer = useReactiveVar(audioPlayerState);

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
                navigate('/post-upload');
                break;
            case 'audioPlayer': 
                handleShowAudioPlayer();
                break;
            default:
                break;
        }
    };

    useEffect(() => {
        bottomBarState({ ...bottomBar, value: '' });
    }, [location.pathname])


    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={bottomBar.value === '' ? location.pathname : bottomBar.value}
                onChange={handleChange}
                >
                <BottomNavigationAction value="tracks" label="Tracks" icon={<MusicNote />} />
                {
                    user && user._id !== "" 
                    ?
                    <BottomNavigationAction value="/post-upload" label="New post" icon={<AddCircle />} />
                    :
                    null
                }
                <BottomNavigationAction value="audioPlayer" label="Player" icon={<Radio />} />
                <BottomNavigationAction value="people" label="People" icon={<PersonSearch />} />
            </BottomNavigation>
        </Paper>
        
    );
}

    
export default memo(BottomBar);

/*

<Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 1 }}>
            { isLoading && <SpinnerLinear/> }
*/