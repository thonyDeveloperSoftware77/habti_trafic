// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpeYDOZx8OslZcBtTOOwz7OXZ0juvpVgQ",
  authDomain: "habittracking-57eec.firebaseapp.com",
  projectId: "habittracking-57eec",
  storageBucket: "habittracking-57eec.appspot.com",
  messagingSenderId: "106060701383",
  appId: "1:106060701383:web:416e43d329fb675129a8e2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
