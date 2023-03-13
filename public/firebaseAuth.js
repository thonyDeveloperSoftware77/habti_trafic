import { getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { FirebaseApp } from "../public/firebase";
const auth = getAuth(FirebaseApp);

const provider = new GoogleAuthProvider();

export const signInWithGoogle = async () => {

  try {
    const result = await signInWithPopup(auth, provider);
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential.accessToken;
    const user = result.user;
    return getCurrentUser();
  } catch (error) {
    console.log(error.message);
  }
};


export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      unsubscribe();
      resolve(user);
    }, reject);
  });
};