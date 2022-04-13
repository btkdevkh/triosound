import React, { useEffect, useState } from 'react'
import { ISongModel } from '../models/SongModel'
import Player from './Player'
import { getSongs } from '../firebase/db';

export default function PlayList() {
  const [songs, setSongs] = useState<ISongModel[] | null>(null)
  const [isPlay, setIsPlay] = useState(false)
  const [idxSong, setIdxSong] = useState<number>(0)

  useEffect(() => {
    getSongs().then(songDatas => {
      setSongs(songDatas as ISongModel[])
    })
  }, [])

  if(!songs) return <></>
  
  return (
    <>
      { 
        songs && 
        <Player 
          songs={songs as ISongModel[]} 
          isPlay={isPlay}
          idxSong={idxSong}
          setIdxSong={setIdxSong}
          setIsPlay={setIsPlay}
        /> 
      }
      <div className='playlist'>
        {
          songs && songs.length > 0 &&
          songs.map((song, i) => (
            <div key={song.id} className='playlist__description'>
              <span onClick={() => {
                setSongs(songs)
                setIdxSong(i)
                setIsPlay(true)
              }}>
                <i className={`fa-solid fa-compact-disc ${idxSong === i && 'is__play'}`}></i> {' '}
                {song.title} - {song.singer}
              </span>
              <span className='playlist__ctr__btn'>
                <i className={`fa-solid fa-headphones ${idxSong === i && 'is__play'}`}></i>
              </span>
            </div>
          ))
        }
      </div>
    </>
  )
}
