import {getCurrentUser} from "./firebaseAuth"
import { FirebaseApp } from "../public/firebase";
import db from "./db"
import { collection, addDoc, getDoc, doc, setDoc } from "firebase/firestore";
import { useState } from "react";

const getData = async () => {
    try {
        const user = await getCurrentUser();
        let userData = null;
        if (user) {
            userData = user;
            const userId = userData.uid;
            // Check if this is the first time the user has signed in
            const docRef = doc(db, "users", userId);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                return docSnap.data();
            } else {
                console.log("No such document!");
                return null;
            }
        } else {
            console.log("Problems with user");
        }
    } catch (error) {
        console.log("Error: " + error.message);
    }
}



export default getData;