"use client"

import { useAppDispatch, useAppSelector } from "@/lib/redux/store"
import { useEffect, useRef, useState } from "react";
import raf from 'raf' // requestAnimationFrame polyfill
import { setIsLoop, setIsMute, setIsPlaying, setVolume } from "@/lib/redux/slices/player";
import InfoImage from "../info-image/info-image";
// @ts-ignore
import ReactHowler from 'react-howler'
import PlayerTrackInfo from "./player-track-info";

export default function AudioPlayer() {
  const { isPlaying, isLoop, isMute, volume, post } = useAppSelector(state => state.player);
  const [loaded, setIsLoaded] = useState(false);
  const [seek, setSeek] = useState(0.0);
  const [rate, setRate] = useState(1);
  const [isSeeking, setIsSeeking] = useState(false);
  const [duration, setDuration] = useState(0);
  const [playerVol, setPlayerVol] = useState(volume);
  const dispatch = useAppDispatch();
  const playerRef = useRef<any>(null);

  const renderSeekPos = () => {
      if (isPlaying && playerRef.current) {
          setSeek(playerRef.current.seek());
      }
      _raf = raf(renderSeekPos);
  };

  let _raf = raf(renderSeekPos);

  useEffect(() => {
      if (isPlaying) {
          renderSeekPos();
      }
      return () => {
          raf.cancel(_raf);
      };
  }, [isPlaying]);

  const handleToggle = () => {
      dispatch(setIsPlaying(!isPlaying));
  };

  const handleOnLoad = () => {
      setIsLoaded(true);
      if (playerRef.current) {
          setDuration(playerRef.current.duration());
      }
  };

  const handleOnPlay = () => {
      dispatch(setIsPlaying(true));
  };

  const handleOnEnd = () => {
      dispatch(setIsPlaying(false));
      raf.cancel(_raf);
  };

  const handleStop = () => {
      if (playerRef.current) {
          playerRef.current.stop();
      }
      dispatch(setIsPlaying(false));
      raf.cancel(_raf);
  };

  const handleLoopToggle = () => {
      dispatch(setIsLoop(!isLoop));
  };

  const handleMuteToggle = () => {
      dispatch(setIsMute(!isMute));
  };

  const handleMouseDownSeek = () => {
      setIsSeeking(true);
  };

  const handleMouseUpSeek = (e: any) => {
      setIsSeeking(false);
      if (playerRef.current) {
          playerRef.current.seek(e.target.value);
      }
  };

  const handleMouseUpVolume = (e: any) => {
      dispatch(setVolume(parseFloat(e.target.value)));
  };

  const handleSeekingChange = (e: any) => {
      setSeek(parseFloat(e.target.value));
  };

  const handleRate = (e: any) => {
      const rate = parseFloat(e.target.value);
      if (playerRef.current) {
          playerRef.current.rate(rate);
      }
      setRate(rate);
  };

  const handleVolumeChange = (e: any) => {
      setPlayerVol(parseFloat(e.target.value));
  };

  if (!post) {
      return <InfoImage text='Track is not selected' />;
  }

  return (
      <div className='full-control w-full'>
          <ReactHowler
              src={[`http://localhost:8000/files/${post.audio}`]}
              playing={isPlaying}
              onLoad={handleOnLoad}
              onPlay={handleOnPlay}
              onEnd={handleOnEnd}
              loop={isLoop}
              mute={isMute}
              volume={playerVol}
              ref={playerRef}
              usingWebAudio={true}
          />
  
          {
            post
            ?
            <>
              <PlayerTrackInfo/>
              <div className="divider divider-primary my-8 md:my-3">
                <div className='join w-full flex flex-row justify-center'>
                  <button className='join-item btn btn-sm btn-primary glass text-white' onClick={handleToggle}>
                    {
                      (isPlaying) 
                      ? 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path d="M5.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75A.75.75 0 0 0 7.25 3h-1.5ZM12.75 3a.75.75 0 0 0-.75.75v12.5c0 .414.336.75.75.75h1.5a.75.75 0 0 0 .75-.75V3.75a.75.75 0 0 0-.75-.75h-1.5Z" />
                      </svg>
                      : 
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                        <path d="M6.3 2.84A1.5 1.5 0 0 0 4 4.11v11.78a1.5 1.5 0 0 0 2.3 1.27l9.344-5.891a1.5 1.5 0 0 0 0-2.538L6.3 2.841Z" />
                      </svg>
                    }
                  </button>
                  <button className='join-item btn btn-sm btn-primary glass text-white' onClick={handleStop}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                      <path d="M5.25 3A2.25 2.25 0 0 0 3 5.25v9.5A2.25 2.25 0 0 0 5.25 17h9.5A2.25 2.25 0 0 0 17 14.75v-9.5A2.25 2.25 0 0 0 14.75 3h-9.5Z" />
                    </svg>
                  </button>
                  <button 
                    className={`${isMute && 'bg-black text-red-400'} join-item btn btn-sm btn-primary glass text-white`}
                    onClick={handleMuteToggle}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                      <path d="M10.047 3.062a.75.75 0 0 1 .453.688v12.5a.75.75 0 0 1-1.264.546L5.203 13H2.667a.75.75 0 0 1-.7-.48A6.985 6.985 0 0 1 1.5 10c0-.887.165-1.737.468-2.52a.75.75 0 0 1 .7-.48h2.535l4.033-3.796a.75.75 0 0 1 .811-.142ZM13.78 7.22a.75.75 0 1 0-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L16.56 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L15.5 8.94l-1.72-1.72Z" />
                    </svg>
                  </button>
                  <button 
                    className={`${isLoop && 'bg-black text-green-400'} join-item btn btn-sm btn-primary glass text-white`}
                    onClick={handleLoopToggle}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                      <path fillRule="evenodd" d="M15.312 11.424a5.5 5.5 0 0 1-9.201 2.466l-.312-.311h2.433a.75.75 0 0 0 0-1.5H3.989a.75.75 0 0 0-.75.75v4.242a.75.75 0 0 0 1.5 0v-2.43l.31.31a7 7 0 0 0 11.712-3.138.75.75 0 0 0-1.449-.39Zm1.23-3.723a.75.75 0 0 0 .219-.53V2.929a.75.75 0 0 0-1.5 0V5.36l-.31-.31A7 7 0 0 0 3.239 8.188a.75.75 0 1 0 1.448.389A5.5 5.5 0 0 1 13.89 6.11l.311.31h-2.432a.75.75 0 0 0 0 1.5h4.243a.75.75 0 0 0 .53-.219Z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
              
  
              <div className='flex flex-row gap-5'>
                <div className='seek w-full'>
                  <label>
                    {seek.toFixed(2)}
                    {' / '}
                    {(duration) ? duration.toFixed(2) : 'XX:XX'}
                    <span className='slider-container'>
                      <input 
                        type='range'
                        min='0'
                        max={duration ? duration.toFixed(2) : 0}
                        step='.01'
                        value={seek}
                        onChange={handleSeekingChange}
                        onMouseDown={handleMouseDownSeek}
                        onMouseUp={handleMouseUpSeek}
                        className="range range-xs" 
                      />
                    </span>
                  </label>
                </div>
  
                <div className='volume max-w-32'>
                  <label>
                    Volume: {(playerVol * 100).toFixed(2)}
                    <input 
                      type="range" 
                      min='0'
                      max='1'
                      step='.01'
                      value={playerVol}
                      // @ts-ignore
                      onChange={handleVolumeChange}
                      onMouseUp={handleMouseUpVolume}
                      className="range range-xs" 
                    />
                  </label>
                </div>
              </div>
            </>
            :
            <InfoImage text='Track is not selected'/>
          }
        </div>
    )
}
