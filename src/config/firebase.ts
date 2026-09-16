import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCztmPvbg25lLmsQNtH0Ki2larDkfgRNV8",
  authDomain: "livinglabnigeria.firebaseapp.com",
  projectId: "livinglabnigeria",
  storageBucket: "livinglabnigeria.firebasestorage.app",
  messagingSenderId: "559075983447",
  appId: "1:559075983447:web:542945a6930d66124fa312",
  measurementId: "G-QX0EG4MSZ6"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
