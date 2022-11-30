import React from 'react'

export default function YoutubeVideoItem({ v }: any) {  
  return (
    <a href={`https://www.youtube.com/watch?v=${v.id.videoId}`} target="_blank">
      <img src={v.snippet.thumbnails.medium.url} alt="thumbnails" />
    </a>
  )
}