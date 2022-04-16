import { deleteDoc, doc } from 'firebase/firestore'
import { deleteObject, ref } from 'firebase/storage'
import React, { useEffect, useState } from 'react'
import Form from '../components/admin/Form'
import { getSongs, storage, store } from '../firebase/db'
import { ISongModel } from '../models/SongModel'

export default function Admin() {
  const [songs, setSongs] = useState<ISongModel[] | null>(null)
  const [isAdd, setIsAdd] = useState(false)

  const handleDelete = async (id: any, imgPath: string, songPath: string) => {
    const storageImgRef = ref(storage, imgPath)
    const storageSongRef = ref(storage, songPath)

    if(confirm('Do you want to delete this song ?')) {
      await deleteObject(storageImgRef)
      await deleteObject(storageSongRef)
      await deleteDoc(doc(store, 'playlists', id));

      window.location.reload();
    }      
  }

  useEffect(() => {   
    getSongs().then(songDatas => {
      setSongs(songDatas as ISongModel[])
    })   
  }, [])

  return (
    <div className='admin'>
      <button onClick={() => setIsAdd(true)}>Add Song</button>
      {isAdd && <Form />}
      <table>
        <thead>
          <tr>
            <th>#</th>
            <th>Image</th>
            <th>Title</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            songs &&
            songs.length > 0 &&
            songs.map((song, idx) => (
              <tr key={song.id}>
                <td>{idx + 1}</td>
                <td><img src={song.coverUrl} /></td>
                <td>{song.title}</td>
                <td
                  className='del'
                  onClick={() => handleDelete(song.id, song.imgFilePath as string, song.songFilePath as string)}
                >
                  <i className="fa-solid fa-trash-can"></i>
                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  )
}
