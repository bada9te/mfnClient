import { memo, useEffect } from "react";
import { Box, BottomNavigation, BottomNavigationAction, Paper } from "@mui/material";
import { MusicNote, PersonSearch, AddCircle, Radio } from '@mui/icons-material';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux";
import { setShowLB, setShowRB, setValue } from "./bottomBarSlice";
import { setIsShowing as setAudioPlayerIsShowing } from "../../../common/audio-player/audioPlayerSlice";
import { SpinnerLinear } from "../../../common/spinner/Spinner";


const BottomBar = (props) => {
    const navigate= useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const user = useSelector(state => state.base.user);
    const value = useSelector(state => state.bottomBar.value);
    const isLoading = useSelector(state => state.audioPlayer.isLoading);

    const handleShowRB = () => dispatch(setShowRB(true));
    const handleShowLB = () => dispatch(setShowLB(true));
    const handleShowAudioPlayer = () => {
        dispatch(setAudioPlayerIsShowing(true));
    }

    const handleChange = (event, newValue) => {
        dispatch(setValue(newValue));
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
        dispatch(setValue(''));
    }, [location.pathname, dispatch])


    return (
        <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
            <BottomNavigation
                showLabels
                value={value === '' ? location.pathname : value}
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