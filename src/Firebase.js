// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAs9THI7q7pR2THWM8dCZ6UAt3sAPlD1HM",
    authDomain: "nothingblog-94410.firebaseapp.com",
    projectId: "nothingblog-94410",
    storageBucket: "nothingblog-94410.appspot.com",
    messagingSenderId: "411217478806",
    appId: "1:411217478806:web:6eefe0c7a8fc63b885eeb7"
};


export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore (app)