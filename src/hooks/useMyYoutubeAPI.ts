import { useEffect, useState } from "react"

const YOUTUBE_API_URL =`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${process.env.REACT_APP_BTKDEVKH_UTUBE_CHANNEL_ID}&maxResults=3&order=date&type=video&key=${process.env.REACT_APP_BTKDEVKH_UTUBE_API}`

export const useMyYoutubeAPI = () => {
  const [documents, setDocuments] = useState<any[]|null>(null)

  const getDocuments = async () => {
    const res = await fetch(YOUTUBE_API_URL)
    const data = await res.json()
    if(data) setDocuments(data.items)
  }
  
  useEffect(() => {
    if(documents === null) getDocuments()
  }, [documents])

  return { documents }
}
