import { ISongModel } from "../../models/SongModel"

export const songReducer = (state: any, action: any) => {  
  switch (action.type) {
    case 'GET_SONGS':
      return { ...state, songs: action.payload } 
    case 'DELETE_SONG':
      return { 
        ...state, 
        songs: state.songs.filter((s: ISongModel) => s.id !== action.payload)
      } 
    case 'SET_IS_PLAY':
      return { ...state, isPlay: action.payload }
    case 'SET_IDX_SONG':
      return { ...state, idxSong: action.payload }
    default:
      return state
  }
}
