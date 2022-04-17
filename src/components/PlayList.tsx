import React from 'react'
import { useSongContext } from '../hooks/useSongContext'
import Player from './Player'

export default function PlayList() {
  const { songs, idxSong, dispatch } = useSongContext()

  if(!songs) return <></>
  
  return (
    <>
      <Player /> 
      {
        songs && songs.length > 0 && (
          <div className='playlist'>
            {
              songs.map((song, i) => (
                <div key={song.id} className='playlist__description'>
                  <span onClick={() => {
                    dispatch({ type: 'SET_IDX_SONG', payload: i })
                    dispatch({ type: 'SET_IS_PLAY', payload: true })
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
        )
      }
    </>
  )
}
