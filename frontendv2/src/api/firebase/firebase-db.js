import { getFirestore } from "@firebase/firestore"
import { app } from './initialize-app'

export const db = getFirestore(app);