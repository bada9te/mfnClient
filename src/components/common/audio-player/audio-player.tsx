/* eslint-disable */
import { memo, useEffect, useRef, useState } from 'react';
import { Box, Drawer, IconButton, Slider, Stack, Tooltip, Typography } from '@mui/material';
import { FastRewind, Loop, Pause, PlayArrow, VolumeDown, VolumeOff, VolumeUp } from '@mui/icons-material';
import { SpinnerLinear } from '../spinner/Spinner';
import audioAnalyzer from './audiowave/analyzer';
import WaveForm from './audiowave/waveform';
import PostItemUnavailable from '../post-item/post-item-unavailable';
import { useReactiveVar } from '@apollo/client';
import { audioPlayerState } from './reactive';
import { bottomBarState } from '@/components/bars/bottom/bottom-bar/reactive';
import PostGenerate from '../post-item/post-generate';

const getTime = (t: number) => {
    var minute = Math.floor(t / 60); // get minute(integer) from time
    var tmp = Math.round(t - (minute * 60)); // get second(integer) from time
    var second = (tmp < 10 ? '0' : '') + tmp; // make two-figured integer if less than 10
    
    return String(minute + ':' + second);
}

const CustomAudioPlayer = () => {
    const { isShowing, isPlaying, isMuted, src, loop, controlsLocked, isLoading, currentTrack } = useReactiveVar(audioPlayerState);
    const bottomBar = useReactiveVar(bottomBarState);

    const [ volume, setVolume ] = useState(50);
    const [ progress, setProgress ] = useState(0);
    const [ time, setTime ] = useState("00:00");
    const [ duration, setDuration ] = useState("00:00");
    const [ analyzerData, setAnalyzerData ] = useState(null);
    const containerRef = useRef<HTMLAudioElement>(null);
    const waveformContainerRef = useRef();

    
    // HANDLERS ---------------------->
    // show dialog
    const handleAudioPlayerClose = () => {
        bottomBarState({ ...bottomBar, value: '' });
        audioPlayerState({...audioPlayerState(), isShowing: false});
    };
    // volume
    const handleVolumeChange = (_: React.MouseEvent<HTMLButtonElement, MouseEvent>, vol: number) => {
        setVolume(vol);
        if (containerRef.current)
            containerRef.current.volume = vol / 100;
    };
    // play/pause
    const handlePlayPause = () => {
        audioPlayerState({ ...audioPlayerState(), isPlaying: !isPlaying });
        if (!isPlaying === false) {
            containerRef.current?.pause();
        } else {
            containerRef.current?.play();
        } 
    };
    // mute / unmute
    const handleMuteUnmute = () => {
        audioPlayerState({ ...audioPlayerState(), isMuted: !isMuted });
        if (containerRef.current)
            containerRef.current.muted = !isMuted === false ? false : true;
    }
    // switch loop
    const handleSwitchLoop = () => {
        audioPlayerState({ ...audioPlayerState(), loop: !loop });
        if (containerRef.current)
            containerRef.current.loop = !loop === false ? false : true;
    }
    //rewind to start
    const handleRewind = () => {
        setProgress(0);
        setTime("00:00");
        if (containerRef.current)
            containerRef.current.currentTime = 0;
    }
    

    // rewind on progressbar 
    const rewindOnProgressBar = (_: React.SyntheticEvent, value: number) => {
        if (containerRef.current)
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
        try {
            containerRef.current && (containerRef.current.volume = volume / 100); 
        } catch (error) {}
    }, [volume]);

    // mute / unmute
    useEffect(() => {
        try { 
            containerRef.current && (containerRef.current.muted = isMuted); 
        } catch (error) {}
    }, [isMuted]);

    // loop
    useEffect(() => {
        try { 
            containerRef.current && (containerRef.current.loop = loop); 
        } catch (error) {}
    }, [loop]);


    // main effect
    useEffect(() => {
        let container = containerRef.current;
        audioPlayerState({ ...audioPlayerState(), controlsLocked: true, isPlaying: false });

        if (container) {
            audioPlayerState({ ...audioPlayerState(), controlsLocked: false, isPlaying: true });
            container.addEventListener("loadeddata", () => {
                setDuration(getTime(containerRef.current?.duration as number));
                /* @ts-ignore */
                container.removeEventListener("loadeddata", this);
            });
            container.addEventListener("timeupdate", () => {
                setProgress(container.currentTime / container.duration * 100);
                setTime(getTime(container.currentTime));
                /* @ts-ignore */
                container.removeEventListener("timeupdate", this);
            });
            container.addEventListener("ended", () => {
                handleRewind();
                audioPlayerState({ ...audioPlayerState(), isPlaying: false });
            });
            container.play();
            audioAnalyzer(containerRef, analyzerData, setAnalyzerData)
        }
    }, [src]);


    return (
        <Drawer
            anchor={'bottom'}
            open={isShowing}
            onClose={handleAudioPlayerClose}
            hidden={false}
            ModalProps={{
                keepMounted: true,
            }}
            sx={{
                ".MuiDrawer-paper": {
                    borderRadius: '20px 20px 0 0',
                },
            }}
        >
            { isLoading && <SpinnerLinear/> }
            <Stack direction="row" flexWrap="wrap" sx={{display: 'flex', justifyContent: 'space-around', m: 0, p: 0}}>
                <Box sx={{display: 'flex', justifyContent: 'center', width: { xs: '100%', md: 'auto' }}}>
                    {
                        currentTrack 
                        ? 
                        <PostGenerate item={currentTrack} addonsCorrections={{ status: "in-player" }} baseCorrections={{ createdAt: currentTrack.createdAt }}/>
                        : 
                        <PostItemUnavailable status="in-player"/>
                    }
                </Box>
                
                <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'flex-end', flexGrow: 4, width: 'auto'}}>
                    <Box sx={{ maxWidth: '800px', width: '100%' }}>
                        <Box ref={waveformContainerRef} sx={{width: 'auto', height: '120px'}}>
                            {analyzerData && <WaveForm analyzerData={analyzerData} />}
                        </Box>
                        <Box sx={{display: 'flex', alignItems: 'center', mx: 1}}>
                            <audio src={src} ref={containerRef} crossOrigin="anonymous"></audio>
                            {
                                containerRef.current
                                &&
                                <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'space-around', width: '100%', mt: 1, mx: 2}}>
                                    <Box sx={{mr: 1.5}}>
                                        <Typography noWrap>{time}</Typography>
                                    </Box>
                                    <Slider 
                                        sx={{my: 1.5}} 
                                        aria-label="Progress" 
                                        value={progress || 0}
                                        /* @ts-ignore */
                                        onChange={rewindOnProgressBar} 
                                        disabled={controlsLocked ? true : false} 
                                    />
                                    <Box sx={{ml: 1.5}}>
                                        <Typography noWrap>{duration}</Typography>
                                    </Box>
                                </Box>
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
                                <Tooltip title={ isMuted ? "Unmute" : "Mute"}>
                                    <span>
                                        <IconButton onClick={handleMuteUnmute} disabled={controlsLocked ? true : false}>
                                            { isMuted ? <VolumeOff/> : <VolumeDown/>}
                                        </IconButton>
                                    </span>
                                </Tooltip>
                                    <Slider 
                                        sx={{width: '100px'}} 
                                        aria-label="Volume" 
                                        value={volume} 
                                        /* @ts-ignore */
                                        onChange={handleVolumeChange}
                                        valueLabelDisplay="auto"
                                        disabled={controlsLocked ? true : false} 
                                    />
                                <Tooltip title="100%">
                                    <span>
                                        <IconButton onClick={(e) => handleVolumeChange(e, 100)} disabled={controlsLocked ? true : false}>
                                            <VolumeUp/>
                                        </IconButton>
                                    </span>
                                </Tooltip>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </Stack>
        </Drawer> 
    );
}


export default memo(CustomAudioPlayer);

