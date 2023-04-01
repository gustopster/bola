import { initializeApp } from 'firebase/app';
import { getFirestore, doc, } from 'firebase/firestore';
import firebaseConfig from "./firebaseConfig"
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dadosFirebase = doc(db, "/SERVER/BOLA")
export {dadosFirebase}