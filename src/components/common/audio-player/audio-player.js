import { memo, useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Box, Drawer, IconButton, Slider, Typography } from '@mui/material';
import { setControlsLocked, setIsLoading, setIsMuted, setIsPlaying, setIsShowing, setLoop } from './audioPlayerSlice';
import { setValue } from '../../bars/bottom/bottom-bar/bottomBarSlice';
import WaveSurfer from 'wavesurfer.js'
import { FastRewind, Loop, Pause, PlayArrow, VolumeDown, VolumeOff, VolumeUp } from '@mui/icons-material';
import { SpinnerLinear } from '../spinner/Spinner';

const getTime = (t) => {
    var minute = Math.floor(t / 60); // get minute(integer) from time
    var tmp = Math.round(t - (minute * 60)); // get second(integer) from time
    var second = (tmp < 10 ? '0' : '') + tmp; // make two-figured integer if less than 10
    
    return String(minute + ':' + second);
}

const CustomAudioPlayer = (props) => {
    const theme = useSelector(state => state.base.theme);
    const isShowing = useSelector(state => state.audioPlayer.isShowing);
    const isPlaying = useSelector(state => state.audioPlayer.isPlaying);
    const isMuted = useSelector(state => state.audioPlayer.isMuted);
    const src = useSelector(state => state.audioPlayer.src);
    const loop = useSelector(state => state.audioPlayer.loop);
    const controlsLocked = useSelector(state => state.audioPlayer.controlsLocked);
    const isLoading = useSelector(state => state.audioPlayer.isLoading);
    const dispatch = useDispatch();

    const [volume, setVolume] = useState(50);
    const [time, setTime] = useState("00:00");
    const [duration, setDuration] = useState("00:00");
    const containerRef = useRef();
    const waveSurferRef = useRef();

    
    // HANDLERS ---------------------->
    // show dialog
    const handleAudioPlayerClose = () => {
        dispatch(setValue(''));
        dispatch(setIsShowing(false));
    };
    // volume
    const handleVolumeChange = (event, vol) => {
        setVolume(vol);
    };
    // play/pause
    const handlePlayPause = () => {
        dispatch(setIsPlaying(!isPlaying));
    };
    // mute / unmute
    const handleMuteUnmute = () => {
        dispatch(setIsMuted(!isMuted));
    }
    // switch loop
    const handleSwitchLoop = () => {
        dispatch(setLoop(!loop));
    }
    //rewind to start
    const handleRewind = () => {
        try { waveSurferRef?.current?.seekTo(0); } catch (error) {}
    }
    // time change
    const handleTimeChange = (t) => {
        try { 
            setTime(getTime(t));
        } catch (error) {
            
        }
    }

    // on playback finish
    const handlePlaybackFinish = useCallback((loopValue) => {
        try {
            if (loopValue) {
                waveSurferRef?.current?.seekTo(0);
                waveSurferRef?.current?.play();
            } else {
                waveSurferRef?.current?.seekTo(0);
                waveSurferRef?.current?.pause();
                dispatch(setIsPlaying(false));
            }
        } catch (error) {}
    }, [dispatch]);
    // HANDLERS ---------------------->


    // play-pause
    useEffect(() => {
        try { 
            if (isPlaying) {
                waveSurferRef?.current?.play();
            } else {
                waveSurferRef?.current?.pause(); 
            }
        } catch (error) {}
    }, [isPlaying]);

    // volume
    useEffect(() => {
        try { waveSurferRef?.current?.setVolume(volume / 100); } catch (error) {}
    }, [volume]);

    // mute / unmute
    useEffect(() => {
        try { waveSurferRef?.current?.setMute(isMuted); } catch (error) {}
    }, [isMuted]);

    // loop
    useEffect(() => {
        try {
            waveSurferRef?.current?.un('finish');
            waveSurferRef?.current?.on('finish', () => {
                handlePlaybackFinish(loop);
            });
        } catch (error) {
            
        }
    }, [loop, handlePlaybackFinish]);

    // theme 
    useEffect(() => {
        try {
            waveSurferRef?.current?.setWaveColor(theme === 'dark' ? '#90caf9' : '#1976d2');
        } catch (error) {

        } 
    })
    
    // main effect
    useEffect(() => {
        if (containerRef.current && src && src !== '') {
            dispatch(setControlsLocked(true));
            dispatch(setIsLoading(true));

            // ws instance
            const waveSurfer = WaveSurfer.create({
                container: containerRef.current,
                cursorColor: 'red',
                responsive: true,
                cursorWidth: 2,
                barWidth: 2,
                barHeight: 1,
                waveColor: theme === 'dark' ? '#90caf9' : '#1976d2'
            });

            
            // event handlers
            waveSurfer.on('finish', () => {
                handlePlaybackFinish();
            });
            waveSurfer.on('audioprocess', (t) => {
                handleTimeChange(t);
            })
            waveSurfer.on('ready', () => {
                dispatch(setIsLoading(false));
                setDuration(getTime(waveSurfer.getDuration()));
                waveSurferRef.current = waveSurfer;
                waveSurfer.setVolume(volume / 100);
                waveSurfer.play();
                dispatch(setControlsLocked(false));
                dispatch(setIsPlaying(true));
            });

            // load audio
            waveSurfer.load(src);
            
            return () => {
                waveSurfer.destroy();
            }
        }
    }, [containerRef.current, src]);


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
                <Box>
                    { isLoading && <SpinnerLinear/> }
                    <Box ref={containerRef}></Box>
                    
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%'}}> 
                        <Box sx={{mx: 1.5}}>
                            <Typography noWrap>{time} / {duration}</Typography>
                        </Box>  
                        <Box>
                            <IconButton onClick={handleRewind} disabled={controlsLocked ? true : false}>
                                <FastRewind/> 
                            </IconButton>
                            <IconButton onClick={handlePlayPause} disabled={controlsLocked ? true : false}>
                                { isPlaying ? <Pause/> : <PlayArrow/> }
                            </IconButton>
                            <IconButton onClick={handleSwitchLoop} disabled={controlsLocked ? true : false}>
                                <Loop sx={{color: loop ? '#1BA39C' : ''}}/>
                            </IconButton>
                        </Box>
                        
                        <Box sx={{display: 'flex', alignItems: 'center'}}>
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
            </Drawer>
        </> 
    );
}


export default memo(CustomAudioPlayer);

