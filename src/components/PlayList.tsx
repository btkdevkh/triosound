import React, { useState } from 'react'
import useCollection from '../hooks/useCollection'
import { ISongModel } from '../models/SongModel'
import Player from './Player'

export default function PlayList() {
  const { documents } = useCollection('playlists')
  const [isPlay, setIsPlay] = useState(false)
  const [idxSong, setIdxSong] = useState<number>(0)

  if(!documents) return <></>
  
  return (
    <>
      { 
        documents && 
        <Player 
          songs={documents as ISongModel[]} 
          isPlay={isPlay}
          idxSong={idxSong}
          setIdxSong={setIdxSong}
          setIsPlay={setIsPlay}
        /> 
      }
      <div className='playlist'>
        {
          documents && documents.length > 0 &&
          documents.map((song, i) => (
            <div key={song.id} className='playlist__description'>
              <span onClick={() => {
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
