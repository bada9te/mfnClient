import { memo, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Drawer, IconButton, Slider, Stack, Typography } from '@mui/material';
import { setControlsLocked, setIsMuted, setIsPlaying, setIsShowing, setLoop } from './audioPlayerSlice';
import { setValue } from '../../bars/bottom/bottom-bar/bottomBarSlice';
import { FastRewind, Loop, Pause, PlayArrow, VolumeDown, VolumeOff, VolumeUp } from '@mui/icons-material';
import { SpinnerLinear } from '../spinner/Spinner';
import PostItem from '../post-item/post-item';
import audioAnalyzer from './audiowave/analyzer';
import WaveForm from './audiowave/waveform';

const getTime = (t) => {
    var minute = Math.floor(t / 60); // get minute(integer) from time
    var tmp = Math.round(t - (minute * 60)); // get second(integer) from time
    var second = (tmp < 10 ? '0' : '') + tmp; // make two-figured integer if less than 10
    
    return String(minute + ':' + second);
}

const CustomAudioPlayer = (props) => {
    const isShowing = useSelector(state => state.audioPlayer.isShowing);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);
    const isMuted = useSelector(state => state.audioPlayer.isMuted);
    const src = useSelector(state => state.audioPlayer.src);
    const loop = useSelector(state => state.audioPlayer.loop);
    const controlsLocked = useSelector(state => state.audioPlayer.controlsLocked);
    const isLoading = useSelector(state => state.audioPlayer.isLoading);
    const currentTrack = useSelector(state => state.audioPlayer.currentTrack);
    const dispatch = useDispatch();

    const [volume, setVolume] = useState(50);
    const [progress, setProgress] = useState(0);
    const [time, setTime] = useState("00:00");
    const [duration, setDuration] = useState("00:00");
    const [analyzerData, setAnalyzerData] = useState(null);
    const containerRef = useRef();
    const waveformContainerRef = useRef();

    
    // HANDLERS ---------------------->
    // show dialog
    const handleAudioPlayerClose = () => {
        dispatch(setValue(''));
        dispatch(setIsShowing(false));
    };
    // volume
    const handleVolumeChange = (event, vol) => {
        setVolume(vol);
        containerRef.current.volume = vol / 100;
    };
    // play/pause
    const handlePlayPause = () => {
        dispatch(setIsPlaying(!isPlaying));
        if (!isPlaying === false) {
            containerRef.current.pause();
        } else {
            containerRef.current.play();
        } 
    };
    // mute / unmute
    const handleMuteUnmute = () => {
        dispatch(setIsMuted(!isMuted));
        containerRef.current.muted = !isMuted === false ? false : true;
    }
    // switch loop
    const handleSwitchLoop = () => {
        dispatch(setLoop(!loop));
        containerRef.current.loop = !loop === false ? false : true;
    }
    //rewind to start
    const handleRewind = () => {
        setProgress(0);
        setTime("00:00");
        containerRef.current.currentTime = 0;
    }
    

    // rewind on progressbar 
    const rewindOnProgressBar = (e, value) => {
        containerRef.current.currentTime = containerRef.current.duration * value / 100;
        setProgress(value);
    }


    // play-pause
    useEffect(() => {
        try { 
            if (isPlaying) {
                containerRef?.current?.play();
            } else {
                containerRef?.current?.pause(); 
            }
        } catch (error) {}
    }, [isPlaying]);

    // volume
    useEffect(() => {
        try { containerRef.current.volume = volume / 100; } catch (error) {}
    }, [volume]);

    // mute / unmute
    useEffect(() => {
        try { containerRef.current.muted = isMuted; } catch (error) {}
    }, [isMuted]);

    // loop
    useEffect(() => {
        try { containerRef.current.loop = loop; } catch (error) {}
    }, [loop]);


    // main effect
    useEffect(() => {
        let container = containerRef.current;
        dispatch(setControlsLocked(true));
        dispatch(setIsPlaying(false));

        if (container) {
            dispatch(setControlsLocked(false));
            dispatch(setIsPlaying(true));
            container.addEventListener("loadeddata", () => {
                setDuration(getTime(containerRef.current.duration));
                containerRef.current.removeEventListener("loadeddata", this);
            });
            container.addEventListener("timeupdate", () => {
                setProgress(containerRef.current.currentTime / containerRef.current.duration * 100);
                setTime(getTime(containerRef.current.currentTime));
                containerRef.current.removeEventListener("timeupdate", this);
            });
            container.addEventListener("ended", () => {
                handleRewind();
                dispatch(setIsPlaying(false));
            });
            container.play();
            audioAnalyzer(containerRef, analyzerData, setAnalyzerData)
        }
    }, [src, dispatch]);


    return (
        <>
            <Drawer
                anchor={'bottom'}
                open={isShowing}
                onClose={handleAudioPlayerClose}
                hidden={false}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                { isLoading && <SpinnerLinear/> }
                <Stack direction="row" flexWrap="wrap" sx={{display: 'flex', justifyContent: 'space-around', m: 0, p: 0}}>
                    <Box sx={{display: 'flex', justifyContent: 'center', width: { xs: '100%', md: 'auto' }}}>
                        {
                            currentTrack 
                            && 
                            <PostItem {...currentTrack} status="in-player"/> 
                        }
                    </Box>
                    
                    <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexGrow: 4}}>
                        <Box sx={{ width: '100%' }}>
                            <Box ref={waveformContainerRef} sx={{width: '100%', height: '120px'}}>
                                {analyzerData && <WaveForm analyzerData={analyzerData} waveContainerRef={waveformContainerRef}/>}
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', mx: 1}}>
                                <audio src={src} ref={containerRef} crossOrigin="anonymous"></audio>
                                {
                                    containerRef.current
                                    ?
                                    <>
                                        <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', mt: 1, mx: 2}}>
                                            <Box sx={{mr: 1.5}}>
                                                <Typography noWrap>{time}</Typography>
                                            </Box>
                                            <Slider 
                                                sx={{my: 1.5}} 
                                                aria-label="Progress" 
                                                value={progress || 0}
                                                onChange={rewindOnProgressBar} 
                                                disabled={controlsLocked ? true : false} 
                                            />
                                            <Box sx={{ml: 1.5}}>
                                                <Typography noWrap>{duration}</Typography>
                                            </Box>
                                        </Box>
                                    </>
                                    :
                                    null
                                }
                            </Box>
                            <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', mb: 1}}>  
                                <Box sx={{mx: 1.5}}>
                                    <IconButton onClick={handlePlayPause} disabled={controlsLocked ? true : false}>
                                        { isPlaying ? <Pause/> : <PlayArrow/> }
                                    </IconButton>
                                    <IconButton onClick={handleRewind} disabled={controlsLocked ? true : false}>
                                        <FastRewind/> 
                                    </IconButton>
                                    <IconButton onClick={handleSwitchLoop} disabled={controlsLocked ? true : false}>
                                        <Loop sx={{color: loop ? '#1BA39C' : ''}}/>
                                    </IconButton>
                                </Box>
                                
                                <Box sx={{display: 'flex', alignItems: 'center', mx: 1.5}}>
                                    <IconButton onClick={handleMuteUnmute} disabled={controlsLocked ? true : false}>
                                        { isMuted ? <VolumeOff/> : <VolumeDown/>}
                                    </IconButton>
                                        <Slider 
                                            sx={{width: '100px'}} 
                                            aria-label="Volume" 
                                            value={volume} 
                                            onChange={handleVolumeChange}
                                            valueLabelDisplay="auto"
                                            disabled={controlsLocked ? true : false} 
                                        />
                                    <IconButton onClick={(e) => handleVolumeChange(e, 100)} disabled={controlsLocked ? true : false}>
                                        <VolumeUp/>
                                    </IconButton>
                                </Box>
                            </Box>
                        </Box>
                    </Box>

                </Stack>
            </Drawer>
        </> 
    );
}


export default memo(CustomAudioPlayer);

