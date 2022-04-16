import React, { useState } from 'react'
import { storage, store } from '../../firebase/db'
import { addDoc, collection } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'

export default function Form() {
  const [title, setTitle] = useState('')
  const [singer, setSinger] = useState('')
  const [imgFile, setImgFile] = useState<any | null>(null)
  const [songFile, setSongFile] = useState<any | null>(null)
  const [errorFile, setErrorFile] = useState<string | null>(null)

  const onChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    let imgFileSelected = e.target.files![0]

    // Allowed files types
    const typesImg = ['image/png', 'image/jpeg', 'image/jpg']

    if(imgFileSelected && typesImg.includes(imgFileSelected.type)) {
      setImgFile(imgFileSelected);
      setErrorFile(null)
    } else {
      setImgFile(null)
      setErrorFile("Please select an image (jpg, jpeg, png format) only")
    }
  }

  const onChangeMp3 = (e: any) => {
    let mp3FileSelected = e.target.files![0]

    // Allowed files types
    const typesMp3 = ['audio/mpeg']

    if(mp3FileSelected && typesMp3.includes(mp3FileSelected.type)) {
      setSongFile(mp3FileSelected);
      setErrorFile(null)
    } else {
      setSongFile(null)
      setErrorFile("Please select a song (mp3 format) only")
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    if(!title || !singer) {
      setErrorFile('All Fields Required')
      return
    }
    
    if(imgFile && songFile) {      
      const imgUploadPath = `covers/${Date.now() + imgFile.name.substring(imgFile.name.indexOf('.'))}`
      const mp3UploadPath = `songs/${Date.now() + songFile.name.substring(songFile.name.indexOf('.'))}`

      const storageImgRef = ref(storage, imgUploadPath)
      const storageSongRef = ref(storage, mp3UploadPath)

      await uploadBytes(storageImgRef, imgFile)
      await uploadBytes(storageSongRef, songFile)

      const imgUrl = await getDownloadURL(storageImgRef)
      const songUrl = await getDownloadURL(storageSongRef)

      await addDoc(collection(store, 'playlists'), {
        title: title,
        singer: singer,
        coverUrl: imgUrl,
        songUrl: songUrl,
        imgFilePath: imgUploadPath,
        songFilePath: mp3UploadPath,
        songs: [],
        createdAt: Date.now()
      })

      if(!errorFile) {
        window.location.reload();
      }
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder='Title' 
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <input 
        type="text" 
        placeholder='Singer' 
        value={singer}
        onChange={(e) => setSinger(e.target.value)}
      />
      <hr />
      <div>
        <input 
          className='input__file'
          type="file" 
          id="imageFile"
          onChange={onChangeImage}
        />
        <label htmlFor="imageFile">Image File (jpg, jpeg, png) only</label><br />
        <span>{imgFile && imgFile.name}</span>
      </div>
      <div>
        <input 
          className='input__file'
          type="file" 
          id="songFile"
          onChange={onChangeMp3}
        />
        <label htmlFor="songFile">Song File (mp3) only</label><br />
        <span>{songFile && songFile.name}</span>
      </div>

      <button type="submit">Submit</button>

      <span className='error'>{errorFile && errorFile}</span>
    </form>
  )
}
