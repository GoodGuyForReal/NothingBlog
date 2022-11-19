// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAs9THI7q7pR2THWM8dCZ6UAt3sAPlD1HM",
    authDomain: "nothingblog-94410.firebaseapp.com",
    projectId: "nothingblog-94410",
    storageBucket: "nothingblog-94410.appspot.com",
    messagingSenderId: "411217478806",
    appId: "1:411217478806:web:6eefe0c7a8fc63b885eeb7"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore (app)