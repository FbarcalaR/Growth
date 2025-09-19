import { doc, setDoc, getDoc, getDocs, deleteDoc, collection, query } from "firebase/firestore"; 
import { getAuth } from "firebase/auth";
import { db } from '@/api/firebase/firebase-db'

async function getCollectionName() {
    const auth = getAuth();
    const user = auth.currentUser;
    if(!user) return null;
    const collectionName = `users/${user.uid}/dough-recipes`;
    return collectionName;
}

export const setDoughRecipe = async (recipe) => {    
    try {
    const collectionName = await getCollectionName();
    if(!collectionName) return;
        await setDoc(doc(db, collectionName, recipe.id), recipe);
    } catch(err) {
        console.log(err)
    }
}

export const getAllDoughRecipes = async () => {
    const collectionName = await getCollectionName();
    if(!collectionName) return;
    const collectionRef = collection(db, collectionName);
    const q = query(collectionRef);
    const querySnapshot = await getDocs(q)

    const res = querySnapshot.docs.map(doc => ({
        ...doc.data()
    }));
    return  res;
}

export const getDoughRecipe = async (id) => {
    const collectionName = await getCollectionName();
    if(!collectionName) return;
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        throw Error('No dough recipes with id ' + id);
    }
}

export const removeDoughRecipe = async (id) => {
    const collectionName = await getCollectionName();
    if(!collectionName) return;
    await deleteDoc(doc(db, collectionName, id));
};
