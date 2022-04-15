import React, { useEffect, useRef, useState } from 'react';
import { ISongModel } from '../models/SongModel';
import { usePrevious } from '../hooks/usePrevious';

type Props = {
  songs: ISongModel[];
  isPlay: boolean;
  idxSong: number;
  setIdxSong: Function;
  setIsPlay: Function;
}

export default function Player(props: Props) {  
  const { songs, isPlay, idxSong, setIdxSong, setIsPlay } = props
  const refAudio = useRef<HTMLAudioElement | null>(null)
  const refIplay = useRef<HTMLElement | null>(null)
  const refProgressBar = useRef<HTMLDivElement | null>(null)
  const [isMuted, setIsMuted] = useState(true)
  const [isRepeated, setIsRepeated] = useState(true)

  const prevIdx = usePrevious(idxSong);

  const handlePlayAndPause = () => {
    setIsPlay(true)

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
      setIsPlay(false)
      refAudio.current!.pause()
    } 
  }

  const prev = () => {
    if(idxSong <= 0) {
      setIdxSong((o: number) => o = songs.length - 1);
    } else {
      setIdxSong((o: number) => o - 1);
    }

    play(); 
  }

  const next = () => {
    setIsPlay(true)
    if(idxSong >= songs.length - 1) {
      setIdxSong((o: number) => o = 0);
    } else {
      setIdxSong((o: number) => o + 1);
    }
    play(); 
  }

  const mute = () => {
    setIsMuted((o: boolean) => !o)
    if(refAudio) {
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
    <div className='player'>
      <div className="player__speaker">
        <div className="brand">JVC</div>
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
              <button onClick={mute}>
                <i className={`${isMuted ? 'fa-solid fa-volume-high' : 'fa-solid fa-volume-xmark'}`}></i>
              </button>
            </div>
          </div>

        </div>

      </div>

      <div className="player__speaker">
        <div className="brand">JVC</div>
        <div className="player__speaker__item"></div>
      </div>
    </div>
  )
}
