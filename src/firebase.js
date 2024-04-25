import { initializeApp } from 'firebase/app'
import {getAuth} from "firebase/auth"
import {getFirestore} from "firebase/firestore"
import firebaseConfig from './components/config/FirebaseConfig';

//this variable acts as an entry point between our project and firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = getAuth(firebaseApp)
const db = getFirestore(firebaseApp)

export {auth,db};