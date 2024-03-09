import React, { ReactChild, useEffect, useReducer } from "react";
import { createContext } from "react";
import useCollection from "../../hooks/useCollection";
import { ISongModel } from "../../models/SongModel";
import { songReducer } from "./songReducer";

type Props = {
  children: ReactChild;
};

interface ISongContext {
  songs: ISongModel[];
  isPlay: boolean;
  idxSong: number;
  dispatch: Function;
}

export const SongContext = createContext<ISongContext | null>(null);

export function SongContextProvider({ children }: Props) {
  const { documents } = useCollection("playlists");

  const [state, dispatch] = useReducer(songReducer, {
    songs: [],
    isPlay: false,
    idxSong: 0,
  });

  useEffect(() => {
    dispatch({ type: "GET_SONGS", payload: documents });
  }, [documents]);

  return (
    <SongContext.Provider value={{ ...state, dispatch }}>
      {children}
    </SongContext.Provider>
  );
}
