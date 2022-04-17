import { useState } from "react"
import { storage } from "../firebase/db"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"

const useStorage = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const upLoadFile = async (file: File, folder:string) => {
    setLoading(true)

    const filePath = `${folder}/${Date.now() + file.name.substring(file.name.indexOf('.'))}`
    const storageRef = ref(storage, filePath)

    try {
      await uploadBytes(storageRef, file)
      const fileUrl = await getDownloadURL(storageRef)
  
      setError('')
      setLoading(false)
  
      return { filePath, fileUrl }
    } catch (err: any) {
      console.log(err.message);
      setError(err.message)
      setLoading(false)
    }
  }

  const deleteFile = async (filePath: string) => {
    const storageRef = ref(storage, filePath)
    await deleteObject(storageRef)
  }

  return { error, loading, upLoadFile, deleteFile }
}

export default useStorage
