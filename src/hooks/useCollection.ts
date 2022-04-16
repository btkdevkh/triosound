import { store } from '../firebase/db'
import { collection, addDoc } from "firebase/firestore"; 
import { useState } from 'react';

const useCollection = (collectionName: string) => {
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  // add a new document
  const addDocument = async (doc: any) => {
    setError(null)
    setIsPending(true)

    try {
      await addDoc(collection(store, collectionName), doc)
      setIsPending(false)
    }
    catch(err: any) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  return { error, isPending, addDocument }
}

export default useCollection
