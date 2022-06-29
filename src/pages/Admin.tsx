import React, { useState } from 'react'
import Form from '../components/admin/Form'
import useCollection from '../hooks/useCollection'
import { useSongContext } from '../hooks/useSongContext'
import useStorage from '../hooks/useStorage'

export default function Admin() {
  const { songs: documents, dispatch } = useSongContext()

  const { deleteFile } = useStorage()
  const { deleteDcument } = useCollection('playlists')

  const [isAdd, setIsAdd] = useState(false)

  const handleDelete = async (id: any, imgPath: string, songPath: string) => {
    if(confirm('Do you want to delete this song ?')) {
      await deleteFile(imgPath)
      await deleteFile(songPath)
      await deleteDcument(id)

      dispatch({ type: 'DELETE_SONG', payload: id }) 
    }      
  }

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
            documents &&
            documents.length > 0 &&
            documents.map((song, idx) => (
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
