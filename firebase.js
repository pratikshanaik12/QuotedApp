// Import the functions you need from the SDKs you need
import firebase, { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth"
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX38hIIWXaWVS43jlR3qXqgxZDM0yFBLI",
  authDomain: "quoted-app-ca6b8.firebaseapp.com",
  projectId: "quoted-app-ca6b8",
  storageBucket: "quoted-app-ca6b8.appspot.com",
  messagingSenderId: "632449875185",
  appId: "1:632449875185:web:6ae4770269a4dd3f27fd50"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const auth = getAuth(app)
const storage = getStorage(app)

export {db, auth, storage}

export default firebase