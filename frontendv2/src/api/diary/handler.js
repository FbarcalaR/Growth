import { doc, setDoc, getDoc, getDocs, deleteDoc, collection, query } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { db } from '@/api/firebase/firebase-db'

async function getCollectionName() {
    const auth = getAuth();
    const user = auth.currentUser;
    if(!user) return null;
    const collectionName = `users/${user.uid}/diary-entries`;
    return collectionName;
}

export const saveDiaryEntry = async (diaryEntry) => {
    try {
        const collectionName = await getCollectionName();
        if(!collectionName) return;
        await setDoc(doc(db, collectionName, diaryEntry.id), diaryEntry);
    } catch(err) {
        console.log(err)
    }
}

export const saveNewDiaryEntryFromCalculator = async (diaryEntryBody) => {
    const diaryEntries = await getAllDiaryEntries();
    const id = Math.max(0, ...diaryEntries.map(r => +r.id)) + 1;
    const diaryEntry = {
        id: id.toString(),
        title: new Date().toLocaleDateString('ES'),
        body: diaryEntryBody
    };
    try {
        const collectionName = await getCollectionName();
        if(!collectionName) return;
        await setDoc(doc(db, collectionName, diaryEntry.id), diaryEntry);
        return id;
    } catch(err) {
        console.log(err)
    }
}

export const getAllDiaryEntries = async () => {
    const collectionName = await getCollectionName();
    if(!collectionName) return;
    if(!collectionName) return [];
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q)

    const res = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));
    return  res;
}

export const getDiaryEntry = async (id) => {
    const collectionName = await getCollectionName();
    if(!collectionName) return;
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw Error('No diary entry exist with id ' + id);
    }
}

export const removeDiaryEntry = async (id) => {
    const collectionName = await getCollectionName();
    if(!collectionName) return;
    await deleteDoc(doc(db, collectionName, id));
};
