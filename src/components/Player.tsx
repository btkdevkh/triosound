import React, { useEffect, useRef, useState } from 'react';
import { usePrevious } from '../hooks/usePrevious';
import { useSongContext } from '../hooks/useSongContext';
import '../assets/css/Player.css'

export default function Player() {  
  const { songs, idxSong, isPlay, dispatch } = useSongContext()  
  
  const refAudio = useRef<HTMLAudioElement | null>(null)
  const refIplay = useRef<HTMLElement | null>(null)
  const refProgressBar = useRef<HTMLDivElement | null>(null)

  const [isMuted, setIsMuted] = useState(true)
  const [isRepeated, setIsRepeated] = useState(true)

  const prevIdx = usePrevious(idxSong);

  const handlePlayAndPause = () => {
    dispatch({ type: 'SET_IS_PLAY', payload: true })

    refIplay
      .current!
      .classList
      .contains('fa-play') ? play() : pause()
  }

  const play = () => {
    if(refAudio) {
      refAudio.current!
        .play()
        .catch(error => error);
    } 
  }
  
  const pause = () => {
    if(refAudio) {
      dispatch({ type: 'SET_IS_PLAY', payload: false })

      refAudio.current!.pause()
    } 
  }

  const prev = () => {
    dispatch({ type: 'SET_IS_PLAY', payload: true })

    if(idxSong <= 0) {
      dispatch({ type: 'SET_IDX_SONG', payload: songs!.length - 1 })
    } else {
      dispatch({ type: 'SET_IDX_SONG', payload: idxSong - 1 })
    }

    play(); 
  }

  const next = () => {
    dispatch({ type: 'SET_IS_PLAY', payload: true })

    if(idxSong >= songs!.length - 1) {
      dispatch({ type: 'SET_IDX_SONG', payload: 0 })
    } else {
      dispatch({ type: 'SET_IDX_SONG', payload: idxSong + 1 })
    }

    play(); 
  }

  // Volume
  const volumeSliderManager = (e: any) => {
    if(Number(e.target.value) === 0) {      
      setIsMuted(false)
      refAudio.current!.muted = isMuted
    } else {
      setIsMuted(true)
      refAudio.current!.muted = isMuted
    }

    refAudio.current!.volume = e.target.value
    refAudio.current!.muted = e.target.value === 0
  }

  const mute = (e: any) => {    
    if(!e.target.classList.contains('volume-slider')) {
      setIsMuted((o: boolean) => !o)
      refAudio.current!.muted = isMuted
    }
  }

  const repeat = () => {
    setIsRepeated((o: boolean) => !o)

    if(refAudio) {
      refAudio.current!.loop = isRepeated
    } 
  }

  const setProgress = (e: any) => {
    const width = e.target.clientWidth;
    const clicktX = e.nativeEvent.offsetX;

    const audio = refAudio.current!;
    const duration = audio.duration;

    audio.currentTime = (clicktX / width) * duration;
  }

  const updateProgressBar = (e: React.SyntheticEvent<HTMLAudioElement, Event>) => {
    const { duration, currentTime } = e.target as HTMLAudioElement;
    const progressPercent = (currentTime / duration) * 100

    const progressBar = refProgressBar.current!;
    
    progressBar.style.width = `${progressPercent}%`;
  }
  
  useEffect(() => {
    if(isPlay) play()
  }, [prevIdx, isPlay, idxSong, songs, isMuted])

  return (
    <>
      {
        songs && songs.length > 0 && (
          <div className='player'>
            <div className="player__speaker">
              <div className="brand">TRIO</div>
              <div className="player__speaker__item"></div>
            </div>

            <div className='player__item one'>
              <img 
                src={songs[idxSong].coverUrl} 
                alt={songs[idxSong].title} 
                className={`${isPlay && 'is__play'}`}
              />
              <span className='cd__hold'></span>

              <div className="player__progress__container" onClick={(e) => setProgress(e)}>
                <div ref={refProgressBar} className="player__progress__bar"></div>
              </div>
            </div>

            <audio 
              ref={refAudio && refAudio} 
              src={songs[idxSong].songUrl}
              onTimeUpdate={(e) => updateProgressBar(e)}
              onEnded={next}
            />

            <div className='player__item two'>
              <div className={`diod ${isPlay && 'is__play'}`}></div>
              <div className='player__controls__btns'>

                <div className="player__ctr__btn">
                  <button onClick={prev}>
                    <i className={`fa-solid fa-backward`}></i>
                  </button>
                  <button onClick={handlePlayAndPause}>
                    <i ref={refIplay} className={`${isPlay ? 'fa-solid fa-pause' : 'fa-solid fa-play'}`}></i>
                  </button>
                  <button onClick={next}>
                    <i className={`fa-solid fa-forward`}></i>
                  </button>
                </div>

                <div className="player__controls__setting">
                  <div className="player__ctr__settings">
                    <button onClick={repeat}>
                      <i className={`fa-solid fa-rotate-right ${!isRepeated && 'is__play'}`}></i>
                    </button>

                    <div
                      className='volume__btn'
                      onClick={mute}
                    >
                      <input
                        className='volume-slider'
                        type="range" 
                        min={0} 
                        max={1} 
                        step='any' 
                        onInput={volumeSliderManager}
                      />
                        
                      <button>
                        <i className={`${isMuted ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark'}`}></i>
                      </button>
                    </div>
                  </div>
                </div>

              </div>

            </div>

            <div className="player__speaker">
              <div className="brand">TRIO</div>
              <div className="player__speaker__item"></div>
            </div>
          </div>
        )
      }
    </>
  )
}
