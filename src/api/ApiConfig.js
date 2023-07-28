import { initializeApp } from "@firebase/app";
// Required for side-effects
import "firebase/database";
import { getFirestore } from "firebase/firestore/lite";
import { getAuth } from "firebase/auth";

// export default function StartFirebase() {getDatabasegetDatabasegetDatabase
const FirebaseConfig = {
    apiKey: "AIzaSyAD3LREivFhvmPMem-e6Eo0w_M1ng9WjF8",
    authDomain: "to-do-clinicorp.firebaseapp.com",
    projectId: "to-do-clinicorp",
    storageBucket: "to-do-clinicorp.appspot.com",
    messagingSenderId: "561515426205",
    appId: "1:561515426205:web:80e9c57b62ed42bdb7bf74"
}; 

const app = initializeApp(FirebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {db as DataBase, auth as Auth} ;