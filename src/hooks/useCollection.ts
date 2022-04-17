import { useEffect, useState } from 'react';
import { store } from '../firebase/db'
import { collection, addDoc, query, orderBy, getDocs, deleteDoc, doc } from "firebase/firestore"; 
import { ISongModel } from '../models/SongModel';

const useCollection = (collectionName: string) => {
  const [documents, setDocuments] = useState<ISongModel[] | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isPending, setIsPending] = useState(false)

  const colRef = collection(store, collectionName)

  // add a new document
  const addDocument = async (doc: any) => {
    setError(null)
    setIsPending(true)

    try {
      await addDoc(colRef, doc)
      setIsPending(false)
    }
    catch(err: any) {
      console.log(err.message)
      setError(err.message)
      setIsPending(false)
    }
  }

  const getDocuments = async () => {
    const q = query(colRef, orderBy('createdAt', 'desc'))

    return getDocs(q)
      .then(snapshot => {
        let results: any[] = [];
        snapshot.docs.forEach(doc => {
          results.push({ ...doc.data(), id: doc.id });
        })      
    
        return results
      })
      .catch(err => {
        console.log(err.message);
      })
  }

  const deleteDcument = async (id: string) => {
    await deleteDoc(doc(store, collectionName, id));  
  }

  useEffect(() => {
    getDocuments().then(songDatas => {
      setDocuments(songDatas as ISongModel[])
    })
  }, [])

  return { error, isPending, documents, addDocument, getDocuments, deleteDcument }
}

export default useCollection
