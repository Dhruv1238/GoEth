// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5nNBxEmTVf1DuTpilkExQS8GPEQ7dCvw",
  authDomain: "goeth-9ed6f.firebaseapp.com",
  projectId: "goeth-9ed6f",
  storageBucket: "goeth-9ed6f.appspot.com",
  messagingSenderId: "626781780169",
  appId: "1:626781780169:web:b3aee85f1922442f02b518",
  measurementId: "G-0HHHT4YYVB"
};

// Initialize Firebase
const firebase = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebase);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore(firebase);


export {auth, provider, firebase, db};