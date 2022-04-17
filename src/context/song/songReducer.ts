export const songReducer = (state: any, action: any) => {  
  switch (action.type) {
    case 'GET_SONGS':
      return { ...state, songs: action.payload }  
    case 'SET_IS_PLAY':
      return { ...state, isPlay: action.payload }
    case 'SET_IDX_SONG':
      return { ...state, idxSong: action.payload }
    default:
      return state
  }
}
