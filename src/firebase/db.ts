import { initializeApp } from 'firebase/app'
import { getFirestore, collection, getDocs, query, orderBy } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
  measurementId: process.env.REACT_APP_FIREBASE_MEASUREMENT_ID
};

// Init Firebase
initializeApp(firebaseConfig)
// Init Firestore
const store = getFirestore()
// Init Firebase Auth
const auth = getAuth()

const colRef = collection(store, 'playlists')

const q = query(colRef, orderBy('createdAt', 'desc'))

function getSongs() {
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
  
export { getSongs, auth }
