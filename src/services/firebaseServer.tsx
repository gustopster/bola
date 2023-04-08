import { initializeApp } from 'firebase/app';
import { getFirestore, doc, getDoc, DocumentData, } from 'firebase/firestore';
import firebaseConfig from "./firebaseConfig"
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const dadosFirebase = doc(db, "/SERVER/BOLA")
const getAll = async ()=>{
    const snapshot = await getDoc(doc(dadosFirebase, "perfis", "usuarios"));
    const data = snapshot.data();
    if(data !== undefined){
        /* console.log(data) */
        return data;
    }
}
export const usuarios= await getAll()
console.log(usuarios)
export { dadosFirebase };