import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, } from 'firebase/firestore';
import firebaseConfig from "./firebaseConfig"
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dadosFirebase = doc(db, "/SERVER/BOLA")

const snapshot = await getDoc(doc(dadosFirebase, "perfis", "usuarios"));
const data = snapshot.data();
const usuarios = data
export { dadosFirebase, usuarios };