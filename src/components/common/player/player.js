"use client"
import React from 'react'
import ReactHowler from 'react-howler'
import raf from 'raf' // requestAnimationFrame polyfill
import PlayerTrackInfo from './player-track-info'
import { store } from '@/lib/redux/store'
import { setIsLoop, setIsMute, setIsPlaying, setVolume } from '@/lib/redux/slices/player'

class AudioPlayer extends React.Component {
  constructor (props) {
    super(props)
    
    this.state = {
      playing: false,
      loaded: false,
      loop: false,
      mute: false,
      volume: 1.0,
      seek: 0.0,
      rate: 1,
      isSeeking: false
    }
    this.handleToggle = this.handleToggle.bind(this)
    this.handleOnLoad = this.handleOnLoad.bind(this)
    this.handleOnEnd = this.handleOnEnd.bind(this)
    this.handleOnPlay = this.handleOnPlay.bind(this)
    this.handleStop = this.handleStop.bind(this)
    this.renderSeekPos = this.renderSeekPos.bind(this)
    this.handleLoopToggle = this.handleLoopToggle.bind(this)
    this.handleMuteToggle = this.handleMuteToggle.bind(this)
    this.handleMouseDownSeek = this.handleMouseDownSeek.bind(this)
    this.handleMouseUpSeek = this.handleMouseUpSeek.bind(this)
    this.handleSeekingChange = this.handleSeekingChange.bind(this)
    this.handleRate = this.handleRate.bind(this)
  }

  componentWillUnmount () {
    this.clearRAF()
  }

  handleToggle () {
    store.dispatch(setIsPlaying(!this.state.playing));
    this.setState({
      playing: !this.state.playing
    })
  }

  handleOnLoad () {
    this.setState({
      loaded: true,
      duration: this.player.duration()
    })
  }

  handleOnPlay () {
    store.dispatch(setIsPlaying(true));
    this.setState({
      playing: true
    })
    this.renderSeekPos()
  }

  handleOnEnd () {
    store.dispatch(setIsPlaying(false));
    this.setState({
      playing: false
    })
    this.clearRAF()
  }

  handleStop () {
    this.player.stop();
    store.dispatch(setIsPlaying(false));
    this.setState({
      playing: false // Need to update our local state so we don't immediately invoke autoplay
    })
    this.renderSeekPos()
  }

  handleLoopToggle () {
    store.dispatch(setIsLoop(!this.state.loop));
    this.setState({
      loop: !this.state.loop
    })
  }

  handleMuteToggle () {
    store.dispatch(setIsMute(!this.state.mute));
    this.setState({
      mute: !this.state.mute
    })
  }

  handleMouseDownSeek () {
    this.setState({
      isSeeking: true
    })
  }

  handleMouseUpSeek (e) {
    this.setState({
      isSeeking: false
    })

    this.player.seek(e.target.value)
  }

  handleMouseUpVolume (e) {
    store.dispatch(setVolume(parseFloat(e.target.value)));
  }

  handleSeekingChange (e) {
    this.setState({
      seek: parseFloat(e.target.value)
    })
  }

  renderSeekPos () {
    if (!this.state.isSeeking) {
      this.setState({
        seek: this.player.seek()
      })
    }
    if (this.state.playing) {
      this._raf = raf(this.renderSeekPos)
    }
  }

  handleRate (e) {
    const rate = parseFloat(e.target.value)
    this.player.rate(rate)
    this.setState({ rate })
  }

  clearRAF () {
    raf.cancel(this._raf)
  }

  render () {
    return (
      <div className='full-control w-full'>
        <ReactHowler
          src={["/testaudio.mp3"]}
          playing={this.state.playing}
          onLoad={this.handleOnLoad}
          onPlay={this.handleOnPlay}
          onEnd={this.handleOnEnd}
          loop={this.state.loop}
          mute={this.state.mute}
          volume={this.state.volume}
          ref={(ref) => (this.player = ref)}
          usingWebAudio={true}
        />

        <PlayerTrackInfo/>
        
        <div className="divider divider-primary my-8 md:my-3">
          <div className='join w-full flex flex-row justify-center'>
            <button className='join-item btn btn-sm btn-primary glass text-white' onClick={this.handleToggle}>
              {
                (this.state.playing) 
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
            <button className='join-item btn btn-sm btn-primary glass text-white' onClick={this.handleStop}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path d="M5.25 3A2.25 2.25 0 0 0 3 5.25v9.5A2.25 2.25 0 0 0 5.25 17h9.5A2.25 2.25 0 0 0 17 14.75v-9.5A2.25 2.25 0 0 0 14.75 3h-9.5Z" />
              </svg>
            </button>
            <button 
              className={`${this.state.mute && 'bg-black text-red-400'} join-item btn btn-sm btn-primary glass text-white`}
              onClick={this.handleMuteToggle}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
                <path d="M10.047 3.062a.75.75 0 0 1 .453.688v12.5a.75.75 0 0 1-1.264.546L5.203 13H2.667a.75.75 0 0 1-.7-.48A6.985 6.985 0 0 1 1.5 10c0-.887.165-1.737.468-2.52a.75.75 0 0 1 .7-.48h2.535l4.033-3.796a.75.75 0 0 1 .811-.142ZM13.78 7.22a.75.75 0 1 0-1.06 1.06L14.44 10l-1.72 1.72a.75.75 0 0 0 1.06 1.06l1.72-1.72 1.72 1.72a.75.75 0 1 0 1.06-1.06L16.56 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L15.5 8.94l-1.72-1.72Z" />
              </svg>
            </button>
            <button 
              className={`${this.state.loop && 'bg-black text-green-400'} join-item btn btn-sm btn-primary glass text-white`}
              onClick={this.handleLoopToggle}
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
              {this.state.seek.toFixed(2)}
              {' / '}
              {(this.state.duration) ? this.state.duration.toFixed(2) : 'XX:XX'}
              <span className='slider-container'>
                <input 
                  type='range'
                  min='0'
                  max={this.state.duration ? this.state.duration.toFixed(2) : 0}
                  step='.01'
                  value={this.state.seek}
                  onChange={this.handleSeekingChange}
                  onMouseDown={this.handleMouseDownSeek}
                  onMouseUp={this.handleMouseUpSeek}
                  className="range range-xs" 
                />
              </span>
            </label>
          </div>

          <div className='volume max-w-32'>
            <label>
              Volume: {(this.state.volume * 100).toFixed(2)}
              <input 
                type="range" 
                min='0'
                max='1'
                step='.01'
                value={this.state.volume}
                onChange={e => this.setState({ volume: parseFloat(e.target.value) })}
                onMouseUp={this.handleMouseUpVolume}
                className="range range-xs" 
              />
            </label>
          </div>
        </div>
      </div>
    )
  }
}

export default AudioPlayer;