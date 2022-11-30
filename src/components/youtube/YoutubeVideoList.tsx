import React from 'react'
import { useMyYoutubeAPI } from '../../hooks/useMyYoutubeAPI'
import YoutubeVideoItem from './YoutubeVideoItem';

export default function YoutubeVideoList() {
  const { documents } = useMyYoutubeAPI()
  
  return (
    <>
      <h3 className='youtubeVideoList-title'>
        <a href="https://www.youtube.com/channel/UCmUbhLZh6MCoqN1dgMLPUSA" target="_blank">
          <i className="fa-brands fa-youtube"></i> Btkdevkh Channel
        </a>
      </h3>
      <div className="youtubeVideoList">
        {
          documents &&
          documents.length > 0 &&
          documents.map((v: any) => (
            <YoutubeVideoItem key={v.id.videoId} v={v} />
          ))
        }
      </div>
    </>
  )
}
