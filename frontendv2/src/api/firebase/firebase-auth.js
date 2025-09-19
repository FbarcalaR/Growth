import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from './initialize-app'

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    if (result.user)
      return Promise.resolve(result.user);
    else
      return Promise.reject();
  } catch (error) {
    Promise.reject(error);
  }
};

const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.error(error);
  }
};

export { auth, signInWithGoogle, signOutUser };