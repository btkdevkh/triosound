import { useContext } from "react"
import { SongContext } from "../context/song/SongContext"

export const useSongContext = () => {
  const context = useContext(SongContext)

  if(!context) throw Error('Please use useSongContext hook in SongContextProvider*')

  return context
}
