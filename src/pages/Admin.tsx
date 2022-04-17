import React, { useEffect, useState } from 'react'
import Form from '../components/admin/Form'
import { ISongModel } from '../models/SongModel'
import useCollection from '../hooks/useCollection'
import useStorage from '../hooks/useStorage'

export default function Admin() {
  const { deleteFile } = useStorage()
  const { getDocuments, deleteDcument } = useCollection('playlists')

  const [songs, setSongs] = useState<ISongModel[] | null>(null)
  const [isAdd, setIsAdd] = useState(false)

  const handleDelete = async (id: any, imgPath: string, songPath: string) => {
    if(confirm('Do you want to delete this song ?')) {
      await deleteFile(imgPath)
      await deleteFile(songPath)
      await deleteDcument(id)

      window.location.reload();
    }      
  }

  useEffect(() => {   
    getDocuments().then(songDatas => {
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
