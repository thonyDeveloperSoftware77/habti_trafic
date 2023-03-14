import app from "./firebase"
import { getFirestore } from "firebase/firestore";
const db = getFirestore(app);
console.log(db)
export default  db;