// This function is used to sign in a user using their Google account
// It checks if this is the first time the user has logged in
// If it is, it creates a new document in the database
// If it isn't, it returns the current user object

import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { FirebaseApp } from "../public/firebase";
import db from "./db"
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";

const auth = getAuth(FirebaseApp);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () => {
  // this function is called when the user clicks the "Sign in with Google" button
  try {
    // signInWithPopup is a function provided by Firebase that opens a popup window for the user to log in
    // we pass it the auth object, which we initialized earlier, and the provider we want to use
    const result = await signInWithPopup(auth, provider);
    // once the user has logged in, we can get their credentials
    const credential = GoogleAuthProvider.credentialFromResult(result);
    // the accessToken is what we need to make requests to the Google API
    const token = credential.accessToken;
    // the user object contains information about the user, including their name, email address, and photo
    const user = result.user;
    // we want to save the user's unique ID in a variable for easy access
    const userId = user.uid;
    // Check if this is the first time the user has signed in
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) {
      console.log("No such document!");
      try {
        const newDocRef = await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          photo: user.photoURL,
          uid: userId,
        });
        console.log("Document written with ID: ", newDocRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
    // if the user has successfully logged in, we return the getCurrentUser function
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